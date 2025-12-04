import { useNavigate } from "react-router-dom";

function MovieCard({
  id,
  title,
  description = "",
  image,
  horarios = [],
  releaseDate,
  emBreve,
  classification,
}) {
  const navigate = useNavigate();

  const MAX = 120;
  const text =
    description.length > MAX ? description.slice(0, MAX) + "..." : description;

  function abrirDetalhes() {
    navigate(`/movie/${id}`);
  }

  function irParaSessao(horario, event) {
    event.stopPropagation();
    navigate(`/sessao/${id}?horario=${horario}`);
  }

  return (
    <div
      onClick={abrirDetalhes}
      className="relative w-56 bg-gray-700 text-white rounded-xl overflow-hidden shadow-lg group cursor-pointer mx-2"
    >
      {/*Poster */}
      
      <div className="p-2 rounded-xl">


        {/* Idade indicativa */}
        {classification && (
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-xs font-bold rounded">
            {classification}
          </div>
        )}

        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      <div className="px-3 py-2">
        <h1 className="text-base font-bold line-clamp-2 text-center mb-1">
          {title}
        </h1>
        <p className="text-xs text-gray-300 line-clamp-3">{text}</p>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {emBreve ? (
          // ===== EM BREVE =====
          <div className="text-center">
            <h2 className="text-xl font-semibold">Lança em</h2>
            <p className="text-lg text-yellow-300 font-bold">
              {new Date(releaseDate).toLocaleDateString("pt-BR")}
            </p>
          </div>
        ) : (
          // ===== LANÇAMENTOS (com horários) =====
          <>
            <h2 className="text-xl font-semibold">Horários</h2>

            <div className="flex flex-wrap justify-center gap-2">
              {horarios.map((h, i) => (
                <button
                  key={i}
                  onClick={(event) => irParaSessao(h, event)}
                  className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-700 pointer-events-auto"
                >
                  {h}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
