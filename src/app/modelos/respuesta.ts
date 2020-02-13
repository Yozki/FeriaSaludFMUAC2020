export interface Respuesta<T> {
    Datos: T;
    Exito: boolean;
    Mensaje: string;
    Pagina: number;
    TamanoPagina: number;
    PaginasTotales: number;
    RegistrosTotales: number;
    SiguientePagina: string;
}