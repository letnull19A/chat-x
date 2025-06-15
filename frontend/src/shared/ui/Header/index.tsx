import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {
  SocketContext,
  ConnectionStatus,
} from '@contexts'
import { Container } from '@ui'
import './style.css'

const StatusBar = () => {
  const socket = useContext(SocketContext)

  return socket.status ===
    ConnectionStatus.CONNECTED ? (
    <i>connected</i>
  ) : (
    <i>waiting...</i>
  )
}

const Header = () => {
  const navigate = useNavigate()

  return (
    <header>
      <Container>
        <span onClick={() => navigate('/')}>
          chat-x
        </span>
        <StatusBar />
      </Container>
    </header>
  )
}

export default Header
