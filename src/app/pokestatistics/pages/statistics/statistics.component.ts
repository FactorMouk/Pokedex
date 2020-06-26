import { RegionModel } from './../../../core/models/region.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'; // Biblioteca de gráficos
import { Subscription, forkJoin } from 'rxjs'; // Tipo Subscription para manipulação dos Subscribes (Retorno de Services)
import { switchMap } from 'rxjs/operators';

import { PokemonService } from './../../../core/services/pokemon.service';
import { RegionService } from './../../../core/services/region.service';

import { TypeModel } from 'src/app/core/models/type/type.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('typesChart') private typesChartRef; // Referência para gráfico de Tipos
  typesChartCanvas: Chart; // Objeto gráfico (ChartJS) de Tipos

  @ViewChild('regionsChart') private regionsChartRef; // Referência para gráfico de Regiões
  regionsChartCanvas: Chart; // Objeto gráfico (ChartJS) de Regiões

  typesName: string[] = []; // Array auxiliar (para gráfico) de nomes de tipos
  typesAmount: number[] = []; // Array auxiliar (para gráfico) de quantidade de tipos
  isTypesLoaded = false; // Indica se todos os tipos de Pokémons foram retornados

  regions: Array<unknown> = []; // Array de regiões retornadas
  regionsName: string[] = []; // Array auxiliar (para gráfico) de nomes de regiões
  locationsPerRegionAmount: number[] = []; // Array auxiliar (para gráfico) de quantidade de localizações
  isRegionsLoaded = false; // Indica se todas as regiões foram retornadas

  constructor(
    private pokemonService: PokemonService,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    document.querySelector('mat-sidenav-content').scrollTop = 0; // Scrollando página para topo ao entrar na página
    this.getTypes();
    this.getRegions();
  }

  ngOnDetroy(): void {
    if (this.paginationTypesSubscribe) {
      this.paginationTypesSubscribe.unsubscribe();
    }
    if (this.paginationRegionsSubscribe) {
      this.paginationRegionsSubscribe.unsubscribe();
    }
  }

  paginationTypesSubscribe: Subscription;
  // Método de captura de dados de Tipos
  getTypes(): void {
    this.paginationTypesSubscribe = this.pokemonService
      .getTypes()
      .pipe(
        switchMap((types) => {
          const observables = [];
          types.results.forEach((type) => {
            observables.push(
              this.pokemonService.getPokemonsPerType(
                type.url.substring('https://pokeapi.co/api/v2/type/'.length)
              )
            );
          });
          return forkJoin(observables);
        })
      )
      .subscribe(
        (types: TypeModel[]) => {
          types.forEach((type) => {
            this.typesName.push(type.name);
            this.typesAmount.push(type.pokemon.length);
          });
          this.isTypesLoaded = true;
          this.createTypesChart();
        },
        (error) => console.log(error)
      );
  }

  paginationRegionsSubscribe: Subscription;
  // Método de captura de dados de Regiões
  getRegions(): void {
    this.paginationRegionsSubscribe = this.regionService
      .getRegions()
      .pipe(
        switchMap((regions) => {
          const observables = [];
          regions.results.forEach((region) => {
            observables.push(
              this.regionService.getRegion(
                region.url.substring('https://pokeapi.co/api/v2/region/'.length)
              )
            );
          });
          return forkJoin(observables);
        })
      )
      .subscribe(
        (regions: RegionModel[]) => {
          regions.forEach((region) => {
            this.regionsName.push(region.name);
            this.locationsPerRegionAmount.push(region.locations.length);
          });
          this.isRegionsLoaded = true;
          this.createRegionsChart();
        },
        (error) => console.log(error)
      );
  }

  // Método de criação de gráfico de Tipos
  createTypesChart(): void {
    this.typesChartCanvas = new Chart(this.typesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.typesName,
        datasets: [
          {
            data: this.typesAmount,
            borderWidth: 1,
            backgroundColor: [
              '#A8A77A',
              '#C22E28',
              '#A98FF3',
              '#A33EA1',
              '#E2BF65',
              '#B6A136',
              '#A6B91A',
              '#735797',
              '#B7B7CE',
              '#EE8130',
              '#6390F0',
              '#7AC74C',
              '#F7D02C',
              '#F95587',
              '#96D9D6',
              '#6F35FC',
              '#705746',
              '#D685AD',
            ],
            borderColor: [
              '#A8A77A',
              '#C22E28',
              '#A98FF3',
              '#A33EA1',
              '#E2BF65',
              '#B6A136',
              '#A6B91A',
              '#735797',
              '#B7B7CE',
              '#EE8130',
              '#6390F0',
              '#7AC74C',
              '#F7D02C',
              '#F95587',
              '#96D9D6',
              '#6F35FC',
              '#705746',
              '#D685AD',
            ],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  // Método de criação de gráfico de Regiões
  createRegionsChart(): void {
    this.regionsChartCanvas = new Chart(this.regionsChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: this.regionsName,
        datasets: [
          {
            data: this.locationsPerRegionAmount,
            borderWidth: 1,
            backgroundColor: [
              '#0ca7a6',
              '#499358',
              '#c0942d',
              '#5e47e9',
              '#eecbc5',
              '#cafdb4',
              '#b4ffd5',
            ],
            borderColor: [
              '#0ca7a6',
              '#499358',
              '#c0942d',
              '#5e47e9',
              '#eecbc5',
              '#cafdb4',
              '#b4ffd5',
            ],
          },
        ],
      },
    });
  }
}
