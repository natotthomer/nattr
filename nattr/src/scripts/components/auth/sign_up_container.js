import { connect } from 'react-redux'

import SignUp from './sign_up'
import { signUp } from '../../actions/session_actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  signUp: data => dispatch(signUp(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
