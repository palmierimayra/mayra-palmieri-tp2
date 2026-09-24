import { obtenerTodosLosPokemon } from "./services/pokemonService.js";
import { renderPokemon } from "./components/pokemonCard.js";
import {
  mostrarSpinner,
  ocultarSpinner,
  mostrarMensaje,
  limpiarMensaje,
} from "./helpers/ui.js";

const inputPokemon = document.querySelector("#pokemonId");
const botonBuscar = document.querySelector("#btnBuscar");
const contenedorResultado = document.querySelector("#resultado");

let todos = [];

const mostrarLista = (lista) => {
  contenedorResultado.innerHTML = lista.map(renderPokemon).join("");
};

const cargarTodos = async () => {
  mostrarSpinner();
  try {
    todos = await obtenerTodosLosPokemon();
    mostrarLista(todos);
  } catch (error) {
    mostrarMensaje(error.message);
  } finally {
    ocultarSpinner();
  }
};

const buscarPokemon = () => {
  const busqueda = inputPokemon.value.trim().toLowerCase();
  limpiarMensaje();

  if (!busqueda) {
    mostrarLista(todos);
    return;
  }

  const encontrados = todos.filter(
    (p) => String(p.id) === busqueda || p.name.includes(busqueda)
  );

  if (encontrados.length === 0) {
    contenedorResultado.innerHTML = "";
    mostrarMensaje("No se encontró ningún Pokemon con ese nombre o ID.");
    return;
  }

  mostrarLista(encontrados);
};

botonBuscar.addEventListener("click", buscarPokemon);

inputPokemon.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

cargarTodos();