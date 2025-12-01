function NavBar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <h1 className="text-2xl font-bold">CineAndre</h1>

      <div className="space-x-4">
        <a
          href="/"
          className="text-gray-300 hover:text-white transition"
        >
          Home
        </a>

        <a
          href="/login"
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
