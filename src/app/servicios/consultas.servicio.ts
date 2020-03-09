import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServicioConsultas {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {}

    NuevaConsulta = (moduloID: number, observaciones: string,
        Peso: string, Talla: string, FreqCardiaca: string,
        FreqRespiratoria: string, PresionArterial: string,
        Glucosa: string, ABO: string, PSA: number, AM_BiometriaHematica: boolean,
        AM_EGO: boolean, AM_QuimicaSanguinea: boolean, AM_TeleTorax: boolean): Observable<number> => {
        let body = {
            Observaciones: observaciones,
            modulo: moduloID,
            Peso, Talla, FrecuenciaCardiaca: FreqCardiaca, 
            FrecuenciaRespiratoria: FreqRespiratoria, 
            PresionArterial, Glucosa, ABO, PSA, AM_BiometriaHematica,
            AM_EGO, AM_QuimicaSanguinea, AM_TeleTorax
        };
        return this.http.post<any>(environment.backEndUrl + 'consultas', body, this.httpOptions).pipe(
            map(r => r.id)
        );
    }
}
