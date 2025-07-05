import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BurgerContext,
  type TBurgerContext,
} from '@contexts'
import data from './menu-items.json'
import { Button } from '@ui'
import './style.css'

type TBurgerMenuItemProps = {
  title: string
  path: string
}

const BurgerMenuItem = (
  props: TBurgerMenuItemProps,
) => {
  const navigate = useNavigate()
  const { title, path } = props
  const burgerMenuContext = useContext(
    BurgerContext,
  )

  const onHandleClick = () => {
    navigate(path),
      burgerMenuContext.setIsOpen(false)
  }

  return (
    <li
      className='burger-menu__item'
      onClick={onHandleClick}
    >
      {title}
    </li>
  )
}

const BurgerMenu = () => {
  const menuItems =
    data as Array<TBurgerMenuItemProps>
  const context = useContext(BurgerContext)

  const buttonAttributes = {
    className: 'menu-button',
    onClick: () => {
      if (!context) return

      context.setIsOpen(!context.isOpen)
    },
  }

  return context.isOpen ? (
    <div className='burger-menu'>
      <Button
        label='menu'
        button={buttonAttributes}
      />
      <ul className='burger-menu__container'>
        {menuItems.map((item, id) => (
          <BurgerMenuItem {...item} key={id} />
        ))}
      </ul>
    </div>
  ) : null
}

export default BurgerMenu
