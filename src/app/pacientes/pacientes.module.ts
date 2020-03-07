import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesListaComponent } from './lista/pacientes-lista/pacientes-lista.component';
import { routing } from './pacientes.routing';
import { MatTableModule } from '@angular/material/table';
import { ServicioPacientes } from '../servicios/pacientes.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { PacienteNuevoComponent } from './paciente-nuevo/paciente-nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
    declarations: [
        PacientesListaComponent,
        PacienteNuevoComponent,
        PerfilComponent
    ],
    imports: [
        CommonModule,
        routing,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ ServicioPacientes ]
})
export class PacientesModule { }
