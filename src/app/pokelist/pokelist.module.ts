import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module'; // Módulo de elementos compartilhados
import { PokelistRoutingModule } from './pokelist-routing.module'; // Módulo de roteamento de Pokélist
import { MaterialModule } from './../material.module'; // Módulo do Material

import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, PokelistRoutingModule, MaterialModule, SharedModule],
})
export class PokelistModule {}
