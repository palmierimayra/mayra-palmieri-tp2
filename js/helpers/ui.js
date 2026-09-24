import { renderPokemon } from "../components/pokemonCard.js";

const spinner = document.querySelector("#spinner");
const contenedorResultado = document.querySelector("#resultado");
const inputPokemon = document.querySelector("#pokemonId");

export const mostrarSpinner = () => {
  spinner.classList.remove("d-none");
};

export const ocultarSpinner = () => {
  spinner.classList.add("d-none");
};

export const mostrarLista = (lista) => {
  contenedorResultado.innerHTML = lista.map(renderPokemon).join("");
};

export const limpiarResultados = () => {
  contenedorResultado.innerHTML = "";
};

export const obtenerBusqueda = () => inputPokemon.value.trim().toLowerCase();

export const limpiarInput = () => {
  inputPokemon.value = "";
  inputPokemon.focus();
};

export const mostrarError = (texto) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: texto,
    confirmButtonColor: "#dc3545",
  });
};