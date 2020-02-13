import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../modelos/loginResponse';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class ServicioSeguridad {

    Logged = new BehaviorSubject<boolean>(this.tokenAvailable());
    EsAdmin = new BehaviorSubject<boolean>(this.checkAdmin());
    EncargadoModulo = new BehaviorSubject<boolean>(this.checkRole());
    User: User;

    get isLogged(): Observable<boolean> {
        return this.Logged.asObservable();
    }

    get esEncargadoModulo(): Observable<boolean> {
        return this.EncargadoModulo.asObservable();
    }

    get esAdmin(): Observable<boolean> {
        return this.EsAdmin.asObservable();
    }

    get modulo(): string {
        return sessionStorage.getItem('modulo');
    }

    constructor(private http: HttpClient) {}

    Login = (credentials: any): Observable<boolean> => {
        this.http.post<LoginResponse>(environment.backEndUrl + 'auth/local', credentials).subscribe(
            res => {
                this.Logged.next(true);
                this.User = res.user;
                this.EncargadoModulo.next(res.user.role.type == "encargadomodulo");
                sessionStorage.setItem('token', res.jwt);
                sessionStorage.setItem('role', res.user.role.name);
                if(res.user.modulo) {
                    sessionStorage.setItem('modulo', res.user.modulo.Nombre);
                    sessionStorage.setItem('moduloID', res.user.modulo.id.toString());
                }
                
            },
            () => {
                this.Logged.next(false);
                this.EncargadoModulo.next(false);
                this.EsAdmin.next(false);
            }
        )

        return this.Logged.asObservable();
    }

    Logout = () => {
        sessionStorage.clear();
        this.Logged.next(false);
    }

    private tokenAvailable(): boolean {
        return !!sessionStorage.getItem('token');
    }

    private checkRole(): boolean {
        return sessionStorage.getItem('role') == 'EncargadoModulo';
    }

    private checkAdmin(): boolean {
        return sessionStorage.getItem('role') == 'Admin';
    }
}