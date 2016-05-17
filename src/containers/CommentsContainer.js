import React, { PropTypes, Component } from 'react'
import { actions } from 'redux/modules/comments'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { get as _get } from 'lodash'
import CommentsList from 'components/CommentsList'
import CommentForm from 'components/CommentForm'
import Btn from 'components/Btn'

export class CommentsContainer extends Component {
  static propTypes={
    comments: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    shown: PropTypes.bool.isRequired,
    status: PropTypes.oneOf(['LOADING', 'NONE', 'LOADED', 'SAVING']).isRequired,
    loadForPost: PropTypes.func.isRequired,
    hideForPost: PropTypes.func.isRequired,
    showForPost: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.save = (comment) => {
      comment.postId = this.props.postId
      this.props.save(comment, this.props.slug)
    }
    this.toggleVisibility = () => {
      if (this.props.shown) {
        this.props.hideForPost(this.props.slug)
      } else {
        this.props.showForPost(this.props.slug)
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.status === 'NONE' && nextProps.shown) {
      this.props.loadForPost(this.props.postId, this.props.slug)
    }
  }

  render () {
    const {shown, count, status, comments} = this.props
    const btnLabel = `${shown ? 'Masquer' : 'Voir'} les messages (${count})`
    return (
      <div className='comContainer'>
        <Btn text={btnLabel} handler={this.toggleVisibility} variant='alt' />
        {shown ? (
          <div>
            <CommentsList status={status} comments={comments} />
            <CommentForm status={status} save={this.save} />
          </div>
          ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let comments = []
  const comIds = _get(state.posts.bySlug, `${ownProps.slug}.comments`, [])
  let status = _get(state.comments.statusForPost, ownProps.slug, 'NONE')
  if (status === 'LOADED' || status === 'SAVING') {
    comments = comIds.map((id) => state.comments.byId[id])
  }
  return {
    shown: _get(state.comments.shownForPost, ownProps.slug, false),
    status,
    count: comIds.length,
    comments
  }
}

export default connect((mapStateToProps), {
  ...actions
})(CommentsContainer)
