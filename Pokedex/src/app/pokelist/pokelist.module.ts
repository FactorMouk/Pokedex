import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { PokelistRoutingModule } from './pokelist-routing.module';
import { MaterialModule } from './../material.module';

import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, PokelistRoutingModule, MaterialModule, SharedModule],
})
export class PokelistModule {}
