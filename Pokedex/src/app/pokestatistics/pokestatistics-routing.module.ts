import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // Biblioteca de roteamento

import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  // Carregando componente StatisticsComponent caso path seja vazio (padrão)
  { path: '', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokestatisticsRoutingModule {}
