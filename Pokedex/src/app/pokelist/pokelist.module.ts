import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokelistRoutingModule } from './pokelist-routing.module';
import { MaterialModule } from './../material.module';

import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PokelistRoutingModule,
    MaterialModule
  ]
})
export class PokelistModule { }
