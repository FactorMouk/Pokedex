import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokemonDetailsComponent } from './../../../shared/modals/pokemon-details/pokemon-details.component';

import { PokemonService } from './../../../core/services/pokemon.service';

import { PaginationModel } from './../../../core/models/pagination-model';
import { PokemonModel } from '../../../core/models/pokemon-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pokedex: PaginationModel;
  pokemons;
  currentOffset = 0;
  pokemonsLoaded = 0;

  columns;

  pokemonDetailsModal;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.defineColumns();
    this.getPokemons('offset=0&limit=0');
  }

  ngOnDetroy(): void {
    if (this.paginationSubscribe) {
      this.paginationSubscribe.unsubscribe();
    }
    if (this.pokemonSubscribe) {
      this.pokemonSubscribe.unsubscribe();
    }
  }

  paginationSubscribe: Subscription;
  pokemonSubscribe: Subscription;
  getPokemons(pagination: string) {
    this.pokedex = null;
    this.pokemons = [];
    this.pokemonsLoaded = 0;
    for (let i = 0; i < 20; i++) {
      this.pokemons.push({ loaded: false });
    }
    this.paginationSubscribe = this.pokemonService
      .getPokemons(pagination)
      .subscribe(
        (pokedex: any) => {
          this.pokedex = pokedex;
          this.pokedex.results.forEach((pokemon: any) => {
            this.pokemonSubscribe = this.pokemonService
              .getPokemon(
                pokemon.url.substring(
                  'https://pokeapi.co/api/v2/pokemon/'.length
                )
              )
              .subscribe((pokemonData: any) => {
                //Definindo os tipos do Pokémon
                const types = [];
                pokemonData.types.forEach((typeData) => {
                  types.push(typeData.type.name);
                });
                //Definindo os stats do Pokémon
                const stats = [];
                pokemonData.stats.forEach((statData) => {
                  stats.push(statData.base_stat);
                });
                //Definindo as habilidades do Pokémon
                const abilities = [];
                pokemonData.abilities.forEach((abilityData) => {
                  abilities.push(abilityData.ability.name);
                });
                this.pokemons[
                  pokemonData.id - (1 + this.currentOffset)
                ].pokemonData = new PokemonModel(
                  pokemonData.id,
                  pokemonData.name,
                  pokemonData.sprites.front_default,
                  types,
                  pokemonData.height,
                  pokemonData.weight,
                  stats,
                  abilities
                );
                this.pokemons[
                  pokemonData.id - (1 + this.currentOffset)
                ].loaded = true;
                this.pokemonsLoaded++;
              });
          });
        },
        (error) => console.log(error)
      );
  }

  changePage(type: string) {
    document.querySelector('mat-sidenav-content').scrollTop = 0;
    let url;
    if (type === 'previous') {
      url = this.pokedex.previous;
      this.currentOffset -= 20;
    } else if (type === 'next') {
      url = this.pokedex.next;
      this.currentOffset += 20;
    }
    this.getPokemons(
      url.substring('https://pokeapi.co/api/v2/pokemon?'.length)
    );
  }

  openPokemonDetails(pokemon) {
    this.pokemonDetailsModal = this.dialog.open(PokemonDetailsComponent, {
      data: {
        pokemon: pokemon,
      },
    });
  }

  defineColumns() {
    if (window.innerWidth <= 400) {
      this.columns = 1;
    } else if (window.innerWidth <= 600) {
      this.columns = 2;
    } else if (window.innerWidth <= 900) {
      this.columns = 3;
    } else if (window.innerWidth > 900) {
      this.columns = 4;
    }
  }
}
