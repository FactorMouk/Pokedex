import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokelistRoutingModule } from './pokelist-routing.module';

import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PokelistRoutingModule
  ]
})
export class PokelistModule { }
