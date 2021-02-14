import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app/app.service';
import { routerTransition } from '../../animacion.animation';
@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.component.html',
  styleUrls: ['./olvido.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class OlvidoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public srvAuth: AuthService,
              public alrControl: AlertController,
              public router: Router,
              public svcloading: AppService) {
    this.rForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  rForm: FormGroup;
  public user: User = new User();

  ngOnInit() { }

  public async reiniciar() {
    this.svcloading.activarloading('Conectanto');
    const resultado = await this.srvAuth.resetPassword(this.rForm.value.email);
    if (resultado.exitoso) {
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'operación exitosa',
        message: 'por favor revise su correo',
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      this.svcloading.desactivarloading();
      await alert.present();

    } else {
      const alert = await this.alrControl.create({
        header: 'Alerta',
        subHeader: 'Imposible Reiniciar contraseña ',
        message: this.srvAuth.errMensaje,
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      this.svcloading.desactivarloading();
      await alert.present();
    }
    this.svcloading.desactivarloading();
  }

}
