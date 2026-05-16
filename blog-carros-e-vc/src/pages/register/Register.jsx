import { useEffect, useState } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

import Input from "../../components/Form/Input";

import authStyles from "../../styles/auth.module.css";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={authStyles.authContainer}>
      <h1>Cadastre-se para postar</h1>

      <p>Crie seu usuário e compartilhe suas histórias!</p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nome:"
          type="text"
          name="displayName"
          placeholder="Nome do usuário"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

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
          placeholder="Crie sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirmação de senha:"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {!loading && <button className="btn">Cadastrar</button>}

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

export default Register;
