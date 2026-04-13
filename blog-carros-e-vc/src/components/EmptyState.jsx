import { Link } from "react-router-dom"
import styles from "./UIState.module.css"

const EmptyState = ({ message, actionLabel, actionTo, actionVariant = "btn" }) => {
  
  return (
    <div className={styles.state}>
      <p className={styles.message}>{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={`${actionVariant} ${styles.emptyAction}`}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
