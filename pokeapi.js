let id = 25;
let api_url = 'https://pokeapi.co/api/v2/';
let api_endpoint = 'pokemon';

let pokemon_id = document.getElementById('pokemon_id');
let pokemon_name = document.getElementById('pokemon_name');
let pokemon_data = document.getElementById('pokemon_data');
let alert = document.getElementById('error');

document.addEventListener('DOMContentLoaded', cargarDatos);

function cargarDatos() {
    fetch(api_url + api_endpoint + '/' + id)
        .then(response => response.json())
        .then(pokemon => {
            pokemon_id.textContent = id;
            pokemon_name.textContent = pokemon.name;

            pokemon_data.replaceChildren();
            pokemon_data.append(filaTabla('Experiencia', pokemon.base_experience));
            pokemon_data.append(filaTabla('Altura', pokemon.height / 10 + ' m'));
            pokemon_data.append(filaTabla('Peso', pokemon.weight / 10 + ' kg'));
            pokemon_data.append(filaTabla('Imagen', '<img class="artwork" alt="Artwork oficial" src="' + pokemon.sprites.other['official-artwork'].front_default + '"/>'));

            alert.classList.add('d-none');
        })
        .catch(error => {
            pokemon_id.textContent = '?';
            pokemon_name.textContent = 'Error';

            alert.textContent = error;
            alert.classList.remove('d-none');
        });
}

function filaTabla(titulo, contenido) {
    let tr = document.createElement('tr');

    let th = document.createElement('th');
    th.classList.add("table-dark");
    th.textContent = titulo;
    tr.append(th);

    let td = document.createElement('td');
    td.innerHTML = contenido;
    tr.append(td);

    return tr;
}

let boton_menos = document.getElementById('boton_menos');
let boton_mas = document.getElementById('boton_mas');

boton_menos.addEventListener('click', () => {
    id--;
    cargarDatos();
});

boton_mas.addEventListener('click', () => {
    id++;
    cargarDatos();
});
