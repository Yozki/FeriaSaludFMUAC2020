import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paciente } from 'src/app/modelos/paciente';
import { ServicioPacientes } from 'src/app/servicios/pacientes.service';
import { ServicioConsultas } from 'src/app/servicios/consultas.servicio';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogoComponent } from 'src/app/shared/dialogo/dialogo.component';

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
        private router: Router,
        public dialog: MatDialog
    ) {
        this.consultaForm = this.formBuild.group({
            PacienteID: '',
            Nombre: [{value: '', disabled: true}],
            Observaciones: '',
            Peso: '',
            Talla: '',
            FreqCardiaca: '',
            FreqRespiratoria: '',
            PresionArterial: '',
            Glucosa: '',
            ABO: '',
            PSA: null,
            AM_BiometriaHematica: false,
            AM_EGO: false,
            AM_QuimicaSanguinea: false,
            AM_TeleTorax: false,
            VIH: false,
            Sifilis: false
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
              if(val) {
                    this.servicioPacientes.GetPaciente(val).subscribe(paciente => {
                        this.paciente = paciente;
                        this.consultaForm.patchValue({
                            PacienteID: paciente.id,
                            Nombre: paciente.Nombre,
                            Observaciones: ''
                        });
                    },
                    () => {
                        this.dialog.open(DialogoComponent, {
                            width: '350px',
                            data: 'El paciente con identificador ' + this.consultaForm.get('PacienteID').value + ' no existe'
                        });
                        this.consultaForm.get("PacienteID").reset();
                    });
              }
        });
    }

    GuardarConsulta = () => {
        let pacienteID = this.consultaForm.get("PacienteID").value;
        let moduloID = sessionStorage.getItem('moduloID');
        let observaciones = this.consultaForm.get("Observaciones").value;
        let Peso = this.consultaForm.get("Peso").value;
        let Talla = this.consultaForm.get("Talla").value;
        let FreqCardiaca = this.consultaForm.get("FreqCardiaca").value;
        let FreqRespiratoria = this.consultaForm.get("FreqRespiratoria").value;
        let PresionArterial = this.consultaForm.get("PresionArterial").value;
        let Glucosa = this.consultaForm.get("Glucosa").value;
        let ABO = this.consultaForm.get("ABO").value;
        let PSA = this.consultaForm.get("PSA").value;
        let VIH = this.consultaForm.get("VIH").value;
        let Sifilis = this.consultaForm.get("Sifilis").value;

        // Análisis médicos
        let AM_BiometriaHematica = this.consultaForm.get("AM_BiometriaHematica").value;
        let AM_EGO = this.consultaForm.get("AM_EGO").value;
        let AM_QuimicaSanguinea = this.consultaForm.get("AM_QuimicaSanguinea").value;
        let AM_TeleTorax = this.consultaForm.get("AM_TeleTorax").value;

        this.servicioPacientes.GetIDConsultas(pacienteID).subscribe(
            res => {
                this.consultas = res;
                this.servicioConsultas.NuevaConsulta(
                    +moduloID, 
                    observaciones,
                    Peso, Talla, FreqCardiaca,
                    FreqRespiratoria, PresionArterial,
                    Glucosa, ABO, PSA, AM_BiometriaHematica, 
                    AM_EGO, AM_QuimicaSanguinea, AM_TeleTorax,
                    VIH, Sifilis)
                    .subscribe(
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