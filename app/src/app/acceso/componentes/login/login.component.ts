import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interface/user.interface';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app/app.service';
import { routerTransition } from '../../animacion.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  public user = ({email : '', password: ''});
  constructor(private formBuilder: FormBuilder,
              public srvAuth: AuthService,
              public alrControl: AlertController,
              public router: Router,
              public loadingCtrl: LoadingController,
              public srvApp: AppService) {
    this.rForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async onLogin() {
    this.srvApp.activarloading('accesando');
    this.user.email = this.rForm.value.email;
    this.user.password = this.rForm.value.pwd;
    const user = await this.srvAuth.onLogin(this.user);
    if (user) {
      this.loginexitoso();
    } else {
      this.mensajedeerror();
    }
  }
  async loginGoogle() {

    this.srvApp.activarloading('Conectando con Google');
    const mensaje = await this.srvAuth.googlelogin();
    if (mensaje.exitoso) {
      this.loginexitoso();
    } else {
      this.mensajedeerror();
    }
  }
  private loginexitoso() {
    this.srvApp.visita = false;
    this.srvApp.desactivarloading();
    this.srvApp.ponermenu();
    this.srvApp.wellcome = true;
    this.router.navigate(['/']);
  }
  async mensajedeerror() {
    this.srvApp.desactivarloading();
    const alert = await this.alrControl.create({
      header: 'Alerta',
      subHeader: 'Imposible ingresar ',
      message: this.srvAuth.errMensaje,
      buttons: ['OK'],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }

}
