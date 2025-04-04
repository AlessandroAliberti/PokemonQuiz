package com.aaliberti.pokemonquiz.services;

import com.aaliberti.pokemonquiz.entities.PokemonEntity;
import com.aaliberti.pokemonquiz.repositories.PokemonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PokemonService {

    @Autowired
    PokemonDao pokemonDao;

    public void insertPokemon(PokemonEntity pokemon) {
        pokemonDao.save(pokemon);
    }

}
