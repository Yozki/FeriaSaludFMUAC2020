import { ConsultaNuevaComponent } from './consulta-nueva/consulta-nueva.component';
import { EncargadoGuard } from '../guards/encargado.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    { path: '', component: ConsultaNuevaComponent, canActivate: [EncargadoGuard] }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);