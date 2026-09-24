export const mostrarSpinner = () => {
  document.querySelector("#spinner").classList.remove("d-none");
};

export const ocultarSpinner = () => {
  document.querySelector("#spinner").classList.add("d-none");
};