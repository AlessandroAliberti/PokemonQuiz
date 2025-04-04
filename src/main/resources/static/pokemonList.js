let dataList = [];
let responseList = [];
const GET_ALL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500';
const INSERT_POKEMON_LIST = 'http://localhost:8080/pokemon-quiz/insert-pokemon-list';

const DOWNLOAD_BUTTON = document.getElementById('download-pokemons');

DOWNLOAD_BUTTON.addEventListener('click', function() {
    insertPokemonList();
});

let insertPokemonList = () => {
    fetch(GET_ALL_POKEMONS)
        .then(response => response.json())
        .then(data => {
            dataList = data['results'];

            const pokemonPromises = dataList.map(entity => getPokemonFromApiRequest(entity.url));

            Promise.all(pokemonPromises)
                .then(() => {
                    insertPokemonListCall(responseList);
                    alert('Pokemon downloaded succesfully!');
                })
                .catch(error => {
                    console.error('Error during all Pokémon requests:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

let getPokemonFromApiRequest = url => {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.is_default) {
                responseList.push({
                    name: data.name,
                    url: url,
                    height: data.height,
                    weight: data.weight,
                    type: data.types[0].type.name,
                    secondType: (data.types[1] ? data.types[1].type.name : "")
                });
            }
        })
        .catch(error => {
            console.error('Error fetching individual Pokémon:', error);
        });
};

let insertPokemonListCall = pokemonList => {
    fetch(INSERT_POKEMON_LIST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemonList)
    })
        .then(response => response.json())
        .then(response => {
            console.log('Pokemon list inserted successfully:', response);
        })
        .catch(error => {
            console.error('Error inserting Pokémon list:', error);
        });
};
