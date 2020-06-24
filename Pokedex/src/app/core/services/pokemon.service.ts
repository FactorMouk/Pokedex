// Serviço para requisições referentes a Pokémon
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Biblioteca para requisições HTTP
import { apiUrl } from '../../../environments/environment'; // URL da API

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // Método GET de retorno de objeto paginação de Pokémon
  getPokemons(pagination) {
    return this.http.get(apiUrl.baseUrl + 'pokemon?' + pagination);
  }

  // Método GET de retorno de objeto Pokémon
  getPokemon(id) {
    return this.http.get(apiUrl.baseUrl + 'pokemon/' + id);
  }

  // Método GET de retorno de objeto paginação de Tipos
  getTypes() {
    return this.http.get(apiUrl.baseUrl + 'type');
  }

  // Método GET de retorno de objeto Tipo
  getPokemonsPerType(id) {
    return this.http.get(apiUrl.baseUrl + 'type/' + id);
  }
}
