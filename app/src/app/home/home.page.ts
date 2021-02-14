import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { escalonado } from '../animations/escalonado.animation';
import { entrarsalir } from '../animations/entrarsalir.animations';
import { Panelperrogato } from '../animations/panelperrogato.animations';
import { AvisoService } from '../services/aviso/aviso.service';
import { AppService } from '../services/app/app.service';
import { AvisoI } from '../interface/aviso.interace';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [escalonado, Panelperrogato, entrarsalir],
})
export class HomePage implements OnInit {
  public size = 'Tamaño';
  public sexo = 'Sexo';
  public edad = 'Edad';
  public swtPerroGato = 'inicial';
  public swtFlechaPerroGato = 'inicial';
  public modoDark = true;
  public swtCargando = true;
  public swtLleno = false;
  public perrogato = { perro: { activo: true, color: '' }, gato: { activo: true, color: this.srvApp.primary } };
  public avisos: Array<AvisoI>;
  public user: firebase.User;
  public refrescar = true;
  constructor(private menu: MenuController,
              public authSrv: AuthService,
              private actSheet: ActionSheetController,
              private ngZone: NgZone,
              private avisoSrv: AvisoService,
              public srvApp: AppService,
              public alerta: AlertController,
  ) {
   if (this.srvApp.visita) {
    this.srvApp.swtRefreshHome$.subscribe((valor: any) => {
      if (valor) {
        this.llamarAvisos();
        this.srvApp.refrescarOff();
     }
  });
   }
  }

  ngOnInit() {
    this.avisos = [];
    this.perrogato.gato.color = this.srvApp.tertiary;
    this.perrogato.perro.color = this.srvApp.tertiary;
    this.authSrv.userData$.subscribe(async user => {
        this.user = user;
      });
    this.llamarAvisos();
  }
  async llamarAvisos() {
    this.swtCargando = true;
    // tslint:disable-next-line:max-line-length
    const mensaje = await this.avisoSrv.traerAvisos(this.size, this.sexo, this.edad, this.perrogato.perro.activo, this.perrogato.gato.activo);
    if (mensaje.exitoso) {
      this.avisos = mensaje.objeto;
    } else {

    }
    this.swtLleno = ((this.avisos.length !== 0) ? true : false);
    this.swtCargando = false;
    this.avisos = mensaje.objeto;
    console.log(this.avisos.length, this.swtLleno, this.swtCargando);
  }

  abrirMenu() {
    this.menu.enable(true, 'star');
    this.menu.open('start');
  }

  async opcionesTamano() {

    const actionSheet = await this.actSheet.create({
      header: 'Tamaño',
      buttons: [{
        text: 'Pequeño(a)',
        handler: () => {
          this.srvApp.size = true;
          this.gatillarAccion('Tamaño', 'Pequeño');
        }
      }, {
        text: 'Mediano(a)',
        handler: () => {
          this.srvApp.size = true;
          this.gatillarAccion('Tamaño', 'Mediano');
        }
      }, {
        text: 'Grande',
        handler: () => {
          this.srvApp.size = true;
          this.gatillarAccion('Tamaño', 'Grande');
        }
      },
      {
        text: 'Todos',
        handler: () => {
          this.srvApp.size = false;
          this.gatillarAccion('Tamaño', 'Tamaño');
        }
      }]
    });
    await actionSheet.present();
  }
  async opcionesSexo() {
    const actionSheet = await this.actSheet.create({
      header: 'Sexo',
      buttons: [{
        text: 'Hembra',
        handler: () => {
          this.srvApp.sexo = true;
          this.gatillarAccion('Sexo', 'Hembra');
        }
      }, {
        text: 'Macho',
        handler: () => {
          this.srvApp.sexo = true;
          this.gatillarAccion('Sexo', 'Macho');
        }
      },
      {
        text: 'Todos',
        handler: () => {
          this.srvApp.sexo = false;
          this.gatillarAccion('Sexo', 'Sexo');
        }
      }]
    });
    await actionSheet.present();
  }

  async opcionesEdad() {
    const actionSheet = await this.actSheet.create({
      header: 'Edad',
      buttons: [{
        text: 'Cachorro(a)',
        handler: () => {
          this.srvApp.edad = true;
          this.gatillarAccion('Edad', 'Cachorro');
        }
      }, {
        text: 'Juvenil',
        handler: () => {
          this.srvApp.edad = true;
          this.gatillarAccion('Edad', 'Juvenil');
        }
      },
      {
        text: 'Adulto(a)',
        handler: () => {
          this.srvApp.edad = true;
          this.gatillarAccion('Edad', 'Adulto');
        }
      },
      {
        text: 'Senior',
        handler: () => {
          this.srvApp.edad = true;
          this.gatillarAccion('Edad', 'Senior');
        }
      },
      {
        text: 'Todos',
        handler: () => {
          this.srvApp.edad = false;
          this.gatillarAccion('Edad', 'Edad');
        }
      }
      ]
    });
    await actionSheet.present();
  }
  private gatillarAccion(tipo: string, valor: string) {
    if (tipo === 'Tamaño') {
      this.ngZone.run(() => {
        this.size = valor;
      });
    }
    if (tipo === 'Sexo') {
      this.ngZone.run(() => {
        this.sexo = valor;
      });
    }
    if (tipo === 'Edad') {
      this.ngZone.run(() => {
        this.edad = valor;
      });
    }
    this.llamarAvisos();
  }
  async doRefresh(event) {
    // tslint:disable-next-line:max-line-length
    const mensaje = await this.avisoSrv.traerAvisos(this.size, this.sexo, this.edad, this.perrogato.perro.activo, this.perrogato.gato.activo);
    if (mensaje.exitoso) {
      this.avisos = mensaje.objeto;
      event.target.complete();
    } else {
      //
    }

  }
  public pushperro() {
    if (this.perrogato.perro.activo) {
      if (this.perrogato.gato.activo) {
        this.perrogato.perro.activo = false;
        this.perrogato.perro.color = this.srvApp.secondary;
      } else {
        this.mensaje();
      }
    } else {
      this.perrogato.perro.activo = true;
      this.perrogato.perro.color = this.srvApp.tertiary;
    }
    this.llamarAvisos();
  }
  public pushgato() {
    if (this.perrogato.gato.activo) {
      if (this.perrogato.perro.activo) {
        this.perrogato.gato.activo = false;
        this.perrogato.gato.color = this.srvApp.secondary;
      } else {
        this.mensaje();
      }
    } else {
      this.perrogato.gato.activo = true;
      this.perrogato.gato.color = this.srvApp.tertiary;
    }
    this.llamarAvisos();
  }
  public async mensaje() {
    const alert = await this.alerta.create({
      header: 'Aviso',
      subHeader: 'No realizado',
      message: 'Marque al menos una opción',
      buttons: ['OK'],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }
  public pushPerroGato() {
    this.swtFlechaPerroGato = (this.swtFlechaPerroGato === 'inicial' ? 'activo' : 'inicial');
    this.swtPerroGato = (this.swtPerroGato === 'inicial' ? 'activo' : 'inicial');
  }
  public modovisualizacion() {
    document.body.classList.toggle('dark', this.modoDark);
    if (this.modoDark) {
      this.srvApp.modoDark();
    } else {
      this.srvApp.modoLight();
    }

  }

}
