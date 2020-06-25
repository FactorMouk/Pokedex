// Serviço para requisições referentes a Pokémon
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Biblioteca para requisições HTTP
import { Observable } from 'rxjs'; // Tipo Observable para auxílio nos retornos dos métodos
import { apiUrl } from '../../../environments/environment'; // URL da API

import { PaginationModel } from '../models/pagination.model';
import { PokemonModel } from '../models/pokemon/pokemon.model';
import { TypeModel } from '../models/type.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // Método GET de retorno de objeto paginação de Pokémon
  getPokemons(pagination: string): Observable<PaginationModel> {
    return this.http.get<PaginationModel>(
      apiUrl.baseUrl + 'pokemon?' + pagination
    );
  }

  // Método GET de retorno de objeto Pokémon
  getPokemon(id: string): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(apiUrl.baseUrl + 'pokemon/' + id);
  }

  // Método GET de retorno de objeto paginação de Tipos
  getTypes(): Observable<PaginationModel> {
    return this.http.get<PaginationModel>(apiUrl.baseUrl + 'type');
  }

  // Método GET de retorno de objeto Tipo
  getPokemonsPerType(id): Observable<TypeModel> {
    return this.http.get<TypeModel>(apiUrl.baseUrl + 'type/' + id);
  }
}
