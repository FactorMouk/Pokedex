import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokestatisticsRoutingModule } from './pokestatistics-routing.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, PokestatisticsRoutingModule],
})
export class PokestatisticsModule {}
