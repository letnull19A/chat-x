import './style.css'

export type TButtonProps = {
  label?: string
  button?: ButtonHTMLAttributes
}

const Button = (props: TButtonProps) => {
  const { label, button } = props

  return (
    <button className='button' {...button}>
      {label}
    </button>
  )
}

export default Button
