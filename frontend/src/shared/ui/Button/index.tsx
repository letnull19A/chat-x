import './style.css'

export type TButtonProps = {
  label?: string
}

const Button = (props: TButtonProps) => {
  const { label } = props

  return (
    <button className='button'>{label}</button>
  )
}

export default Button
