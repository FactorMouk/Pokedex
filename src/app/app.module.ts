import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Módulo de rotemamento da aplicação
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Módulo de animações necessário para o Material
import { MaterialModule } from './material.module'; // Módulo do Material
import { HttpClientModule } from '@angular/common/http'; // Módulo do HttClient (Biblioteca para requisições HTTP)
import { ServiceWorkerModule } from '@angular/service-worker'; // Módulo de Service Worker (PWA)

import { AppComponent } from './app.component';

import { RegionService } from './core/services/region.service';
import { PokemonService } from './core/services/pokemon.service';

import { environment } from '../environments/environment'; // Arquivo de configurações de ambiente

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [PokemonService, RegionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
