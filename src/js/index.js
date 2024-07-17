// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
// Función para obtener las razas de perros
const fetchBreeds = async () => {
  // Hacemos una solicitud a la API
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  // Convertimos la respuesta en JSON
  const data = await response.json();
  // Seleccionamos el elemento <select> en el HTML
  const breedSelect = document.getElementById('breed-select');

  // Creamos una lista de razas. Creamos un array vacio.
  // hasOwnProperty se usa para verificar que la propiedad breed pertenece directamente al objeto data.message y no se hereda de su prototipo.
  const breeds = [];
  for (const breed in data.message) {
    if (data.message.hasOwnProperty(breed)) {
      breeds.push(breed);
    }
  }

  // Añadimos cada raza como una opción en el <select>
  for (const breed of breeds) {
    const option = document.createElement('option');
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  }
};

// Función para obtener una imagen de perro
const fetchDogImage = async breed => {
  // Hacemos una solicitud a la API para obtener una imagen
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  // Convertimos la respuesta en JSON
  const data = await response.json();
  // Seleccionamos el elemento <div> en el HTML
  const dogImageDiv = document.getElementById('dog-image');
  // Añadimos la imagen al <div>
  dogImageDiv.innerHTML = `<img src="${data.message}" alt="Dog Image">`;
};

// Añadimos un event listener al botón
document.getElementById('generate-dog').addEventListener('click', () => {
  // Obtenemos la raza seleccionada del <select>
  const breed = document.getElementById('breed-select').value;
  // Obtenemos y mostramos una imagen de la raza seleccionada
  fetchDogImage(breed);
});

// Creamos un objeto para encapsular las funciones
const dogApp = {
  fetchBreeds,
  fetchDogImage
};

// Inicializamos las razas cuando se carga la página
dogApp.fetchBreeds();
