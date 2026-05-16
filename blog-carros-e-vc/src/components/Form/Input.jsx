import styles from "./Input.module.css";

const Input = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <label className={styles.inputGroup}>
      <span>{label}</span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
};

export default Input;
