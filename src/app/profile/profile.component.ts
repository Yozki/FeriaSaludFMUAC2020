import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ServicioModulos } from '../servicios/modulos.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    modulo: string;

    constructor(
        public auth: AuthService,
        private servicioModulos: ServicioModulos
    ) { }

    ngOnInit() {
        this.cargarNombreDelModulo();
    }

    cargarNombreDelModulo = () => {
        let moduloID = this.auth.modulo;
        this.servicioModulos.getModulo(moduloID).subscribe(m => this.modulo = m.Nombre);
    }
}