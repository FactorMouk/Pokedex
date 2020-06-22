import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokelist',
    loadChildren: () => import('./pokelist/pokelist.module').then(m => m.PokelistModule)
  },
  {
    path: 'pokestatistics',
    loadChildren: () => import('./pokestatistics/pokestatistics.module').then(m => m.PokestatisticsModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'pokelist'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
