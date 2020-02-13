import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioSeguridad } from '../servicios/seguridad.service';

@Injectable({ providedIn: 'root' })
export class EncargadoGuard implements CanActivate {

    constructor(private ServicioSeguridad: ServicioSeguridad) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
        return this.ServicioSeguridad.esEncargadoModulo;
    }
}