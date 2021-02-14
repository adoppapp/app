import { Component, Input, OnInit, NgZone, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {User} from '../../models/user';
import { AlertController } from '@ionic/angular';
import { SolicitudService } from '../../services/solicitud/solicitud.service';

@Component({
  selector: 'app-cajausuario',
  templateUrl: './cajausuario.component.html',
  styleUrls: ['./cajausuario.component.scss'],
})
export class CajausuarioComponent implements OnInit {

  @Input() userpregunta: string;
  @Input() userconsultar: string;
  @Input() aviso: string;
  @Input() solicitante: boolean;
  @Input() estado: string;
  public cargadosw = false;
  swcargado$ = new EventEmitter<boolean>();
  public user: User;
  constructor(private srvAuth: AuthService, private srvSolicitud: SolicitudService,
              private ngZone: NgZone, private alrControl: AlertController) {
                this.swcargado$.emit(false);
              }

 async ngOnInit() {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck() {
    console.log ("algo cambio");
  }
  cambiaestado() {

  }
  // tslint:disable-next-line:use-lifecycle-interface
 async ngOnChanges() {
    console.log("entre al ionic");
    this.user = await this.srvAuth.consultaporUID(this.userconsultar);
    this.swcargado$.emit(true);

  }
  async rechazar() {
    const alert = await this.alrControl.create({
      header: 'Confirmación',
      // tslint:disable-next-line:max-line-length
      subHeader: 'decidio rechazar la solicitud de adopción al solicitante ' + this.user.displayName + ' esta accion no puede ser revertida ',
      // tslint:disable-next-line:max-line-length
      message: '¿Esta seguro de rechazar?',
      buttons: [
        {
          text: 'No, Gracias'
        }, {
          text: 'Si Confirmo',
          handler: () => {
            this.srvSolicitud.cambiarestado( this.userconsultar , this.aviso, "rechazado");
          }
        }
      ],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }
  async aprobar() {
    const alert = await this.alrControl.create({
      header: 'Confirmación',
      subHeader: 'decidio asignar la adopcion al solicitante ' + this.user.displayName + ' esta accion no puede ser revertida ',
      // tslint:disable-next-line:max-line-length
      message: '¿Esta seguro de asignar solicitud?',
      buttons: [
        {
          text: 'No, Gracias'
        }, {
          text: 'Si Confirmo',
          handler: () => {
            this.srvSolicitud.cambiarestado(this.userconsultar, this.aviso, "aprobado");
          }
        }
      ],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }
}

