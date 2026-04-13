import styles from "./UIState.module.css"

const ErrorState = ({ message = "Ocorreu um erro. Tente novamente." }) => {
  return (
    <div className={styles.state}>
      <p className="error">{message}</p>
    </div>
  )
}

export default ErrorState
