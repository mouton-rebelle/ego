import React, { PropTypes, Component } from 'react'
import Btn from 'components/Btn'

export default class CommentForm extends Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    status: PropTypes.oneOf(['NONE', 'LOADING', 'LOADED', 'SAVING'])
  }

  render () {
    const {save, status} = this.props
    return (
      <form className='com-form' onSubmit={save}>
        <textarea
          className='com-form__input com-form__input--textarea'
          placeholder='Que dis-je ?'
          rows='4' />
        <input className='com-form__input' placeholder='Qui suis-je ? ' />
        <div className='com-form__action'>
          <Btn disabled={status === 'SAVING'}
            handler={save} kind='primary' text='laisser un message' />
        </div>
      </form>
    )
  }
}
