## 01. Objetivo

Desarrollar una aplicación web interactiva que consuma la API pública de Pokémon (`https://pokeapi.co/`), aplicando conceptos de asincronía (`fetch` y `async/await`), modularización en JavaScript, renderizado dinámico de tarjetas Bootstrap y gestión de alertas interactivas de error mediante **SweetAlert2**.

## 02. Requerimientos Funcionales

1. **Carga Inicial de Datos**: Al cargar la página, la aplicación debe realizar una petición para mostrar un catálogo inicial con varias tarjetas (Cards de Bootstrap) de Pokémon.
2. **Buscador Dinámico**: Permitir la búsqueda de un Pokémon por su nombre o ID. Al realizar la búsqueda, la pantalla debe limpiarse para mostrar únicamente la tarjeta del personaje solicitado.
3. **Indicador de Carga (Loading State)**: Implementar un Spinner de Bootstrap que se muestre durante el lapso de espera de las peticiones HTTP y se oculte al finalizar (bloque `finally`).
4. **Restablecer Pantalla (Botón Volver)**: Incluir un botón para volver a cargar la lista inicial completa de Pokémon y limpiar el input de búsqueda.
5. **Gestión de Errores (SweetAlert2)**: Validar si el usuario envía la búsqueda vacía o si el Pokémon no existe, mostrando mensajes de error descriptivos mediante alertas de **SweetAlert2** (ej: "Debe ingresar un nombre o ID" o "El Pokémon solicitado no existe").

## 03. Criterios de Código y Modularización

- **Uso de Funciones Flecha y Promesas**: Emplear sintaxis ES6+ (`const`, `let`, arrow functions y `async/await` con captura de errores mediante `try/catch`).
- **Arquitectura Modular (Import / Export)**: Organizar el código separando las responsabilidades (Capa de Servicios para las llamadas `fetch` y Capa UI para la manipulación del DOM y SweetAlert2).