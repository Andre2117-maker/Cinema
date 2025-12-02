import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg border-b border-gray-700">
      <h1 className="text-2xl font-bold">CineAndre</h1>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-300 hover:text-white transition">
          Home
        </Link>

        {user ? (
          <>
            <span className="text-gray-300">Olá, {user.name}</span>

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
