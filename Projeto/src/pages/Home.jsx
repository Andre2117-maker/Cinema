import { useEffect, useState } from "react";
import { getFilmesDoMes, getEmBreve, getClassificacao} from "../services/api";
import MoviesCarousel from "../components/Carousel";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [emBreve, setEmBreve] = useState([]);

  useEffect(() => {
  async function carregar() {
    const lancamentos = await getFilmesDoMes();
    const proximos = await getEmBreve();
    const hoje = new Date();

    // ---- CLASSIFICAÇÕES ----
    const lancamentosComClass = await Promise.all(
      lancamentos.map(async f => ({
        ...f,
        classification: await getClassificacao(f.id)
      }))
    );

    const proximosComClass = await Promise.all(
      proximos.map(async f => ({
        ...f,
        classification: await getClassificacao(f.id)
      }))
    );

    // ---- FILTRAR EM BREVE ----
    const emBreveFiltrado = proximosComClass.filter(
      (f) => new Date(f.release_date) > hoje
    );

    const idsLancamentos = lancamentosComClass.map((f) => f.id);

    const emBreveSemDuplicados = emBreveFiltrado.filter(
      (f) => !idsLancamentos.includes(f.id)
    );

    // ---- SET FINAL (AGORA APENAS UMA VEZ) ----
    setFilmes(lancamentosComClass);
    setEmBreve(emBreveSemDuplicados);

    console.log("EM BREVE:", emBreveSemDuplicados);
  }

  carregar();
}, []);


  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold text-white mb-4">Lançamentos do mês</h2>
      <MoviesCarousel filmes={filmes} />

      <h2 className="text-3xl font-bold px-6 pt-10">Em breve</h2>
      <MoviesCarousel filmes={emBreve} emBreve />



      <img className = "block mx-auto mt-10 rounded-lg" src="https://media.istockphoto.com/id/1150354275/pt/foto/happy-family-watching-a-comedy-film-at-the-cinema.jpg?s=612x612&w=0&k=20&c=cq92w7dFbqti2hIRXNqqhbmUMlKg15yMgjtxpoL_JBc=" />
    </div>
  );
}

export default Home;
