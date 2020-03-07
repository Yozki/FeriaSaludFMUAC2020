import { Consulta } from './consulta';

export class Paciente {
    id: number;
    Nombre: string;
    consultas: Consulta[];
}