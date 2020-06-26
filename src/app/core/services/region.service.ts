// Serviço para requisições referentes a Região
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Biblioteca para requisições HTTP
import { Observable } from 'rxjs';
import { apiUrl } from '../../../environments/environment'; // URL da API

import { PaginationModel } from '../models/pagination.model';
import { RegionModel } from '../models/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpClient) {}

  // Método GET de retorno de objeto paginação de Região
  getRegions(): Observable<PaginationModel> {
    return this.http.get<PaginationModel>(apiUrl.baseUrl + 'region');
  }

  // Método GET de retorno de objeto Região
  getRegion(id: string): Observable<RegionModel> {
    return this.http.get<RegionModel>(apiUrl.baseUrl + 'region/' + id);
  }
}
