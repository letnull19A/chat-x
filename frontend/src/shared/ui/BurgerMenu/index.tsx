import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BurgerContext,
  type TBurgerContext,
} from '@contexts'
import data from './menu-items.json'
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

  return (
    <li
      className='burger-menu__item'
      onClick={() => navigate(path)}
    >
      {title}
    </li>
  )
}

const BurgerMenu = () => {
  const menuItems =
    data as Array<TBurgerMenuItemProps>
  const context = useContext(BurgerContext)

  return (
    <div className='burger-menu'>
      <ul>
        {menuItems.map((item, id) => (
          <BurgerMenuItem {...item} key={id} />
        ))}
      </ul>
    </div>
  )
}

export default BurgerMenu
