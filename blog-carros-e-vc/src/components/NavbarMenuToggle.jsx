import styles from './Navbar.module.css'

const NavbarMenuToggle = ({ isMenuOpen, onToggle }) => {
  return (
    <button
      type="button"
      className={styles.menu_toggle}
      aria-expanded={isMenuOpen}
      aria-controls="navbar-links"
      aria-label={isMenuOpen ? 'Fechar menu de navegacao' : 'Abrir menu de navegacao'}
      onClick={onToggle}
    >
      <span className={styles.menu_toggle_bar}></span>
      <span className={styles.menu_toggle_bar}></span>
      <span className={styles.menu_toggle_bar}></span>
    </button>
  )
}

export default NavbarMenuToggle
