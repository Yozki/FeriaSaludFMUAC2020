import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paciente } from 'src/app/modelos/paciente';
import { ServicioPacientes } from 'src/app/servicios/pacientes.service';
import { ServicioConsultas } from 'src/app/servicios/consultas.servicio';
import { Router } from '@angular/router';

@Component({
    selector: 'app-consulta-nueva',
    templateUrl: './consulta-nueva.component.html',
    styleUrls: ['./consulta-nueva.component.css']
})
export class ConsultaNuevaComponent implements OnInit {

    modulo: string = '';
    consultaForm: FormGroup;
    pacientes: Paciente[];
    consultas: number[];

    constructor(
        private formBuild: FormBuilder,
        private servicioPacientes: ServicioPacientes,
        private servicioConsultas: ServicioConsultas,
        private router: Router
    ) {
        this.consultaForm = this.formBuild.group({
            Paciente: '',
            Observaciones: ''
        });
    }

    ngOnInit() {
        this.modulo = sessionStorage.getItem('modulo');
        this.servicioPacientes.GetPacientes().subscribe(
            p => this.pacientes = p
        )
    }

    GuardarConsulta = () => {
        let pacienteID = this.consultaForm.get("Paciente").value;
        let moduloID = sessionStorage.getItem('moduloID');
        let observaciones = this.consultaForm.get("Observaciones").value;

        this.servicioPacientes.GetIDConsultas(pacienteID).subscribe(
            res => {
                this.consultas = res;
                this.servicioConsultas.NuevaConsulta(+moduloID, observaciones).subscribe(
                    id => {
                        this.consultas.push(id);
                        this.servicioPacientes.UpdatePaciente(pacienteID, this.consultas).subscribe(
                            () => this.router.navigate(['/pacientes/lista'])
                        );
                    }
                )
            }
        )
    }

}
