import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmePorId, getElenco, getClassificacao } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- IMPORTANTE
  const [filme, setFilme] = useState(null);
  const [elenco, setElenco] = useState([]);
  const [loading, setLoading] = useState(true);

  const horariosPorShopping = {
    "Shopping Ponta Negra": ["12:00", "15:30", "19:00"],
    "Shopping Manauara": ["13:00", "16:00", "20:00"],
    "Amazonas Shopping": ["14:00", "17:00", "21:30"],
  };

  useEffect(() => {
    async function fetch() {
      const data = await getFilmePorId(id);
      const classification = await getClassificacao(id);
      setFilme(data);

      const cast = await getElenco(id);
      setElenco(cast);

      setFilme({ ...data, classification });
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Carregando...</div>;
  if (!filme)
    return (
      <div className="text-white text-center mt-10">Filme não encontrado.</div>
    );

  const hoje = new Date();
  const dataFilme = new Date(filme.release_date);
  const isEmBreve = dataFilme > hoje;

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

        <p className="text-sm bg-red-600 inline-block px-2 py-1 rounded mb-4">
          Classificação: {filme.classification || "N/A"}
        </p>

        <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
        <p className="text-gray-300 leading-relaxed mb-6">{filme.overview}</p>

        {/* SE FOR EM BREVE → mostra elenco */}
        {isEmBreve && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Elenco</h2>

            <div className="flex flex-wrap gap-3">
              {elenco.map((ator) => (
                <div
                  key={ator.id}
                  className="bg-gray-800 px-3 py-2 rounded-lg shadow-md"
                >
                  <p className="font-semibold">{ator.name}</p>
                  <p className="text-sm opacity-70">{ator.character}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {/* FILME EM LANÇAMENTO → horários + elenco */}
        {!isEmBreve && (
          <>
            <h2 className="text-2xl font-semibold mb-3">
              Horários por Shopping
            </h2>

            <div className="flex flex-col gap-5">
              {Object.keys(horariosPorShopping).map((shopping, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-3">{shopping}</h3>

                  <div className="flex flex-wrap gap-2">
                    {horariosPorShopping[shopping].map((h, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(`/sessao/${id}-${h}`)}
                        className="px-3 py-1 bg-red-600 rounded-md text-sm font-semibold hover:bg-red-700"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ELENCO PARA FILMES EM LANÇAMENTO */}
            <h2 className="text-2xl font-semibold mt-10 mb-4">Elenco</h2>

            <div className="flex flex-wrap gap-3">
              {elenco.map((ator) => (
                <div
                  key={ator.id}
                  className="bg-gray-800 px-3 py-2 rounded-lg shadow-md"
                >
                  <p className="font-semibold">{ator.name}</p>
                  <p className="text-sm opacity-70">{ator.character}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
