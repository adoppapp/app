import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { AvisoService } from '../aviso/aviso.service';
import { Mensaje } from '../../interface/mensaje';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { SolicituD } from '../../interface/solicitudes.interface';
import { UsuarioSolicitudeS } from '../../interface/usuariosolicitudes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private solicitudCollection: AngularFirestoreCollection<SolicituD>;
  private usuarioSolicitudCollection: AngularFirestoreCollection;
   private solicitudavisoCollection: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore, private srvApp: AppService, private srvAviso: AvisoService ) {
    this.usuarioSolicitudCollection = this.afs.collection<UsuarioSolicitudeS>('solicitudes');
    this.solicitudavisoCollection = this.afs.collection<UsuarioSolicitudeS>('solicitudesxavisos');
  }

  public async crearSolicitud(avisoId: string, userId: string): Promise<Mensaje> {
    const documento = this.usuarioSolicitudCollection.doc(userId).collection<SolicituD>('solicitudes');
    try {
      const resultado = await documento.doc(avisoId).set({ fecha: Date().toLocaleString(), estado: 'activa' });
      const aviso = await this.usuarioSolicitudCollection.doc(userId).set({ visto: false });
      this.srvAviso.incrementarsolicitudes (avisoId, 1 );
      return { exitoso : true, objeto: aviso };
    } catch (error) {
      console.log (error);
      return { exitoso: false, objeto: error};
    }
  }
  public async solicitudavisos(avisoId: string): Promise<Mensaje> {
    const ref = this.solicitudavisoCollection.doc(avisoId).collection("usuarios");
    try {
      const resultado = await ref.get().toPromise();
      const avisos = resultado.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      return { exitoso: true, objeto: avisos };
    } catch (error) {
      return { exitoso: false };
    }
  }
  public traersocitudesaviso(id: string): Observable<any> {
    console.log('Traer solicitudes de aviso ' + id);
    return this.solicitudavisoCollection.doc(id).collection('usuarios').valueChanges();
  }
  public async cambiarestado(usuario: string, aviso: string, nuevoestado: string): Promise<Mensaje> {
    try {
    this.solicitudavisoCollection.doc(aviso).collection('usuarios').doc(usuario).set({uid: usuario, estado : nuevoestado});
    return { exitoso: true };
    } catch (error) {
      return { exitoso: false };
    }
  }
  public async comprobarSolitud(avisoId: string, userId: string): Promise<Mensaje> {
    const documento = this.usuarioSolicitudCollection.doc(userId).collection<SolicituD>('solicitudes');
    try {
      const resultado = await documento.doc(avisoId).get().toPromise();
      if (resultado.exists) {
        console.log('exitoso');
        return { exitoso: true, objeto: resultado.data() };
      } else {
        console.log('falso');
        return { exitoso: false};
      }
    } catch (error) {
      console.log(error);
      return { exitoso: false, objeto: error };
    }
  }
}
//   public crearSolicitud(avisoId: string, userId: string): Mensaje {
//   this.srvApp.activarloading('Guardando Solicitud');
//   let exitoso = false;
//   const documento = this.usuarioSolicitudCollection.doc(userId).collection<SolicituD>('solicitudes');
//   documento.doc(avisoId).set({ fecha: Date().toLocaleString(), aceptada: false }).then(data => {
//     console.log(data);
//     this.usuarioSolicitudCollection.doc(userId).set({ visto: false }).then(solicutud => {
//       console.log(solicutud);
//       this.srvApp.desactivarloading();
//       exitoso = true;
//     }).catch((err) => {
//       console.log(err);
//       exitoso = false;
//     });
//   }).catch((err) => {
//     console.log(err);
//     exitoso = false;
//   });

//   // tslint:disable-next-line:object-literal-shorthand
//   return { exitoso: exitoso };

// }
// }

