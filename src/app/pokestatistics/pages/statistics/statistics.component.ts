import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'; // Biblioteca de gráficos
import { Subscription } from 'rxjs'; // Tipo Subscription para manipulação dos Subscribes (Retorno de Services)

import { PokemonService } from './../../../core/services/pokemon.service';
import { RegionService } from './../../../core/services/region.service';

import { TypeModel } from './../../../core/models/type-model';
import { RegionModel } from './../../../core/models/region-model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('typesChart') private typesChartRef; // Referência para gráfico de Tipos
  typesChartCanvas: any; // Objeto gráfico (ChartJS) de Tipos

  @ViewChild('regionsChart') private regionsChartRef; // Referência para gráfico de Regiões
  regionsChartCanvas: any; // Objeto gráfico (ChartJS) de Regiões

  types: Array<any> = []; // Array de tipos retornados
  typesName: string[] = []; // Array auxiliar (para gráfico) de nomes de tipos
  typesAmount: number[] = []; // Array auxiliar (para gráfico) de quantidade de tipos
  typesLoaded: number = 0; // Quantidade de Tipos retornados pela API

  regions: Array<any> = []; // Array de regiões retornadas
  regionsName: string[] = []; // Array auxiliar (para gráfico) de nomes de regiões
  locationsPerRegionAmount: number[] = []; // Array auxiliar (para gráfico) de quantidade de localizações
  regionsLoaded: number = 0; // Quantidade de Regiões retornadas pela API

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
    if (this.typesSubscribe) {
      this.typesSubscribe.unsubscribe();
    }
    if (this.paginationRegionsSubscribe) {
      this.paginationRegionsSubscribe.unsubscribe();
    }
    if (this.regionsSubscribe) {
      this.regionsSubscribe.unsubscribe();
    }
  }

  paginationTypesSubscribe: Subscription;
  typesSubscribe: Subscription;
  // Método de captura de dados de Tipos
  getTypes() {
    this.paginationTypesSubscribe = this.pokemonService.getTypes().subscribe(
      (types: any) => {
        // Definindo objetos de associação entre Tipos e quantidade de Pokémons
        for (let i = 0; i < types.results.length; i++) {
          this.types.push({
            name: types.results[i].name,
            amount: 0,
          });
          // Capturando dados do Tipo
          this.typesSubscribe = this.pokemonService
            .getPokemonsPerType(
              types.results[i].url.substring(
                'https://pokeapi.co/api/v2/type/'.length
              )
            )
            .subscribe((typeData: TypeModel) => {
              this.typesLoaded++;
              this.types[i].amount = typeData.pokemon.length;
              if (this.typesLoaded === this.types.length) {
                this.types.forEach((type: any) => {
                  this.typesName.push(type.name);
                  this.typesAmount.push(type.amount);
                });
                this.createTypesChart();
              }
            });
        }
      },
      (error) => console.log(error)
    );
  }

  paginationRegionsSubscribe: Subscription;
  regionsSubscribe: Subscription;
  // Método de captura de dados de Regiões
  getRegions() {
    this.paginationRegionsSubscribe = this.regionService
      .getRegions()
      .subscribe((regions: any) => {
        // Definindo objetos de associação entre Regiões e quantidade de Localizações por Região
        for (let i = 0; i < regions.results.length; i++) {
          this.regions.push({
            name: regions.results[i].name,
            locationsAmount: 0,
          });
          // Capturando dados de Região
          this.regionsSubscribe = this.regionService
            .getRegion(
              regions.results[i].url.substring(
                'https://pokeapi.co/api/v2/region/'.length
              )
            )
            .subscribe((regionData: RegionModel) => {
              this.regionsLoaded++;
              this.regions[i].locationsAmount = regionData.locations.length;
              if (this.regionsLoaded === this.regions.length) {
                this.regions.forEach((region: any) => {
                  this.regionsName.push(region.name);
                  this.locationsPerRegionAmount.push(region.locationsAmount);
                });
                this.createRegionsChart();
              }
            });
        }
      });
  }

  // Método de criação de gráfico de Tipos
  createTypesChart() {
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
  createRegionsChart() {
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
