import {
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { RouterApp } from '@routes'
import {
  SocketContext,
  ConnectionStatus,
} from '@contexts'
import { io, Socket } from 'socket.io-client'

function App() {
  const socketRef = useRef<Socket>(null)
  const [status, setStatus] =
    useState<ConnectionStatus>(
      ConnectionStatus.CLOSED,
    )

  const data = {
    socket: null,
    status,
    setStatus,
  }

  useLayoutEffect(() => {
    socketRef.current = io(
      import.meta.env.VITE_CHAT_DOMAIN,
    )

    if (socketRef.current === undefined) return

    socketRef.current?.on('connect', () => {
      setStatus(ConnectionStatus.CONNECTED)
    })

    socketRef.current?.on('error', () => {
      setStatus(ConnectionStatus.ERROR)
    })

    socketRef.current?.on('disconnect', () => {
      setStatus(ConnectionStatus.CLOSED)
    })
  }, [])

  return (
    <SocketContext.Provider value={data}>
      <RouterApp />
    </SocketContext.Provider>
  )
}

export default App
