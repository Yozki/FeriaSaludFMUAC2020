import { Component, OnInit } from '@angular/core';
import { ServicioSeguridad } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(
        public seguridad: ServicioSeguridad, 
        private router: Router
    ) { }

    ngOnInit() {

    }

    Logout = () => {
        this.seguridad.Logout();
        this.router.navigate(['/login']);
    }
}