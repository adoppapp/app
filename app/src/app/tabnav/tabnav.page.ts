import { Component, OnInit, NgZone, } from '@angular/core';
import { AppService } from '../../app/services/app/app.service';
import { Seleccion } from './animacion.animation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
  animations: [Seleccion]
})
export class TabnavPage implements OnInit {
  ultimo = 0;
  public refrescar = true;
  public tabOpcion = [{ nombre: 'home', estado: 'inicial', indice: 0, selec: false, colorIcon: '', colorBoton: '' },
  { nombre: 'avisos', estado: 'inicial', indice: 1, selec: false, colorIcon: '', colorBoton: '' },
  { nombre: 'mensajes', estado: 'inicial', indice: 2, colorIcon: '', colorBoton: '' }];


  constructor(public svcloading: AppService, public srvApp: AppService, private router: Router) {
    this.tabOpcion[0].colorIcon = this.srvApp.contrast;
    this.tabOpcion[1].colorIcon = this.srvApp.contrast;
    this.tabOpcion[2].colorIcon = this.srvApp.contrast;
    this.tabOpcion[0].colorBoton = this.srvApp.light;
    this.tabOpcion[1].colorBoton = this.srvApp.light;
    this.tabOpcion[2].colorBoton = this.srvApp.light;
    router.events.subscribe (url => {
      const urlactual = this.router.url;
      if (urlactual === '/tabnav/home') {
        this.push(0);
      } else {
        if (urlactual === '/tabnav/crearaviso') {
          console.log ("crear aviso");
          // this.ngZone.run(() => this.navigateTo(donde));
          this.push(1);
        } else {
          this.push(2);
        }
      }

    });
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ionViewWillEnter() {
   console.log ("hola soy el enter  "  + this.srvApp.wellcome);
   if (this.srvApp.wellcome) {
      this.srvApp.wellcome = false;
      console.log('ahora estoy  refrescando');
      this.router.navigate(['wellcome']);
      console.log('refresque');
     // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentChecked() {
    // console.log("hola soy el content");
  }
  ngOnInit() {
    this.srvApp.darkMode$.subscribe(valor => {
      this.tabOpcion[0].colorIcon = this.srvApp.contrast;
      this.tabOpcion[1].colorIcon = this.srvApp.contrast;
      this.tabOpcion[2].colorIcon = this.srvApp.contrast;
      this.tabOpcion[this.ultimo].colorIcon = this.srvApp.medium;
      console.log('cambie de modo');
    });
    this.router.navigate(['']);
    this.svcloading.ponermenu();
    this.tabOpcion[0].estado = 'ok';
    this.tabOpcion[0].colorIcon = '#4C5D73';
    this.tabOpcion[0].colorBoton = this.srvApp.primary;
    this.tabOpcion[0].selec = true;
    console.log('hola soy el init');
  }
  push(opcion) {
    if (this.ultimo !== opcion) {
      this.tabOpcion[opcion].estado = 'ok';
      this.tabOpcion[opcion].colorIcon = '#4C5D73';
      this.tabOpcion[opcion].colorBoton = this.srvApp.primary;
      this.tabOpcion[opcion].selec = true;
      if (this.ultimo < 4) {
        this.tabOpcion[this.ultimo].colorIcon = this.srvApp.contrast;
        this.tabOpcion[this.ultimo].colorBoton = this.srvApp.light;
        this.tabOpcion[this.ultimo].estado = 'inicial';
        this.tabOpcion[this.ultimo].selec = false;
      }
      console.log(this.tabOpcion[opcion].colorIcon);
      this.ultimo = opcion;
    }
  }

}
