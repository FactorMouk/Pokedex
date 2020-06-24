import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // Biblioteca de roteamento

// Roteamento Lazy Loading da aplicação
const routes: Routes = [
  // Carregamento do módulo Pokélist para rota 'pokelist'
  {
    path: 'pokelist',
    loadChildren: () =>
      import('./pokelist/pokelist.module').then((m) => m.PokelistModule),
  },
  // Carregamento do módulo Pokéstatistics para rota 'pokestatistics'
  {
    path: 'pokestatistics',
    loadChildren: () =>
      import('./pokestatistics/pokestatistics.module').then(
        (m) => m.PokestatisticsModule
      ),
  },
  // Redirecionamento para rota 'pokelist' caso path esteja vazio
  { path: '', pathMatch: 'full', redirectTo: 'pokelist' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
