import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const NavbarLinkItem = ({ to, children }) => {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => (isActive ? styles.active : '')}>
        {children}
      </NavLink>
    </li>
  )
}

export default NavbarLinkItem
