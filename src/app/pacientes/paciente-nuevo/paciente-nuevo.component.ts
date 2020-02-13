import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioPacientes } from 'src/app/servicios/pacientes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-paciente-nuevo',
    templateUrl: './paciente-nuevo.component.html',
    styleUrls: ['./paciente-nuevo.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacienteNuevoComponent implements OnInit {

    NuevoPacienteForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private servicioPacientes: ServicioPacientes,
        private router: Router
    ) { 
        this.NuevoPacienteForm = this.formBuilder.group({
            Nombre: '',
            Password: ''
        })
    }

    ngOnInit() {

    }

    guardar = () => {
        let Nombre = this.NuevoPacienteForm.get('Nombre').value;
        this.servicioPacientes.NuevoPaciente(Nombre).subscribe(
            () => this.router.navigate(['/pacientes/lista'])
        );
    }
}
