import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../hooks/useAuthValue'
import NavbarBrand from './NavbarBrand'
import NavbarMenuToggle from './NavbarMenuToggle'
import NavbarLinkItem from './NavbarLinkItem'

const Navbar = () => {
    const { logout } = useAuthentication()
    const { user } = useAuthValue()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname])

  return (
    <nav className={styles.navbar}>
      <NavbarBrand />

      <NavbarMenuToggle
        isMenuOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((currentState) => !currentState)}
      />

      <ul
        id="navbar-links"
        className={`${styles.links_list} ${isMenuOpen ? styles.links_list_open : ''}`}
      >
        <NavbarLinkItem to="/">Home</NavbarLinkItem>

        {!user && (
          <>
            <NavbarLinkItem to="/login">Login</NavbarLinkItem>
            <NavbarLinkItem to="/register">Cadastrar</NavbarLinkItem>
          </>
        )}

        {user && (
          <>
            <NavbarLinkItem to="/posts/create">Novo post</NavbarLinkItem>
            <NavbarLinkItem to="/dashboard">Dashboard</NavbarLinkItem>
          </>
        )}

        <NavbarLinkItem to="/about">Sobre</NavbarLinkItem>

        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
