"use strict";
const aplicacion = document.querySelector(".container");
const now = new Date();
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=rain&hourly=rain&timezone=auto&forecast_days=1";
fetch(url)
  .then((res) => res.json())
  .then((response) => {
    // Tu respuesta JSON de la API
    // Obtener el elemento con el ID "weatherList"
    const weatherList = document.getElementById("weatherList");
    // Mostrar información por cada hora
    for (let i = 0; i < 8 && i < response.hourly.time.length; i++) {
      // Obtener la hora actual más la hora correspondiente
      const currentHour = new Date(now.getTime() + i * 60 * 60 * 1000);

      // Formatear la fecha y la hora
      const formattedDate = formatDate(currentHour);
      const formattedTime = formatTime(currentHour);

      // Obtener la cantidad de lluvia para la hora actual
      const rainAmount = response.hourly.rain[i];

      // Imprimir la información
      // console.log( `Día: ${formattedDate}, Hora: ${formattedTime}, Lluvia: ${rainAmount} mm` );

      // Crear un nuevo elemento de lista (li) para mostrar la información
      const listItem = document.createElement("li");
      listItem.textContent = `Día: ${formattedDate}, Hora: ${formattedTime}, Lluvia: ${rainAmount} mm`;

      // Agregar el elemento de lista a la lista
      weatherList.appendChild(listItem);
    }
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });

// Función para formatear la fecha (dd/mm/aa)
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

// Función para formatear la hora (hh:mm)
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
