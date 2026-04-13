import styles from "./UIState.module.css"

const LoadingState = ({ message = "Carregando..." }) => {
  return (
    <div className={styles.state}>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default LoadingState
