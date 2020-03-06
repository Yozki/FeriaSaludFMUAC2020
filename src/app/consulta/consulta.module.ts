import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './consulta.routing';
import { ConsultaNuevaComponent } from './consulta-nueva/consulta-nueva.component';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogoComponent } from '../shared/dialogo/dialogo.component';

@NgModule({
    declarations: [
        ConsultaNuevaComponent,
        DialogoComponent
    ],
    imports: [
        CommonModule,
        routing,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule
    ],
    entryComponents: [DialogoComponent]
})
export class ConsultaModule { }
