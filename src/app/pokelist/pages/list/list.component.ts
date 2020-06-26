import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Biblioteca do elemento Dialog (Modal) do Material
import { Subscription, forkJoin } from 'rxjs'; // Tipo Subscription para manipulação dos Subscribes (Retorno de Services)
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { PokemonDetailsComponent } from './../../../shared/modals/pokemon-details/pokemon-details.component';

import { PokemonService } from './../../../core/services/pokemon.service';

import { PaginationModel } from '../../../core/models/pagination.model';
import { ReferenceModel } from '../../../core/models/reference.model';
import { PokemonModel } from '../../../core/models/pokemon/pokemon.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pokedex: PaginationModel; // Paginação de Pokémons retornada pela API
  pokemons: Array<unknown> = []; // Array de Pokémons mostrados por página
  currentOffset = 0; // Valor de offset (índice do primeiro Pokémon mostrado na página)
  isPokemonsLoaded = false; // Indica se todos os Pokémons foram retornados

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
  getPokemons(pagination: string): void {
    this.pokedex = null;
    this.pokemons = [];
    this.isPokemonsLoaded = false;
    // Definindo objetos relativos ao carregamento de Pokémons
    for (let i = 0; i < 20; i++) {
      this.pokemons.push({ loaded: false, pokemonData: null });
    }
    this.paginationSubscribe = this.pokemonService
      .getPokemons(pagination)
      .pipe(
        switchMap((pokedex) => {
          this.pokedex = new PaginationModel().deserialize(pokedex);
          const observables = [];
          this.pokedex.results.forEach((pokemonReference: ReferenceModel) => {
            observables.push(
              this.pokemonService.getPokemon(
                pokemonReference.url.substring(
                  'https://pokeapi.co/api/v2/pokemon/'.length
                )
              )
            );
          });
          return forkJoin(observables);
        })
      )
      .subscribe((pokemonsData: PokemonModel[]) => {
        this.isPokemonsLoaded = true;
        pokemonsData.forEach((pokemonData: PokemonModel) => {
          this.pokemons[parseInt(pokemonData.id) - (1 + this.currentOffset)] = {
            loaded: true,
            pokemonData: new PokemonModel().deserialize(pokemonData),
          };
        });
      });
  }

  // Método de mudança de página
  changePage(type: string): void {
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
  openPokemonDetails(pokemon): void {
    this.pokemonDetailsModal = this.dialog.open(PokemonDetailsComponent, {
      data: {
        pokemon: pokemon,
      },
    });
  }

  // Método de definição de quantidade de colunas na página
  defineColumns(): void {
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
