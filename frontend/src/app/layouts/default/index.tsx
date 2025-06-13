import { JSX } from 'react'
import { Header, Container } from '@ui'
import './style.css'

export type TDefaultProps = {
  children: JSX.Element
}

const Default = (props: TDefaultProps) => {
  const { children } = props

  return (
    <>
      <Header />
      <Container>
        <div className='content'>{children}</div>
      </Container>
    </>
  )
}

export default Default
