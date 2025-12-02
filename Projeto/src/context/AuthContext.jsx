import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // carregar login salvo
  useEffect(() => {
    const saved = localStorage.getItem("cineUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function login(email, senha) {
    const savedUsers = JSON.parse(localStorage.getItem("cineUsers")) || [];
    const found = savedUsers.find(u => u.email === email && u.senha === senha);

    if (!found) return { error: "Email ou senha incorretos" };

    setUser(found);
    localStorage.setItem("cineUser", JSON.stringify(found));

    return { success: true };
  }

  function register(nome, email, senha) {
    const savedUsers = JSON.parse(localStorage.getItem("cineUsers")) || [];

    if (savedUsers.find(u => u.email === email)) {
      return { error: "Email já cadastrado" };
    }

    const novo = { nome, email, senha };
    savedUsers.push(novo);

    localStorage.setItem("cineUsers", JSON.stringify(savedUsers));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("cineUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
