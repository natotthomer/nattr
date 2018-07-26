import React from 'react'
import camelCase from 'camelcase'

export default class ProfileForm extends React.Component {
  constructor (props) {
    super(props)

    this._defaultState = props.currentUser.profile

    this.state = this._defaultState

    this.handleVisibleNameChange = this.handleVisibleNameChange.bind(this)
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickToClose = this.handleClickToClose.bind(this)
    this.handleEscToClose = this.handleEscToClose.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleProfileImageChange = this.handleProfileImageChange.bind(this)
    this.handleBannerImageChange = this.handleBannerImageChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.modal !== false) {
      document.addEventListener('keydown', this.handleEscToClose)
      document.addEventListener('click', this.handleClickToClose)
    }
    this.setState({ ...nextProps.currentUser.profile })
  }

  handleVisibleNameChange (e) {
    this.setState({ visible_name: e.target.value })
  }

  handleWebsiteChange (e) {
    this.setState({ website: e.target.value })
  }

  handleDescriptionChange (e) {
    this.setState({ description: e.target.value })
  }

  handleProfileImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        profile_image_file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleBannerImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        banner_image_file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
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

  handleSubmit (e) {
    e.preventDefault()
    this.props.updateUserProfile(this.props.currentUser.id, this.state)
      .then(() => this.handleModalClose())
  }

  handleModalClose () {
    document.removeEventListener('keydown', this.handleEscToClose)
    document.removeEventListener('click', this.handleClickToClose)
    this.props.closeProfileModal()
  }

  render () {
    if (this.props.modal) {
      return (
        <div className='modal-background'>
          <div className='modal-base' id='modal-base'>
            <div className='post-form-modal' id='post-form-modal'>
              <form className='post-form' onSubmit={this.handleSubmit}>
                <div>
                  <label>
                    name
                    <input type='text'
                      value={this.state.visible_name}
                      placeholder={`Hey, tell me something!`}
                      onChange={this.handleVisibleNameChange} />
                  </label>
                </div>
                <div>
                  <label>
                    description
                    <input type='text'
                      value={this.state.description}
                      placeholder={`Hey, tell me something!`}
                      onChange={this.handleDescriptionChange} />
                  </label>
                </div>
                <div>
                  <label>
                    website
                    <input type='text'
                      value={this.state.website}
                      placeholder={`Hey, tell me something!`}
                      onChange={this.handleWebsiteChange} />
                  </label>
                </div>
                <div>
                  <label>
                    image
                    <input type='file'
                      value={this.state.image}
                      onChange={this.handleProfileImageChange} />
                  </label>
                </div>
                <div>
                  <label>
                    banner image
                    <input type='file'
                      value={this.state.image}
                      onChange={this.handleBannerImageChange} />
                  </label>
                </div>
                <button type='submit'>
                  Submit
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
