import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paciente } from 'src/app/modelos/paciente';
import { ServicioPacientes } from 'src/app/servicios/pacientes.service';
import { ServicioConsultas } from 'src/app/servicios/consultas.servicio';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-consulta-nueva',
    templateUrl: './consulta-nueva.component.html',
    styleUrls: ['./consulta-nueva.component.css']
})
export class ConsultaNuevaComponent implements OnInit {

    modulo: string = '';
    consultaForm: FormGroup;
    paciente: Paciente;
    consultas: number[];

    constructor(
        private formBuild: FormBuilder,
        private servicioPacientes: ServicioPacientes,
        private servicioConsultas: ServicioConsultas,
        private router: Router
    ) {
        this.consultaForm = this.formBuild.group({
            PacienteID: '',
            Nombre: [{value: '', disabled: true}],
            Observaciones: ''
        });
    }

    ngOnInit() {
        this.modulo = sessionStorage.getItem('modulo');
        this.onChanges();
    }

    onChanges = () => {
        // Cuando cambian el folio
        this.consultaForm.get('PacienteID').valueChanges.pipe(
            debounceTime(800),
            distinctUntilChanged()
          ).subscribe(val => {
            this.servicioPacientes.GetPaciente(val).subscribe(paciente => {
                this.paciente = paciente;
                this.consultaForm.patchValue({
                    PacienteID: paciente.id,
                    Nombre: paciente.Nombre,
                    Observaciones: ''
                });
            },
            () => {
                alert("Paciente con folio " + val + " no encontrado");
            });
        });

    }

    GuardarConsulta = () => {
        let pacienteID = this.consultaForm.get("PacienteID").value;
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
