import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonModel } from './../../../core/models/pokemon-model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  @ViewChild('statsChart') private statsRef;
  chart: any;
  pokemonData: PokemonModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.pokemonData = this.data.pokemon;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createStatsChart();
  }

  createStatsChart() {
    if(this.statsRef) {
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
              data: this.pokemonData.stats,
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
