import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PacientesListaComponent } from './lista/pacientes-lista/pacientes-lista.component';
import { PacienteNuevoComponent } from './paciente-nuevo/paciente-nuevo.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
    { path: '', component: PacientesListaComponent },
    { path: 'lista', component: PacientesListaComponent },
    { path: 'nuevo', component: PacienteNuevoComponent },
    { path: ':id', component: PerfilComponent },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);