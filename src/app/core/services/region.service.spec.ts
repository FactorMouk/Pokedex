import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegionService } from './region.service';
import { RegionModel } from './../models/region-model';
import { PaginationModel } from '../models/pagination-model';

describe('RegionService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: RegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegionService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RegionService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a region pagination object', () => {
    const expectedPaginationRegion: PaginationModel = new PaginationModel(1, '', '', []);
    httpClientSpy.get.and.returnValue(of(expectedPaginationRegion));
    service.getRegions().subscribe(
      pokemonPagination => {
        expect(pokemonPagination).toEqual(expectedPaginationRegion, 'expected region pagination');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return a region object', () => {
    const expectedRegion: RegionModel = new RegionModel();
    httpClientSpy.get.and.returnValue(of(expectedRegion));
    service.getRegions().subscribe(
      pokemonPagination => {
        expect(pokemonPagination).toEqual(expectedRegion, 'expected region pagination');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
