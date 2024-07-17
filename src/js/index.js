// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
// Función para obtener las razas de perros
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

const breedsSelect = document.getElementById('breed-select'); // Actualizamos el ID aquí para mantener consistencia

const printAllBreeds = breeds => {
  const fragment = document.createDocumentFragment();
  breeds.forEach(breed => {
    const newOption = document.createElement('option');
    newOption.value = breed; // Añadimos el valor de la opción
    newOption.textContent = breed;
    fragment.append(newOption);
  });

  breedsSelect.append(fragment);
};

const fetchBreeds = async () => {
  try {
    // Hacemos una solicitud a la API
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    // Convertimos la respuesta en JSON
    const data = await response.json();
    // Obtenemos todas las razas como un array
    const allBreeds = Object.keys(data.message);
    // Imprimimos todas las razas en el <select>
    printAllBreeds(allBreeds);
  } catch (error) {
    console.log(error);
  }
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
