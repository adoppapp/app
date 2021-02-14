import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app/app.service';
import { routerTransition } from '../../animacion.animation';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class RegistroComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
              public srvAuth: AuthService,
              public alrControl: AlertController,
              public router: Router,
              public toastController: ToastController,
              public svcloading: AppService) {
    this.rForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  rForm: FormGroup;
  public user = new  User ();
  ngOnInit() {
  }
  async onSignUp() {
    this.svcloading.activarloading('Registrando');
    this.user.email = this.rForm.value.email;
    this.user.password = this.rForm.value.pwd;
    const user = await this.srvAuth.onRegister(this.user);
    if (user) {
      const userAct = new User();
      userAct.email = user.user.email;
      userAct.displayName = 'Anonimo';
      userAct.uid = user.user.uid;
      // tslint:disable-next-line:max-line-length
      userAct.photoURL = './assets/avatar.jpg';
      // userAct.phoneNumber = 1;
      this.srvAuth.saveUserProfile(userAct);
      this.presentToast();
      this.svcloading.desactivarloading();
      this.svcloading.wellcome = true;
      this.router.navigate(['/']);
    } else {
      const alert = await this.alrControl.create({
        header: 'Alerta',
        subHeader: 'Operacion fallida',
        message: this.srvAuth.errMensaje,
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      this.svcloading.desactivarloading();
      await alert.present();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registro de usuario exitoso',
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }
}

