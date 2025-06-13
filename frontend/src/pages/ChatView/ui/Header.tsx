import { useNavigate } from 'react-router-dom'
import style from './style.module.css'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className={style.header}>
      <button
        onClick={() => navigate('/chat-list')}
      >
        prev
      </button>
      <div className={style.chatInfo}>
        <span>Chat Name</span>
        <span>0 members active</span>
      </div>
    </div>
  )
}

export default Header
