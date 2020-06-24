// Serviço para requisições referentes a Região
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Biblioteca para requisições HTTP
import { apiUrl } from '../../../environments/environment'; // URL da API

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpClient) {}

  // Método GET de retorno de objeto paginação de Região
  getRegions() {
    return this.http.get(apiUrl.baseUrl + 'region');
  }

  // Método GET de retorno de objeto Região
  getRegion(id) {
    return this.http.get(apiUrl.baseUrl + 'region/' + id);
  }
}
