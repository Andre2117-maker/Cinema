import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";

function MoviesCarousel({ filmes }) {
  return (
    <div className="px-2 py-2">
      <h2 className="text-2xl font-bold text-white mb-4">Lançamentos do mês</h2>

      <Swiper
        spaceBetween={10}
        slidesPerView={5}
      >
        {filmes.map((filme) => (
          <SwiperSlide key={filme.id}>
            <MovieCard
              id  = {filme.id}
              title={filme.title}
              description={filme.overview}
              image={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              horarios={["12:30", "15:00", "19:00"]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MoviesCarousel;
