import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokestatisticsRoutingModule } from './pokestatistics-routing.module'; // Módulo de roteamento de Pokestatistics
import { MaterialModule } from './../material.module'; // Módulo do Material

import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, PokestatisticsRoutingModule, MaterialModule],
})
export class PokestatisticsModule {}
