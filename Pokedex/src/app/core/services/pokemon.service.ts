import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(pagination) {
    return this.http.get(apiUrl.baseUrl + 'pokemon?' + pagination);
  }

  getPokemon(id) {
    return this.http.get(apiUrl.baseUrl + 'pokemon/' + id);
  }

  getTypes() {
    return this.http.get(apiUrl.baseUrl + 'type');
  }

  getPokemonsPerType(id) {
    return this.http.get(apiUrl.baseUrl + 'type/' + id);
  }
}
