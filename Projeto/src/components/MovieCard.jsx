import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, description = "", image, horarios = [] }) {
  const navigate = useNavigate();

  const MAX = 120;
  const text = description.length > MAX 
    ? description.slice(0, MAX) + "..." 
    : description;

  function abrirDetalhes() {
    navigate(`/movie/${id}`);
  }

  function irParaSessao(horario) {
    // impedir que o clique no botão também acione o clique do card
    event.stopPropagation(); 
    navigate(`/sessao/${id}?horario=${horario}`);
  }

  return (
    <div
      onClick={abrirDetalhes}
      className="relative w-56 bg-gray-700 text-white rounded-xl overflow-hidden shadow-lg group cursor-pointer mx-2"
    >

      <div className="p-2 rounded-xl">
        <img src={image} alt={title} className="w-full h-80 object-cover rounded-lg" />
      </div>

      <div className="px-3 py-2">
        <h1 className="text-base font-bold line-clamp-2 text-center mb-1">
          {title}
        </h1>
        <p className="text-xs text-gray-300 line-clamp-3">{text}</p>
      </div>

      {/* Overlay com horários */}
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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
      </div>
    </div>
  );
}

export default MovieCard;
