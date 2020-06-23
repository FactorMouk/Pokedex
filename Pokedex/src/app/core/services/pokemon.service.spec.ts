import { TypeModel } from './../models/type-model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PokemonService } from './pokemon.service';

import { PaginationModel } from '../models/pagination-model';
import { PokemonModel } from '../models/pokemon-model';

describe('PokemonService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PokemonService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a pokemon pagination object', () => {
    const expectedPaginationPokemon: PaginationModel = new PaginationModel(1, '', '', []);
    httpClientSpy.get.and.returnValue(of(expectedPaginationPokemon));
    service.getPokemons('offset=0&limit=0').subscribe(
      pokemonPagination => {
        expect(pokemonPagination).toEqual(expectedPaginationPokemon, 'expected pokemon pagination');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return a pokemon object', () => {
    const expectedPokemon: PokemonModel = new PokemonModel();
    httpClientSpy.get.and.returnValue(of(expectedPokemon));
    service.getPokemon('1/').subscribe(
      pokemon => {
        expect(pokemon).toEqual(expectedPokemon, 'expected pokemon');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return a type pagination object', () => {
    const expectedPaginationType: PaginationModel = new PaginationModel(1, '', '', []);
    httpClientSpy.get.and.returnValue(of(expectedPaginationType));
    service.getTypes().subscribe(
      typePagination => {
        expect(typePagination).toEqual(expectedPaginationType, 'expected type pagination');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return a type object', () => {
    const expectedType: TypeModel = new TypeModel();
    httpClientSpy.get.and.returnValue(of(expectedType));
    service.getTypes().subscribe(
      type => {
        expect(type).toEqual(expectedType, 'expected type');
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
