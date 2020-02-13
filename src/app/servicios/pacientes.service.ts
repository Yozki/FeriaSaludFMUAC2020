import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../modelos/paciente';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServicioPacientes {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {}

    GetPacientes = (): Observable<Paciente[]> => {
        return this.http.get<Paciente[]>(environment.backEndUrl + "pacientes", this.httpOptions);
    }

    NuevoPaciente = (paciente: Paciente): Observable<Boolean> => {
        return this.http.post<Boolean>(environment.backEndUrl + "pacientes", { Nombre: paciente }, this.httpOptions);
    }

    GetIDConsultas = (pacienteID: number): Observable<number[]> => {
        return this.http.get<any>(environment.backEndUrl + "pacientes/" + pacienteID, this.httpOptions).pipe(
            map(r => r.consultas.map(c => c.id))
        );
    }

    UpdatePaciente = (pacienteID: number, consultas: number[]): Observable<any> => {
        return this.http.put<any>(environment.backEndUrl + 'pacientes/' + pacienteID, 
        { consultas: consultas }, this.httpOptions);
    }
}