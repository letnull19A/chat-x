import { useNavigate } from 'react-router-dom'
import {
  useContext,
  useState,
  useEffect,
} from 'react'
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

  const [className, setClassName] =
    useState<string>('status-wait')

  useEffect(() => {
    switch (socket.status) {
      case ConnectionStatus.CONNECTED:
        setClassName('status-connected')
        break
      case ConnectionStatus.WAITING:
        setClassName('status-wait')
        break
      case ConnectionStatus.ERROR:
        setClassName('status-error')
        break
    }
  }, [socket.status])

  return <div className={className}></div>
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
