import { Component, OnInit } from '@angular/core';
import { FileI } from '../interface/file.interface';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public image: FileI;
  public currentImage = './assets/images/usuario.jpg';
  imageURL: string;
  uploadForm: FormGroup;
  private loading;
  user: any;
  constructor(private srvAuth: AuthService,
              public router: Router,
              public loadingCtrl: LoadingController,
              public toastController: ToastController) {
  }

  public profileForm = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    tipo: new FormControl(''),
    darkmode: new FormControl(''),
    avisos: new FormControl(''),
    correo: new FormControl(''),
    photoURL: new FormControl(''),
  });
  ngOnInit() {
    // this.authSvc.userData$.subscribe(user => {
    //   this.initValuesForm1(user);
    //   console.log('pase por aqui 2');
    //  });
    this.srvAuth.userData$.subscribe(async user => {
      this.user = user;
      this.initValuesForm2();
    });


    this.srvAuth.swchloading$.subscribe(estado => {
      if (estado === 'Activar') {
        this.loadingCtrl.create({
          message: 'Guardando'
        }).then((overlay) => {
          this.loading = overlay;
          this.loading.present();
        });
      } else {
        this.loading.dismiss();
        this.presentToast();
      }
    });
  }

  onSaveUser(user: User): void {
    user.photoURL = this.currentImage;
    this.srvAuth.preSaveUserProfile(user, this.image);
    console.log(this.image);
  }

  private initValuesForm2(): void {
    this.currentImage = this.user.photoURL;
    if (this.user.email === this.user.displayName) {
      this.profileForm.patchValue({
        displayName: '',
        email: this.user.email,
      });
    } else {
      this.profileForm.patchValue({
        displayName: this.user.displayName,
        email: this.user.email,
      });
    }
    this.profileForm.patchValue({
      tipo: '',
      darkmode: false,
      avisos: true,
      correo: false,
    });
  }
  // Image Preview
  showPreview(e) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.currentImage = event.target.result;
        this.image = e.target.files[0];
      };
    }
  }
  handleImage(image: FileI): void {
    this.image = image;
  }
  goHome() {
    console.log('go home');
    this.router.navigate(['/']);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Modificaciones realizadas con exito',
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }
}
