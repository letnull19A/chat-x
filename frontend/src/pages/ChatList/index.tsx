import { Button } from '@ui'
import { ChatApi } from '@api'
import { useNavigate } from 'react-router-dom'
import './style.css'

const ChatList = () => {
  const data = ChatApi.getAll()

  const navigate = useNavigate()

  const floatButtonProps = {
    onClick: () => navigate('/chat-create'),
  }

  return (
    <>
      <div className='chat-list'>
        <ul className='chat-list__view'>
          {data.map((item) => (
            <li
              className='chat-list__item'
              onClick={() =>
                navigate(`/chat/${item.id}`)
              }
            >
              <img
                src=''
                className='chat-list__item-image'
              />
              <div className='chat-list__item-info'>
                <span className='chat-list__item-title'>
                  {item.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className='newchat-button'>
          <Button
            label='New chat'
            button={floatButtonProps}
          />
        </div>
      </div>
    </>
  )
}

export default ChatList
