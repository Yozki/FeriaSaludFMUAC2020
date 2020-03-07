import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ServicioPacientes } from '../../../servicios/pacientes.service';
import { Paciente } from 'src/app/modelos/paciente';
import { ServicioSeguridad } from 'src/app/servicios/seguridad.service';
import { ServicioModulos } from 'src/app/servicios/modulos.service';
import { Modulo } from 'src/app/modelos/modulo';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pacientes-lista',
    templateUrl: './pacientes-lista.component.html',
    styleUrls: ['./pacientes-lista.component.css'],
    providers: [ServicioSeguridad]
})
export class PacientesListaComponent implements OnInit {

    displayedColumns: string[] = ['ID', 'Nombre', 'Modulo'];
    pacientes: Paciente[];
    modulos: Modulo[];

    constructor(
        private servicioPacientes: ServicioPacientes,
        public seguridad: ServicioSeguridad,
        private servicioModulos: ServicioModulos,
        private router: Router
    ) {
        
    }

    ngOnInit() {
        this.servicioModulos.getModulos().subscribe(
            res => {
                this.modulos = res;
                this.servicioPacientes.GetPacientes().subscribe(res => {
                    this.pacientes = res;
                });
            }
        );
        
    }

    getNombreModulo = (moduloID: number) => {
        if(moduloID && this.modulos.length > 0) {
            return this.modulos.find(m => m.id == moduloID).Nombre;
        }
        else return '';
    }

    selectRow = (paciente) => {
        if (this.seguridad.esAdmin2) {
            this.router.navigate(['/pacientes/' + paciente.id]);
        }
    }
}
