const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore');
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon, index) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#00${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <button class="bDetails" type="button">Detalhes</button>
      </li>`);

    pokemonList.innerHTML += newHtml.join('');

    const bDetailsButtons = document.querySelectorAll('.bDetails');
    bDetailsButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const detailDiv = document.createElement('div');
        const pokemon = pokemons[index]; 
        detailDiv.innerHTML = `
          <h3>${pokemon.name}</h3>
          <p>Number: #00${pokemon.number}</p>
          <p>Types: ${pokemon.types.join(', ')}</p>
        `;
        button.parentNode.appendChild(detailDiv);
      });
    });
  });
}

loadPokemonItems(offset, limit);
