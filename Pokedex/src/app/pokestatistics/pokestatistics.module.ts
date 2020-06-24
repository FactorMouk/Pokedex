import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { PokestatisticsRoutingModule } from './pokestatistics-routing.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, PokestatisticsRoutingModule, MaterialModule],
})
export class PokestatisticsModule {}
