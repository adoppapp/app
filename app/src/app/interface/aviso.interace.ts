export interface AvisoI {
    uid?: string;
    fecha?: string;
    descripcion?: Text;
    nombre: string;
    size: string;
    sexo: string;
    edad: string;
    favoritos: number;
    solicitudes?: number;
    seleccionado?: string;
    mensajes: number;
    especie: string;
    cantidadfotos?: number;
    fotos?: string [];
    direccion?: string;
    region: string;
    comuna: string;
    estatus?: string;
}
