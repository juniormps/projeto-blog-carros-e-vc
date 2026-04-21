import { useEffect } from "react";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDangerous = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="modal-title">{title}</h3>
        </div>

        <div className={styles.body}>
          <p>{message}</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={`${styles.confirmBtn} ${isDangerous ? styles.dangerous : ""}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Excluindo..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
