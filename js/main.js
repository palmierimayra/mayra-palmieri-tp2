import { obtenerTodosLosPokemon } from "./services/pokemonService.js";
import {
  mostrarSpinner,
  ocultarSpinner,
  mostrarLista,
  limpiarResultados,
  obtenerBusqueda,
  limpiarInput,
  mostrarError,
} from "./helpers/ui.js";

const botonBuscar = document.querySelector("#btnBuscar");
const botonVolver = document.querySelector("#btnVolver");
const inputPokemon = document.querySelector("#pokemonId");

let todos = [];

const cargarTodos = async () => {
  mostrarSpinner();
  try {
    todos = await obtenerTodosLosPokemon();
    mostrarLista(todos);
  } catch (error) {
    mostrarError("No se pudieron cargar los pokémon.");
  } finally {
    ocultarSpinner();
  }
};

const buscarPokemon = () => {
  const busqueda = obtenerBusqueda();

  if (!busqueda) {
    mostrarError("Debe ingresar un nombre o ID.");
    return;
  }

  const encontrados = todos.filter(
    (p) => String(p.id) === busqueda || p.name.includes(busqueda)
  );

  if (encontrados.length === 0) {
    limpiarResultados();
    mostrarError("El Pokémon buscado no existe.");
    return;
  }

  mostrarLista(encontrados);
};

const volver = () => {
  limpiarInput();
  todos.length > 0 ? mostrarLista(todos) : cargarTodos();
};

botonBuscar.addEventListener("click", buscarPokemon);
botonVolver.addEventListener("click", volver);

inputPokemon.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

cargarTodos();