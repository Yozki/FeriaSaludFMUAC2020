import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Modulo } from '../modelos/modulo';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicioModulos {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {}

    getModulos(): Observable<Modulo[]> {
        return this.http.get<Modulo[]>(environment.backEndUrl + 'modulos', this.httpOptions);
    }

    getModulo(id: number): Observable<Modulo> {
        return this.http.get<Modulo>(environment.backEndUrl + 'modulos/' + id, this.httpOptions);
    }
}