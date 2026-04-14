import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>Página não encontrada.</p>
        <span>Desculpe, não conseguimos achar o que você procurava.</span>
        <Link to="/" className="btn btn-dark">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
