import { Component, OnInit } from '@angular/core';

import { PokemonService } from './../../../core/services/pokemon.service';

import { PokemonModel } from '../../../core/models/pokemon-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pokedex;
  pokemons;
  currentOffset = 0;
  pokemonsLoaded = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons('offset=0&limit=0');
  }

  getPokemons(pagination) {
    this.pokedex = null;
    this.pokemons = [];
    this.pokemonsLoaded = 0;
    for(let i = 0; i < 20; i++) {
      this.pokemons.push({loaded: false});
    }
    this.pokemonService.getPokemons(pagination).subscribe(
      (data) => {
        this.pokedex = data;
        this.pokedex.results.forEach(pokemon => {
          this.pokemonService.getPokemon(pokemon.url.substring('https://pokeapi.co/api/v2/pokemon/'.length)).subscribe(
            (pokemon) => {
              this.pokemons[pokemon['id'] - (1 + this.currentOffset)]['pokemon'] = new PokemonModel(pokemon['id'], pokemon['name'], pokemon['sprites']['front_default']);
              this.pokemons[pokemon['id'] - (1 + this.currentOffset)]['loaded'] = true;
              this.pokemonsLoaded++;
            }
          )
        });
      },
      (error) => console.log(error)
    )
  }

  changePage(type) {
    let url;
    if(type === 'previous') {
      url = this.pokedex.previous;
      this.currentOffset -= 20;
    } else if(type === 'next') {
      url = this.pokedex.next;
      this.currentOffset += 20;
    }
    this.getPokemons(url.substring('https://pokeapi.co/api/v2/pokemon?'.length));
  }

}
