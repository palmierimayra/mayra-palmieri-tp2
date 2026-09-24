import { obtenerTodosLosPokemon } from "./services/pokemonService.js";
import { renderPokemon } from "./components/pokemonCard.js";
import {
  mostrarSpinner,
  ocultarSpinner,
} from "./helpers/ui.js";

const inputPokemon = document.querySelector("#pokemonId");
const botonBuscar = document.querySelector("#btnBuscar");
const botonVolver = document.querySelector("#btnVolver");
const contenedorResultado = document.querySelector("#resultado");

let todos = [];

const mostrarError = (texto) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: texto,
    confirmButtonColor: "#dc3545",
  });
};

const mostrarLista = (lista) => {
  contenedorResultado.innerHTML = lista.map(renderPokemon).join("");
};

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
  const busqueda = inputPokemon.value.trim().toLowerCase();

  if (!busqueda) {
    mostrarError("Debe ingresar un nombre o ID.");
    return;
  }

  const encontrados = todos.filter(
    (p) => String(p.id) === busqueda || p.name.includes(busqueda)
  );

  if (encontrados.length === 0) {
    contenedorResultado.innerHTML = "";
    mostrarError("El Pokémon buscado no existe.");
    return;
  }

  mostrarLista(encontrados);
};

const volver = () => {
  inputPokemon.value = "";
  if (todos.length > 0) {
    mostrarLista(todos);
  } else {
    cargarTodos(); 
  }
  inputPokemon.focus();
};

botonBuscar.addEventListener("click", buscarPokemon);
botonVolver.addEventListener("click", volver);

inputPokemon.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

cargarTodos();