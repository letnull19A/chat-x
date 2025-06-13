import { Inputfield, Button, Link } from '@ui'
import './style.css'

const Registration = () => {
  return (
    <>
      <h1>Regist page</h1>
      <form>
        <Inputfield
          title='Your login'
          message='original login'
        />
        <Inputfield
          title='Your nickname'
          message='crazy nick here'
        />
        <Inputfield title='Password' />
        <Inputfield title='Confirm password here' />
        <Button label='Regist now!' />
        <Link
          onClick='/login'
          label='Have account'
        />
      </form>
    </>
  )
}

export default Registration
