import { connect } from 'react-redux'

import SignIn from './sign_in'
import { signIn } from '../../actions/session_actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(signIn(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
