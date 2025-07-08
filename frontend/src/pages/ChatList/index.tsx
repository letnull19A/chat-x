import { ChatList as ChatListFeature } from '@features'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import './style.css'

const ChatList = () => {
  const navigate = useNavigate()

  const floatButtonProps = {
    onClick: () => navigate('/chat-create'),
    className: 'add-chat',
  }

  return (
    <>
      <div className='chat-list'>
        <ChatListFeature />
      </div>
      <div className='newchat-button'>
        <button {...floatButtonProps}>
          <FontAwesomeIcon icon='fa-solid fa-plus' />
        </button>
      </div>
    </>
  )
}

export default ChatList
