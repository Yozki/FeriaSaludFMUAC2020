import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { EncargadoGuard } from './guards/encargado.guard';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesModule', canActivate: [AuthGuard] },
    { path: 'consultar', loadChildren: './consulta/consulta.module#ConsultaModule', canActivate: [AuthGuard, EncargadoGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
