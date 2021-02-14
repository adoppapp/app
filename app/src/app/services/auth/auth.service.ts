import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FileI } from '../../interface/file.interface';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { auth } from 'firebase/app'; import 'firebase/auth';
// import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../../interface/mensaje';
import { AppService } from '../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isreset: boolean;
  public errMensaje = 'vacio';
  public usuario: string;
  public userData$: Observable<firebase.User>;
  private filePath: string;
  swchloading$ = new EventEmitter<string>();
  constructor(public afAuth: AngularFireAuth,
              public alrControl: AlertController,
              public router: Router,
              private srvApp: AppService,
              private storage: AngularFireStorage,
              public httpClient: HttpClient) {
    this.userData$ = afAuth.authState;
  }
  // login
  async onLogin(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      this.errMensaje = error.code;
      if (error.code === 'auth/user-not-found') {
        this.errMensaje = 'El usuario ingresado no esta registrado';
      }
      if (error.code === 'auth/wrong-password') {
        this.errMensaje = 'El password ingresado es incorrecto';
      }
    }
  }
  async googlelogin(): Promise<Mensaje> {
    const provider = new auth.GoogleAuthProvider();
    try {
      const resultado = await this.afAuth.signInWithPopup(provider);
      return { exitoso: true, objeto: resultado };
    } catch (error) {
      console.log(error);
      this.errMensaje = error.code;
      return { exitoso: false, objeto: error };
    }
  }

  // registro
  async onRegister(user: User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      this.errMensaje = error.code;
      if (error.code === 'auth/email-already-in-use') {
        this.errMensaje = 'el correo ingresado ya se encuentra registrado.';
      }
    }
  }
  async usuarioactivo() {
    const user = this.afAuth.authState;
    return user;
  }
  // salir de aplicacion
  async logout() {
    await this.afAuth.signOut().then(() => {
      console.log('sali');
    });
  }
  async consultaporUID(uid: string): Promise<any> {
    const paramentros = '?uid=' + uid;
    let data: any;
    data = await this.httpClient.get(this.srvApp.urlapi + '/consultausuario' + paramentros).toPromise();
    return { displayName: data.displayName, photoURL: data.photoURL, uid: data.uid };
  }

  // reinicializar password
  async resetPassword(email: string): Promise<Mensaje> {
    try {
      await this.afAuth.sendPasswordResetEmail(email).then(() => this.isreset = true);
      return { exitoso: true };
    } catch (error) {
      this.isreset = false;
      this.errMensaje = error.code;
      if (error.code === 'auth/user-not-found') {
        this.errMensaje = 'El correo ingresado no se encuentra registrado';
      }
      return { exitoso: false, objeto: error };
    }
  }

  preSaveUserProfile(user: User, image?: FileI): void {
    this.swchloading$.emit('Activar');
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  // public datosuser(): User {
  //   return this.afAuth.currentUser;
  // }

  private uploadImage(user: User, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }

  saveUserProfile(user: User) {
    const photoURL2 = user.photoURL;
    const displayName2 = user.displayName;
    // tslint:disable-next-line:no-shadowed-variable
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        user.updateProfile({
            displayName: displayName2,
            photoURL: photoURL2
          })
          .then(() => {
            this.swchloading$.emit('desactivar');
            console.log('User updated!');
            this.errMensaje = '';
          }
          )
          .catch(err => {
            this.swchloading$.emit('desactivar');
            console.log('Error', err);
            this.errMensaje = err;
          });
      } else {
        // not logged in
      }});
  }
 }
