import { useEffect, useState } from "react";
import { getFilmesDoMes } from "../services/api";
import MoviesCarousel from "../components/Carousel";

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function carregar() {
      const data = await getFilmesDoMes();
      setFilmes(data);
    }
    carregar();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <MoviesCarousel filmes={filmes} />
    </div>
  );
}

export default Home;
