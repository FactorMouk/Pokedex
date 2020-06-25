import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonModel } from './../../../core/models/pokemon/pokemon.model';
import { Chart } from 'chart.js';

import { PokemonStatModel } from 'src/app/core/models/pokemon/pokemon-stat.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  @ViewChild('statsChart') private statsRef; // Referência para gráfico de Stats
  chart: Chart; // Objeto gráfico (ChartJS) de Stats

  pokemonData: PokemonModel; // Dados do Pokémon

  constructor(@Inject(MAT_DIALOG_DATA) public data: unknown) {
    // Recebendo dados do Pokémon
    this.pokemonData = this.data['pokemon'];
  }

  ngAfterViewInit(): void {
    this.createStatsChart();
  }

  //Criando gráfico de Stats
  createStatsChart(): void {
    const stats = [];
    this.pokemonData.stats.forEach((stat) => {
      stats.push(stat.base_stat);
    });
    if (this.statsRef) {
      this.chart = new Chart(this.statsRef.nativeElement, {
        type: 'bar',
        data: {
          labels: [
            'HP',
            'Attack',
            'Defense',
            'Special Attack',
            'Special Defense',
            'Speed',
          ],
          datasets: [
            {
              data: stats,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
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
  }
}
