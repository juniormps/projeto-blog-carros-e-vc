import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../hooks/useAuthValue'

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
        <NavLink to={'/'} className={styles.brand}>Carros & <span>VC</span> </NavLink>

        <button
            type="button"
            className={styles.menu_toggle}
            aria-expanded={isMenuOpen}
            aria-controls="navbar-links"
            aria-label={isMenuOpen ? 'Fechar menu de navegacao' : 'Abrir menu de navegacao'}
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
            <span className={styles.menu_toggle_bar}></span>
            <span className={styles.menu_toggle_bar}></span>
            <span className={styles.menu_toggle_bar}></span>
        </button>

        <ul
            id="navbar-links"
            className={`${styles.links_list} ${isMenuOpen ? styles.links_list_open : ''}`}
        >
            <li>
                <NavLink to={'/'} className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
            </li>

            {!user && (
                <>
                    
                    <li>
                        <NavLink to={'/login'} className={({isActive}) => (isActive ? styles.active : "")}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/register'} className={({isActive}) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                    </li>
                    
                </>
            )}

            {user && (
                <>
                    
                    <li>
                        <NavLink to={'/posts/create'} className={({isActive}) => (isActive ? styles.active : "")}>Novo post</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard'} className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                    </li>
                    
                </>
            )}
            
            <li>
                <NavLink to={'/about'} className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink>
            </li>

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
