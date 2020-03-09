import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioPacientes } from 'src/app/servicios/pacientes.service';
import { Consulta } from 'src/app/modelos/consulta';
import { Modulo } from 'src/app/modelos/modulo';
import { ServicioModulos } from 'src/app/servicios/modulos.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class PerfilComponent implements OnInit {

    displayedColumns: string[] = ['Fecha', 'Modulo'];
    consultas: Consulta[];
    modulos: Modulo[];
    expandedElement: Consulta | null;
    analisisMedicos: string[];

    constructor(
        private route: ActivatedRoute,
        private servicioPacientes: ServicioPacientes,
        private servicioModulos: ServicioModulos
    ) { }

    ngOnInit() {
        this.cargarModulos();
    }

    cargarDatosPaciente = (id: number) => {
        this.servicioPacientes.GetPaciente(id).subscribe(
            pac => {
                this.consultas = pac.consultas;
            }
        );
    }

    nombreModulo = (ID: number) => {
        return this.modulos.find(m => m.id == ID).Nombre;
    }

    getFecha = (fecha: Date) => {
        return new Date(fecha).toLocaleString('es-MX', { timeZone: 'UTC' });
    }

    cargarModulos = () => {
        this.servicioModulos.getModulos().subscribe(
            modulos => {
                this.modulos = modulos;
                let id = this.route.snapshot.paramMap.get('id');
                this.cargarDatosPaciente(+id);
            }
        )
    }

    booleanoAEspanol = (val: boolean) => {
        if (val) return 'Positivo'
        else return 'Negativo';
    }
}
