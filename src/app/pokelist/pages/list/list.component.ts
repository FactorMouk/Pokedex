import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Biblioteca do elemento Dialog (Modal) do Material
import { Subscription } from 'rxjs'; // Tipo Subscription para manipulação dos Subscribes (Retorno de Services)

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
  pokedex: PaginationModel; // Paginação de Pokémons retornada pela API
  pokemons: Array<any> = []; // Array de Pokémons mostrados por página
  currentOffset: number = 0; // Valor de offset (índice do primeiro Pokémon mostrado na página)
  pokemonsLoaded: number = 0; // Quantidade de Pokémons retornados pela API

  columns: number; // Quantidade de colunas da lista de Pokémon

  pokemonDetailsModal; // Referência do Modal de Detalhes de Pokémon

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrollando página para topo ao entrar na página
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
  // Método de captura de dados de paginação e população de array de Pokémon
  getPokemons(pagination: string) {
    this.pokedex = null;
    this.pokemons = [];
    this.pokemonsLoaded = 0;
    // Definindo objetos relativos ao carregamento de Pokémons
    for (let i = 0; i < 20; i++) {
      this.pokemons.push({ loaded: false });
    }
    this.paginationSubscribe = this.pokemonService
      .getPokemons(pagination)
      .subscribe(
        (pokedex: any) => {
          this.pokedex = pokedex;
          // Capturando Pokémons relativos à paginação atual
          this.pokedex.results.forEach((pokemon: any) => {
            this.pokemonSubscribe = this.pokemonService
              .getPokemon(
                pokemon.url.substring(
                  'https://pokeapi.co/api/v2/pokemon/'.length
                )
              )
              .subscribe((pokemonData: PokemonModel) => {
                //Definindo os tipos do Pokémon
                const types = [];
                pokemonData.types.forEach((typeData: any) => {
                  types.push(typeData.type.name);
                });
                //Definindo os stats do Pokémon
                const stats = [];
                pokemonData.stats.forEach((statData: any) => {
                  stats.push(statData.base_stat);
                });
                //Definindo as habilidades do Pokémon
                const abilities = [];
                pokemonData.abilities.forEach((abilityData: any) => {
                  abilities.push(abilityData.ability.name);
                });
                this.pokemons[
                  parseInt(pokemonData.id) - (1 + this.currentOffset)
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
                  parseInt(pokemonData.id) - (1 + this.currentOffset)
                ].loaded = true;
                this.pokemonsLoaded++;
              });
          });
        },
        (error) => console.log(error)
      );
  }

  // Método de mudança de página
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

  // Método de abertura de modal de Detalhes de Pokémon
  openPokemonDetails(pokemon) {
    this.pokemonDetailsModal = this.dialog.open(PokemonDetailsComponent, {
      data: {
        pokemon: pokemon,
      },
    });
  }

  // Método de definição de quantidade de colunas na página
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
