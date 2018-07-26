import React from 'react'

export default class PostForm extends React.Component {
  constructor (props) {
    super(props)

    this._defaultState = {
      text: ''
    }

    this.state = this._defaultState

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickToClose = this.handleClickToClose.bind(this)
    this.handleEscToClose = this.handleEscToClose.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.modal !== false) {
      document.addEventListener('keydown', this.handleEscToClose)
      document.addEventListener('click', this.handleClickToClose)
    } else {
      this.setState(this._defaultState)
    }
  }

  handleTextChange (e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.createPost({ 'text': this.state.text })
      .then(() => this.handleModalClose())
  }

  handleClickToClose (e) {
    if (e.target.id === 'modal-base' || e.target.id === 'post-form-modal' ||
       e.target.parentNode.id === 'modal-x') {
      e.preventDefault()
      this.handleModalClose()
    }
  }

  handleEscToClose (e) {
    if (e.key === 'Escape' || e.keyIdentifier === 'U+001B') {
      e.preventDefault()
      this.handleModalClose()
    }
  }

  handleModalClose () {
    document.removeEventListener('keydown', this.handleEscToClose)
    document.removeEventListener('click', this.handleClickToClose)
    this.props.closePostModal()
  }

  render () {
    if (this.props.modal) {
      return (
        <div className='modal-background'>
          <div className='modal-base' id='modal-base'>
            <div className='post-form-modal' id='post-form-modal'>
              <form className='post-form' onSubmit={this.handleSubmit}>
                <div className='post-form__textbox'>
                  <input type='text'
                    className='post-form__textbox--input'
                    value={this.state.text}
                    placeholder={`Hey, tell me something!`}
                    onChange={this.handleTextChange} />
                </div>
                <button type='submit'>
                  Post!
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}
