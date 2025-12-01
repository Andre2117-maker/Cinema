function MovieCard({ title, description = "", image, horarios = [] }) {
  
  const MAX = 120; // limite da sinopse
  const text = description.length > MAX 
    ? description.slice(0, MAX) + "..." 
    : description;

  return (
    <div className="relative w-56 bg-gray-700 text-white rounded-xl overflow-hidden shadow-lg group cursor-pointer mx-2">

      {/* Moldura branca + poster */}
      <div className=" p-2 rounded-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      {/* Título e sinopse */}
      <div className="px-3 py-2">
        <h1 className="text-base font-bold line-clamp-2 text-center mb-1">
          {title}
        </h1>

        <p className="text-xs text-gray-300 line-clamp-3">
          {text}
        </p>
      </div>

      {/* Overlay de horários */}
      <div className="
        absolute inset-0 bg-black/80 
        flex flex-col items-center justify-center gap-3
        opacity-0 group-hover:opacity-100 transition-opacity
      ">
        <h2 className="text-xl font-semibold">Horários</h2>

        <div className="flex flex-wrap justify-center gap-2">
          {horarios.length > 0 ? (
            horarios.map((h, i) => (
              <span 
                key={i}
                className="bg-red-600 px-3 py-1 rounded-md text-sm"
              >
                {h}
              </span>
            ))
          ) : (
            <p className="text-sm">Sem horários</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default MovieCard;
