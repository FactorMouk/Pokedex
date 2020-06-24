import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // Biblioteca de roteamento

import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  // Carregando componente ListComponent caso path seja vazio (padrão)
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokelistRoutingModule {}
