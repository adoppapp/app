import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppService} from '../../services/app/app.service';

@Component({
  selector: 'app-r-menu-usuario',
  templateUrl: './r-menu-usuario.component.html',
  styleUrls: ['./r-menu-usuario.component.scss']

})
export class RMenuUsuarioComponent implements OnInit {
  public user: firebase.User;


  constructor(public authSrv: AuthService,
              public alrControl: AlertController,
              private router: Router,
              private menu: MenuController,
              private ngZone: NgZone,
              public svcloading: AppService,
              public srvApp: AppService
  ) {

  }

  // ******************** Oninit *******************************
  ngOnInit() {
    this.authSrv.userData$.subscribe(user => {
      // console.log(user.email);
      if (user) {
        this.user = user;
      }
    });

  }
  // ******************** Pregunta si desea salir *******************************
  async Logout() {
    console.log('logout');
    const alert = await this.alrControl.create({
      header: 'Aviso',
      subHeader: 'Confirmacion',
      message: '¿Desea Salir de la applicacion?',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.Salir();
          }
        }
      ],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }
  // ******************** Si la opcion es salir *******************************
  async Salir() {
    this.authSrv.logout();
    this.srvApp.visita = true;

    this.irpara('/');
  }
  // ******************** *******************************
  llamaraccion(accion: string) {
    console.log(accion);
    switch (accion) {
      case 'Salir': {
        this.Logout();
        break;
      }
      case 'Editar': {
        this.irpara('/profile');
        break;
      }
      case 'Favoritos': {
        this.irpara('/favoritos');
        break;
      }
      case 'Solicitudes': {
        this.irpara('/solicitudes');
        break;
      }
      case 'Avisos': {
        this.irpara('/misavisos');
        break;
      }
      case 'Notificaciones': {
        this.irpara('/notificaciones');
        break;
      }
      case 'libro': {
        this.irpara('/seguimiento');
        break;
      }
      case 'exito': {
        this.irpara('/exitos');
        break;
      }
    }
  }
  // ******************** *******************************
  irpara(donde: string) {
      this.menu.enable(true, 'star');
      this.menu.close('start');
      this.ngZone.run(() => this.navigateTo(donde));
  }
  // ******************** *******************************
  navigateTo(url: string) {
    this.router.navigate([url]);

  }

  // ******************** *******************************

}
