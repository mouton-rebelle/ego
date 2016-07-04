import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class PostImage extends Component {

  static propTypes = {
    image: PropTypes.object.isRequired,
    showOverlay: PropTypes.func
  };

  constructor (props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      imageVisible: false,
      imageLoaded: false,
      width: 0
    }

    this.showOverlay = () => {
      this.props.showOverlay(this.props.image)
    }

    this.updateViewport = debounce(() => {
      if (this.shouldLoad()) {
        this.setState({
          imageVisible: true
        })
        window.removeEventListener('scroll', this.updateViewport)
      }
    }, 200)

    this.onLoad = () => {
      this.setState({
        imageLoaded: true
      })
      window.removeEventListener('resize', this.updateViewport)
    }
  }

  componentDidMount () {
    if (this.shouldLoad()) {
      this.setState({
        imageVisible: true
      })
    } else {
      window.addEventListener('scroll', this.updateViewport)
    }

    window.addEventListener('resize', this.updateViewport)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.updateViewport)
    window.removeEventListener('resize', this.updateViewport)
  }

  /**
   * return true if the parent offset is in the viewport
   * @return {boolean}
   */
  shouldLoad () {
    let el = ReactDOM.findDOMNode(this)
    if (el.offsetWidth !== this.state.width) {
      this.setState({width: el.offsetWidth})
    }
    return (window.pageYOffset + window.innerHeight) > (el.offsetParent.offsetTop - 100)
  }

  render () {
    const {image} = this.props
    console.log(image)
    const styles =
      {
        base: {
          textDecoration: 'none',
          color: '#666',
          textAlign: 'center'
        }, loading: {
          height: Math.floor(this.state.width / image.ratio),
          backgroundColor: '#EEE',
          backgroundImage: 'url(/img/grid.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }
      }

    let computedStyles = styles.base
    if (!this.state.imageLoaded) {
      computedStyles = {...computedStyles, ...styles.loading}
    }

    const display = this.state.imageLoaded ? 'inline-block' : 'none'

    return (
      <a className='image image--border' style={computedStyles} onClick={this.showOverlay}>
        {
          this.state.imageVisible
          ? (<img
            alt={image.label}
            style={{display}}
            className='element__image'
            onLoad={this.onLoad} src={`/orig/${image.file}`} />)
          : null
        }
      </a>
    )
  }
}
