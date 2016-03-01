import React, { PropTypes, Component } from 'react'

export default class PostMesh extends Component {

  static propTypes = {
    childWeight: PropTypes.array,
    children: PropTypes.array,
    horizontal: PropTypes.bool
  };

  render () {
    const { horizontal, children, childWeight } = this.props

    let meshStyle = {
      minHeight: 100
    }

    if (horizontal) {
      meshStyle.display = 'flex;display:-webkit-flex'
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
          <div key={i} style={childStyle}>
            {c}
          </div>
        )
      })}
      </div>
    )
  }
}
