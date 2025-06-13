import { Inputfield, Button, Link } from '@ui'
import './style.css'

const Login = () => {
  return (
    <>
      <h1>Login page</h1>
      <form>
        <Inputfield title='Your login' />
        <Inputfield title='Your password' />
        <Button label='Login now!' />
      </form>
      <Link to='/reg' label='Regist new' />
    </>
  )
}

export default Login
