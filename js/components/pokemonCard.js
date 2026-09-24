// Color de Bootstrap para cada tipo (success = verde, danger = rojo, etc.)
const COLORES = {
  normal: "secondary",
  fire: "danger",
  water: "primary",
  grass: "success",
  electric: "warning",
  ice: "info",
  fighting: "danger",
  poison: "dark",
  ground: "warning",
  flying: "info",
  psychic: "danger",
  bug: "success",
  rock: "secondary",
  ghost: "dark",
  dragon: "primary",
  dark: "dark",
  steel: "secondary",
  fairy: "danger",
};

// Stats que se muestran en la card, con el nombre que usa la API
const STATS_VISIBLES = ["hp", "attack"];

// Bootstrap solo trae anchos de 25, 50, 75 y 100%, así que redondeamos a esos
const anchoBarra = (valor) => {
  const cuartos = Math.round((valor / 160) * 4);
  return Math.min(100, Math.max(25, cuartos * 25));
};

export const renderPokemon = (pokemon) => {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  const imagen =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;
  const color = COLORES[pokemon.types[0].type.name] ?? "secondary";

  const badges = pokemon.types
    .map(({ type }) => {
      const colorTipo = COLORES[type.name] ?? "secondary";
      return `<span class="badge rounded-pill text-bg-${colorTipo}">${type.name}</span>`;
    })
    .join(" ");

  const barras = pokemon.stats
    .filter((s) => STATS_VISIBLES.includes(s.stat.name))
    .map(
      (s) => `
        <div class="d-flex justify-content-between small">
          <span class="text-muted">${s.stat.name}</span>
          <strong>${s.base_stat}</strong>
        </div>
        <div class="progress mb-2" role="progressbar" aria-label="${s.stat.name}"
             aria-valuenow="${s.base_stat}" aria-valuemin="0" aria-valuemax="160">
          <div class="progress-bar bg-${color} w-${anchoBarra(s.base_stat)}"></div>
        </div>`
    )
    .join("");

  return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <div class="card card-pokedex shadow-sm rounded-4 border-0">
        <img src="${imagen}" alt="${pokemon.name}" width="110" height="110" class="align-self-end">

        <div class="bg-white rounded-3 p-2 mt-auto mb-3">
          <div class="d-flex align-items-baseline gap-2 mb-1">
            <span class="fw-bold fs-6">${pokemon.name}</span>
            <span class="fw-bold text-muted small">${numero}</span>
          </div>
          <div class="mb-2">${badges}</div>

          <div class="row g-2 align-items-center">
            <div class="col-5 border-end">
              <div class="small text-muted">Altura</div>
              <div class="fw-bold mb-1">${pokemon.height / 10} m</div>
              <div class="small text-muted">Peso</div>
              <div class="fw-bold">${pokemon.weight / 10} kg</div>
            </div>
            <div class="col-7">
              ${barras}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};