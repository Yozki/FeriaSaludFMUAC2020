import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './consulta.routing';
import { ConsultaNuevaComponent } from './consulta-nueva/consulta-nueva.component';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ConsultaNuevaComponent
    ],
    imports: [
        CommonModule,
        routing,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule
    ]
})
export class ConsultaModule { }
