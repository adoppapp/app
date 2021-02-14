import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AppService } from './services/app/app.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  loading: any;
  public sizepantalla = 'inicial';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoadingController,
    public srvApp: AppService,
    public ctrToast: ToastController,
    public srvAuh: AuthService
  ) {
    this.initializeApp();
    this.srvApp.swchloading$.subscribe(async (loading: boolean) => {
      if (loading === true) {
        this.presentLoading();
      } else {
        await this.loadingController.dismiss();
      }
    });
    this.srvApp.swchToast$.subscribe(async (tostada: boolean) => {
      if (tostada === true) {
        this.presentarTostada();
        this.srvApp.tostadaEjecutada();
      }
    });
  }
  async presentarTostada() {
      const toast = await this.ctrToast.create({
        message: this.srvApp.mensaje,
        color: 'tertiary',
        duration: 2000
      });
      toast.present();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.srvApp.mensaje,
      cssClass: 'custom-loader-class'
    });
    await this.loading.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.srvApp.largo = this.platform.height();
      this.srvApp.ancho = this.platform.width();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.srvAuh.userData$.subscribe(user => {
        // console.log(user.email);
        if (user) {
          this.srvApp.visita = false;
        }});
      if (this.srvApp.ancho < 500) {
        this.srvApp.pantallapequeña();
      } else {
        this.srvApp.pantallagrande();
      }
    });
  }
  onResize(event) {
    if ( this.srvApp.swchsizesmall === true && event.target.innerWidth >= 500) {
        this.srvApp.pantallagrande();
      }
    if (this.srvApp.swchsizesmall === false && event.target.innerWidth < 500) {
      this.srvApp.pantallapequeña();
    }
    console.log(event.target.innerWidth);
  }
}
