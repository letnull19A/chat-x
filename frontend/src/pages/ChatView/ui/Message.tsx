import './style.module.css'

type TMessageProps = {
  id: string
  userId: string
  text: string
  date: DateTime
  type: 'own' | 'apponent'
}

const Message = (props: TMessageProps) => {
  const { text } = props

  return (
    <div className='message'>
      <p className='message_text'>{text}</p>
    </div>
  )
}

export default Message
