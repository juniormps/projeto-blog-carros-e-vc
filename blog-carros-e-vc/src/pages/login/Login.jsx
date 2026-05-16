import { useEffect, useState } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

import Input from "../../components/Form/Input";

import authStyles from "../../styles/auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={authStyles.authContainer}>
      <h1>Entrar</h1>

      <p>Faça seu login para poder utilizar o sistema.</p>

      <form onSubmit={handleSubmit}>
        <Input
          label="E-mail:"
          type="email"
          name="email"
          placeholder="E-mail do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha:"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!loading && <button className="btn">Entrar</button>}

        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
