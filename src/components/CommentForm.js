import React, { PropTypes, Component } from 'react'
import Btn from 'components/Btn'

export default class CommentForm extends Component {

  constructor (props) {
    super(props)
    this.save = () => this.props.save({
      text: this.refs.message.value,
      author: this.refs.who.value
    })
  }

  static propTypes = {
    save: PropTypes.func.isRequired,
    status: PropTypes.oneOf(['NONE', 'LOADING', 'LOADED', 'SAVING'])
  }

  render () {
    return (
      <form className='com-form' onSubmit={this.save}>
        <textarea
          ref='message'
          className='com-form__input com-form__input--textarea'
          placeholder='Que dis-je ?'
          rows='4' />
        <input className='com-form__input' placeholder='Qui suis-je ? ' ref='who' />
        <div className='com-form__action'>
          <Btn disabled={this.props.status === 'SAVING'}
            handler={this.save} kind='primary' text='laisser un message' />
        </div>
      </form>
    )
  }
}
