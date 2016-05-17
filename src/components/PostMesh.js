import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class PostMesh extends Component {

  static propTypes = {
    childWeight: PropTypes.array,
    children: PropTypes.array,
    horizontal: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render () {
    const { horizontal, children, childWeight } = this.props

    let meshStyle = {
      minHeight: 100
    }

    if (horizontal) {
      meshStyle.display = 'flex'
    }

    return (
      <div style={meshStyle}>
      {React.Children.map(children, (c, i) => {
        let childStyle = {}
        if (horizontal) {
          childStyle.flexBasis = `${childWeight[i]}%`
          childStyle.WebkitFlexBasis = `${childWeight[i]}%`
        }
        return (
          <div key={i} style={childStyle} className='meshChildContainer'>
            {c}
          </div>
        )
      })}
      </div>
    )
  }
}
