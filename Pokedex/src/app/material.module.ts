import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class MaterialModule { }
