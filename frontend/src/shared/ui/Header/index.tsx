import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {
  SocketContext,
  ConnectionStatus,
  BurgerContext,
} from '@contexts'
import { Button } from '@ui'
import './style.css'

/**
 * TODO: move this in separate component: Statusbar
 * */
const StatusBar = () => {
  const socket = useContext(SocketContext)

  return socket.status ===
    ConnectionStatus.CONNECTED ? (
    <div className='status-connected'></div>
  ) : (
    <div className='status-waiting'></div>
  )
}

const Header = () => {
  const navigate = useNavigate()

  const burgerContext = useContext(BurgerContext)

  const menuAttributes = {
    onClick: () => {
      if (!burgerContext) return

      burgerContext.setIsOpen(
        !burgerContext.isOpen,
      )
    },
    className: 'burger-button',
  }

  return (
    <header>
      <Button
        label='menu'
        button={menuAttributes}
      />
      <span onClick={() => navigate('/')}>
        chat-x
      </span>
      <StatusBar />
    </header>
  )
}

export default Header
