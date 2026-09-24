const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const obtenerTodosLosPokemon = async () => {
    const respuesta = await fetch(`${API_URL}`);

    if (!respuesta.ok) throw new Error("No se pudo obtener la lista");
    const datos = await respuesta.json();
    
    return Promise.all(datos.results.map((p) => obtenerPokemon(p.name)));
};

export const obtenerPokemon = async (id) => {
    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener el pokemon");
    }

    const pokemon = await respuesta.json();

    return pokemon;
};
