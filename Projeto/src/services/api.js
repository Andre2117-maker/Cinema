const API_KEY = "c65304086c2d7d15752eaa726ee39eb3";
const BASE = "https://api.themoviedb.org/3";

export async function getFilmesDoMes() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const primeiroDia = `${ano}-${mes}-01`;
  const ultimoDia = `${ano}-${mes}-31`;

  const url = `${BASE}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&primary_release_date.gte=${primeiroDia}&primary_release_date.lte=${ultimoDia}`;

  const req = await fetch(url);
  const json = await req.json();
  return json.results;
}

export async function getFilmePorId(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}
