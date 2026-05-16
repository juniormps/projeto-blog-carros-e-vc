import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const NavbarBrand = () => {
  return (
    <NavLink to="/" className={styles.brand}>
      Carros & <span>VC</span>
    </NavLink>
  )
}

export default NavbarBrand
