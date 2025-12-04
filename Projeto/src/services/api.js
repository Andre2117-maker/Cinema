const API_KEY = "c65304086c2d7d15752eaa726ee39eb3";
const BASE = "https://api.themoviedb.org/3";

export async function getFilmesDoMes() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth(); // 0-11

  const primeiroDia = new Date(ano, mes, 1);
  const primeiroDiaProxMes = new Date(ano, mes + 1, 1);

  const url = `${BASE}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&primary_release_date.gte=${primeiroDia
    .toISOString()
    .slice(0, 10)}&primary_release_date.lt=${primeiroDiaProxMes
    .toISOString()
    .slice(0, 10)}`;

  const req = await fetch(url);
  const json = await req.json();

  // 🔥 Garantia: pegar só filmes do mês + limitar a 15
  return json.results
    .filter((f) => {
      const data = new Date(f.release_date);
      return data >= primeiroDia && data < primeiroDiaProxMes;
    })
    .slice(0, 15);
}

export async function getFilmePorId(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getEmBreve() {
  const hoje = new Date();

  const url = `${BASE}/movie/upcoming?api_key=${API_KEY}&language=pt-BR&region=US&page=1`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.results) return [];

  const futuros = json.results.filter(movie => {
    const data = new Date(movie.release_date);
    return data > hoje; // garante só filmes futuros
  });

  futuros.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  return futuros.slice(0, 20);
}

export async function getElenco(id) {
  const url = `${BASE}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`;

  const res = await fetch(url);
  const json = await res.json();

  return json.cast?.slice(0, 10) || []; // pega até 10 atores
}

export async function getClassificacao(id) {
  const url = `${BASE}/movie/${id}/release_dates?api_key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.results) return null;

  const br = json.results.find(r => r.iso_3166_1 === "BR");

  if (!br || !br.release_dates.length) return null;

  const cert = br.release_dates[0].certification;

  return cert || null;
}

