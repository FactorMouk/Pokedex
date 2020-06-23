import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpClient) {}

  getRegions() {
    return this.http.get(apiUrl.baseUrl + 'region');
  }

  getRegion(id) {
    return this.http.get(apiUrl.baseUrl + 'region/' + id);
  }
}
