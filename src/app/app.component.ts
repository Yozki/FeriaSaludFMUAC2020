import { Component } from '@angular/core';
import { ServicioSeguridad } from './servicios/seguridad.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Feria de la Salud';

    constructor(public seguridad: ServicioSeguridad) {}
}
