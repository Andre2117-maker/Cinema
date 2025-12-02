import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmePorId } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- IMPORTANTE
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);

  const horariosPorShopping = {
    "Shopping Ponta Negra": ["12:00", "15:30", "19:00"],
    "Shopping Manauara": ["13:00", "16:00", "20:00"],
    "Amazonas Shopping": ["14:00", "17:00", "21:30"],
  };

  useEffect(() => {
    async function fetch() {
      const data = await getFilmePorId(id);
      setFilme(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Carregando...</div>;
  if (!filme) return <div className="text-white text-center mt-10">Filme não encontrado.</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col md:flex-row gap-10">

      {/* Poster */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
          className="rounded-xl shadow-xl"
        />
      </div>

      {/* Info */}
      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold mb-4">{filme.title}</h1>

        <p className="text-yellow-400 text-lg font-semibold mb-4">
          ⭐ Nota IMDB: {filme.vote_average?.toFixed(1) || "N/A"}
        </p>

        <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
        <p className="text-gray-300 leading-relaxed mb-6">{filme.overview}</p>

        <h2 className="text-2xl font-semibold mb-3">Horários por Shopping</h2>

        <div className="flex flex-col gap-5">
          {Object.keys(horariosPorShopping).map((shopping, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">{shopping}</h3>

              <div className="flex flex-wrap gap-2">

                {horariosPorShopping[shopping].map((h, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/sessao/${id}-${h}`)}   // 👈 AQUI NAVEGA
                    className="px-3 py-1 bg-red-600 rounded-md text-sm font-semibold hover:bg-red-700"
                  >
                    {h}
                  </button>
                ))}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;
