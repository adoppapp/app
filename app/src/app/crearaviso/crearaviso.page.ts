import { Component, OnInit } from '@angular/core';
import { Regiones } from './regiones';
import { AvisoI } from '../interface/aviso.interace';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvisoService } from '../services/aviso/aviso.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../services/app/app.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AlertController} from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-crearaviso',
  templateUrl: './crearaviso.page.html',
  styleUrls: ['./crearaviso.page.scss'],
})
export class CrearavisoPage implements OnInit {
  public imagenes = [{ imagen: null, activo: true, cargada: false },
                      { imagen: null, activo: false, cargada: false },
                      { imagen: null, activo: false, cargada: false },
                      { imagen: null, activo: false, cargada: false }];
  public cropvisible = false;
  public indice = 0;
  public regiones: any;
  public uid: string;
  public comunas: string;
  public subscription: any;
  public avisoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    comuna: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private avisoS: AvisoService,
              private authsrv: AuthService,
              public router: Router,
              public appsrv: AppService,
              public alrControl: AlertController) {
    this.regiones = Regiones;

  }
  async fileChangeEvent(event: any): Promise<void> {
    if (event.target.files) {
      if (this.indice !== 4) {
      this.cropvisible = true;
      this.imageChangedEvent = event;
      } else {
        const alert = await this.alrControl.create({
          header: 'Información',
          subHeader: 'No se aceptan mas fotos',
          message: 'Alcanzo el numero maximo posible',
          buttons: ['OK'],
          cssClass: 'alertCustomCss' //
        });
        await alert.present();
      }
  }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  async tomarcropp() {
    this.cropvisible = false;
    this.imagenes[this.indice].imagen = this.croppedImage;
    this.imagenes[this.indice].cargada = true;
    this.imagenes[this.indice].activo = false;
    this.indice ++;
    if (this.indice < 4) {
      this.imagenes[this.indice].activo = true;
    }
  }

  ngOnInit() {
    console.log('hola soy el init del crear');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    console.log("game over");
  }

  async ionViewWillEnter() {
    if (!this.appsrv.visita) {
      this.subscription  =  this.authsrv.userData$.subscribe(async user => {
        this.uid = user.uid;
      });
    } else {
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'Solo usuarios registrados pueden adoptar',
        // tslint:disable-next-line:max-line-length
        message: '¿Deseas ir al area de acceso?',
        buttons: [
          {
            text: 'No, Gracias',
            handler: () => {
              this.router.navigate(['/']);
            }
          }, {
            text: 'Accesar',
            handler: () => {
              this.router.navigate(['/acceso']);
            }
          },
        ],
        backdropDismiss : false,
        cssClass: 'alertCustomCss' //
      });
      await alert.present();
    }
  }
  ionViewWillLeave() {
    if (!this.appsrv.visita) {
      this.subscription.unsubscribe();
    }
  }
  onChange(event) {
    const resultado = this.regiones.find(region => region.region === event.detail.value);
    if (resultado) {
      this.comunas = resultado.comunas;
      this.avisoForm.controls.comuna.setValue('');
    }
  }

  async onSaveAaviso(aviso: AvisoI): Promise<void> {
    if (this.indice > 0) {
      this.appsrv.activarloading ('Guardando Aviso');
      const respuesta = await this.avisoS.crearAviso(aviso, this.uid, this.imagenes);
      if (respuesta.exitoso) {
        this.limpiar();
        this.volverHome();
        this.appsrv.tostada('Aviso creado con exito');
      } else {
        const alert = await this.alrControl.create({
          header: 'Problemas',
          subHeader: 'Lo Sentimos',
          message: respuesta.texto,
          buttons: ['OK'],
          cssClass: 'alertCustomCss' //
        });
        await alert.present();
      }
      this.appsrv.desactivarloading();
    } else {
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'No se puede grabar',
        message: 'Falta a lo menos 1 imagen',
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      await alert.present();
    }
  }

  limpiar() {
    this.avisoForm.reset();
    this.imagenes.forEach((value) => {
      value.imagen = '';
      value.activo = false;
      value.cargada = false;
    });
  }
  public volverHome() {
    console.log('volver');
    this.appsrv.refrescarOn();
    this.router.navigate(['/tabnav/home']);
  }

}
