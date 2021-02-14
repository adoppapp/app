import { Component, OnInit, EventEmitter, NgZone, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisoI } from '../interface/aviso.interace';
import { Observable } from 'rxjs';
import { AvisoService } from '../services/aviso/aviso.service';
import { FavoritoService } from '../services/favorito/favorito.service';
import { AppService } from '../services/app/app.service';
import { fotoSlide } from '../animations/fotoslide.animations';
import { Mensaje } from '../interface/mensaje';
import { AuthService } from '../services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { SolicitudService } from '../services/solicitud/solicitud.service';
import { SolicituD } from '../interface/solicitudes.interface';

@Component({
  selector: 'app-avisodetalle',
  templateUrl: './avisodetalle.page.html',
  styleUrls: ['./avisodetalle.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fotoSlide]
})
export class AvisodetallePage implements OnInit {
  public avisoId: string;
  private ultimoIndice = 0;
  public largocaja: string;
  public uId: string;
  public activoFavorito = false;
  public topbotones: string;
  public pushBotonFavoritos = true;
  public swtSolicitud = true;
  public solicitud: SolicituD;
  public solicitudes: any;
  public fotos: Array<{ imagen: string, activa: boolean, numero: number, color: string, estado: string, }>;
  public aviso$: Observable<AvisoI>;
  public solicitudxaviso$: Observable<any>;
  public aviso: AvisoI;
  constructor(private srvauth: AuthService, private route: ActivatedRoute, public srvApp: AppService,
              private srvSolicitud: SolicitudService, private srvAviso: AvisoService, private router: Router,
              private srvFavorito: FavoritoService, private alrControl: AlertController, private ngZone: NgZone,
              private ref: ChangeDetectorRef) {
    this.largocaja = (srvApp.ancho - (srvApp.ancho / 4)) + 'px';
    this.topbotones = ((srvApp.ancho - (srvApp.ancho / 4)) / 2) + 'px';
    this.avisoId = route.snapshot.paramMap.get('id');
    this.aviso$ = srvAviso.traeraviso(this.avisoId);
    }

  async ionViewWillEnter() {

    if (!this.srvApp.visita) {
      this.solicitudxaviso$ = this.srvSolicitud.traersocitudesaviso(this.avisoId);
      this.solicitudxaviso$.subscribe(async aviso => {
        console.log(aviso);
        this.solicitudes = aviso;
      });
      this.srvauth.userData$.subscribe(async user => {
        this.uId = user.uid;

      });
    } else {
      this.uId = "visita";
    }

  }

  ngOnInit() {

    this.fotos = [];
    let indice = 1;
    this.aviso$.subscribe(async aviso => {
      const resultado: Mensaje = await this.srvSolicitud.comprobarSolitud(this.avisoId, this.uId);
      if (resultado.exitoso) {
        this.solicitud = resultado.objeto;
        console.log(this.solicitud);
        this.ngZone.run(() => {
          this.swtSolicitud = false;
          this.ref.markForCheck();
        });
      } else {
        this.ngZone.run(() => {
          this.swtSolicitud = true;
          this.ref.markForCheck();
        });
      }
      this.aviso = aviso;
      if (this.fotos.length === 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < aviso.fotos.length; i++) {
          const imagen = new Image();
          this.fotos.push({ imagen: aviso.fotos[i], activa: false, numero: indice, color: 'secondary', estado: 'inactive' });
          indice++;
        }
        this.fotos[0].color = 'primary';
        this.fotos[0].activa = true;
        this.fotos[0].estado = 'active';
        if (!this.srvApp.visita) {
          const mensajeFavorito = await this.srvFavorito.comprobarFavorito(this.avisoId, this.uId);
          if (mensajeFavorito.exitoso) {
            this.activoFavorito = true;
            this.pushBotonFavoritos = false;
          } else {
            this.activoFavorito = false;
            this.pushBotonFavoritos = false;
          }
        }
      }
    });

  }
  public activarFoto(indice: number, lastindice?: number) {
    lastindice = (lastindice ? lastindice : this.ultimoIndice);
    if (indice !== lastindice) {
      this.fotos[indice].color = 'primary';
      this.fotos[indice].activa = true;
      this.fotos[indice].estado = 'active';
      this.fotos[lastindice].color = 'secondary';
      this.fotos[lastindice].activa = false;
      this.fotos[lastindice].estado = 'inactive';
      this.ultimoIndice = indice;
    }
  }
  public pasarFoto(direccion: string, indice: number) {
    this.fotos[indice].estado = 'activa';
    let newindice: number;
    const largo = this.fotos.length;
    if (direccion === 'back') {
      if (indice > 0) {
        newindice = indice - 1;
      } else {
        newindice = largo - 1;
      }
    } else {
      newindice = indice + 1;
      if (newindice === largo) {
        newindice = 0;
      }
    }
    this.activarFoto(newindice, indice);
  }
  public async pushfavorito() {
    console.log( "visista :" + this.srvApp.visita);
    if (!this.srvApp.visita) {
      if (!this.pushBotonFavoritos) {
        this.pushBotonFavoritos = true;
        if (!this.activoFavorito) {
          this.activoFavorito = true;
          const mensajeFavorito: Mensaje = await this.srvFavorito
            .saveFavorito(this.avisoId, this.uId, this.aviso.fecha, this.aviso.nombre, this.aviso.fotos[0]);
          if (!mensajeFavorito.exitoso) {
            this.activoFavorito = false;
          }
        } else {
          this.activoFavorito = false;
          const mensajeFavorito = await this.srvFavorito.deleteFavorito(this.avisoId, this.uId);
          if (!mensajeFavorito.exitoso) {
            this.activoFavorito = true;
          }
        }
        this.pushBotonFavoritos = false;
      } } else {
        const alert = await this.alrControl.create({
          header: 'Información',
          subHeader: 'Solo los usuarios registrados pueden marcar favoritos',
          // tslint:disable-next-line:max-line-length
          message: '¿Deseas ir al area de acceso?',
          buttons: [
            {
              text: 'No, Gracias'
            }, {
              text: 'Accesar',
              handler: () => {
                this.router.navigate(['/acceso']);
              }
            }
          ],
          cssClass: 'alertCustomCss' //
        });
        await alert.present();
      }
  }
  public async solicitar() {
    if (!this.srvApp.visita) {
    const alert = await this.alrControl.create({
      header: 'Información',
      subHeader: 'esta a un paso de adquerir una responsabilidad',
      message: '¿Esta seguro que desea realizar una solicitud de adopción?',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.crearSolicitud();
          }
        }
      ],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
    } else {
  const alert = await this.alrControl.create({
    header: 'Información',
    subHeader: 'Solo los usuarios registrados pueden ser postulante de adopciones',
    // tslint:disable-next-line:max-line-length
    message: '¿Deseas ir al area de acceso?',
    buttons: [
      {
        text: 'No, Gracias'
      }, {
        text: 'Accesar',
        handler: () => {
          this.router.navigate(['/acceso']);
        }
      }
    ],
    cssClass: 'alertCustomCss' //
  });
  await alert.present();
}
  }
  public async crearSolicitud() {
    this.ngZone.run(() => {
      this.srvApp.activarloading('Guardando Solicitud');
    });
    const mensaje: Mensaje = await this.srvSolicitud.crearSolicitud(this.avisoId, this.uId);
    if (mensaje.exitoso) {
      this.ngZone.run(() => {
        this.srvApp.desactivarloading();
        this.swtSolicitud = false;
        this.ref.markForCheck();
      });
      console.log("desaparece");
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'Felicidades Tu solicitud fue creada con exito',
        // tslint:disable-next-line:max-line-length
        message: 'El autor se reserva el derecho de aceptarla, enviale un mensaje para contarle porque te debiera haceptar a ti',
        buttons: [
          {
            text: 'No enviar'
          }, {
            text: 'Enviar Mensaje',
            handler: () => {
              this.router.navigate(['/chat']);
            }
          }
        ],
        cssClass: 'alertCustomCss' //
      });
      await alert.present();
    } else {
      this.ngZone.run(() => {
        this.srvApp.desactivarloading();
      });
    }
  }
}
