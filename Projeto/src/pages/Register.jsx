import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const result = register(nome, email, senha);

    if (result.error) {
      setErro(result.error);
      return;
    }

    alert("Conta criada com sucesso!");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-80 text-white"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Criar Conta</h1>

        {erro && <p className="text-red-400 mb-3">{erro}</p>}

        <input
          type="text"
          placeholder="Nome completo"
          className="w-full p-2 rounded mb-3 bg-gray-700"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-2 rounded mb-3 bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 rounded mb-3 bg-gray-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-2 rounded mt-2 hover:bg-blue-700">
          Criar Conta
        </button>

        <p className="text-center mt-3 text-sm">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-400">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
