package com.aaliberti.pokemonquiz.controllers;

import com.aaliberti.pokemonquiz.entities.PokemonEntity;
import com.aaliberti.pokemonquiz.services.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RestController
@RequestMapping("/pokemon-quiz")
public class PokemonREST {

    @Autowired
    private PokemonService pokemonService;
    @Autowired
    private WebClient.Builder webClientBuilder;

    @PostMapping("/insert-pokemon-list")
    public ResponseEntity<Void> insertPokemonList(@RequestBody List<PokemonEntity> pokemonList) {
        for (PokemonEntity pokemon : pokemonList) {
            pokemon.setSecondType(pokemon.getSecondType().isBlank() ? null : pokemon.getSecondType());
            pokemonService.insertPokemon(pokemon);
        }
        return ResponseEntity.noContent().build();
    }

}
