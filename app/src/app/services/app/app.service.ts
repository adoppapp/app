import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public primary = '#ff3e00';
  public secondary = '#d1d0cc';
  public light = '#f6f5f0';
  public dark = '#242936';
  public medium = '#ffffff';
  public contrast = '#565B56';
  public tertiary = '#FF8A65';
  public visita = true;
  public wellcome = false;
  public user: any;
  public largo = 0;
  public ancho = 0;
  public sexo = false;
  public edad = false;
  public size = false;
  public urlapi = 'https://us-central1-adoptapp0.cloudfunctions.net';
  public uId: string;
  public swchsizesmall: boolean;
  swchToast$ = new EventEmitter<boolean>();
  darkMode$ = new EventEmitter<boolean>();
  swchloading$ = new EventEmitter<boolean>();
  swtRefreshHome$ = new EventEmitter<boolean>();
  refreshFavorito$ = new EventEmitter<string>();
  menuok$ = new EventEmitter<boolean>();
  public mensaje: string;
  constructor() {
    this.swchloading$.emit(false);
    this.mensaje = this.mensaje;
    this.menuok$.emit(false);
    this.swtRefreshHome$.emit(false);
  }
  public pantallapequeña() {
    this.swchsizesmall = true;
    console.log ('pequeña');
  }
  public pantallagrande() {
    this.swchsizesmall = false;
    console.log('grande');
  }

  public tostada(mensaje: string) {
    this.mensaje = mensaje;
    this.swchToast$.emit(true);
  }
  public tostadaEjecutada() {
    this.swchToast$.emit(false);
  }
  public refrescarOn(): void {
    this.swtRefreshHome$.emit(true);
  }
  public refrescarfavorito(idAviso: string): void {
    this.refreshFavorito$.emit(idAviso);
  }
  public refrescarOff(): void {
    this.swtRefreshHome$.emit(false);
  }
  public activarloading(mensaje: string): void {
    this.mensaje = mensaje;
    this.swchloading$.emit(true);
  }
  public desactivarloading(): void {
    this.swchloading$.emit(false);
    this.mensaje = null;
  }
  public ponermenu(): void {
    this.menuok$.emit(true);
  }
  public quitarrmenu(): void {
    this.menuok$.emit(false);
  }
  public modoLight() {
    this.primary = '#ff3e00';
    this.secondary = '#d1d0cc';
    this.light = '#f6f5f0';
    this.dark = '#242936';
    this.medium = '#ffffff';
    this.contrast = '#565B56';
    this.tertiary = '#FF8A65';
    this.darkMode$.emit(false);
  }
  public modoDark() {
    this.primary = '#ff3e00';
    this.secondary = '#020914';
    this.light = '#293040';
    this.dark = '#f6f5f0';
    this.medium = '#4C5D73';
    this.contrast = '#F0F0F2';
    this.tertiary = '#FF8A65';
    this.darkMode$.emit(true);
  }
}
