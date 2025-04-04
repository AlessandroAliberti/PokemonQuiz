package com.aaliberti.pokemonquiz.repositories;

import com.aaliberti.pokemonquiz.entities.PokemonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonDao extends JpaRepository<PokemonEntity, Long> {
}
