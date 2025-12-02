import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import SeatSelection from "./pages/SeatSelection";


function App() {
  return (
    <>
    <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/sessao/:id" element={<SeatSelection />} />
      </Routes>
    </>
  );

  
}

export default App;
