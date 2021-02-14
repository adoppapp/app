import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../../interface/mensaje';
import { FavoritO } from '../../interface/favorito.interace';
import { AvisoI } from '../../interface/aviso.interace';
import { AppService } from '../app/app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AvisoService} from '../aviso/aviso.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private favoritoxUsuarioCollection: AngularFirestoreCollection<FavoritO>;
  private avisoCollection: AngularFirestoreCollection<AvisoI>;
  public Favoritos: AngularFirestoreCollection<FavoritO>;
  private favoritosDeUsuarioCollection: AngularFirestoreCollection<{ FavoritoId: string }>;

  constructor(private afs: AngularFirestore, private srvApp: AppService, private srvAviso: AvisoService) {
    this.favoritoxUsuarioCollection = this.afs.collection<any>('favoritos');
    this.avisoCollection = this.afs.collection<AvisoI>('avisos');
    this.Favoritos = this.afs.collection<FavoritO>('favoritos');
  }
  public async favoritosdeUsuario(userId: string): Promise<Mensaje> {
    const favoritos = [] ;
    const favoritoUsuario = this.favoritoxUsuarioCollection.doc(userId).collection<FavoritO>('favoritos');
    const resultado = await  favoritoUsuario.get().toPromise();
    try {
    let indice = 0;
    resultado.forEach( (doc) => {
      favoritos.push (doc.data());
      favoritos[indice].avisoid = doc.id;
      indice++;
    });
    console.log(favoritos);
    return { exitoso: true, objeto: favoritos };
    } catch (error) {
      console.log(error);
      return {exitoso: false};
    }
  }
  // public favoritosdeUsuario(userId: string): Observable<any> {
  //   const favoritoUsuario = this.favoritoxUsuarioCollection.doc(userId).collection<FavoritO>('favoritos')
  //   return favoritoUsuario.get().snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }


  public async saveFavorito(avisoId: string, userId: string, fechaAviso: string, nombreAviso: string, fotoAviso: string): Promise<Mensaje> {
    const favoritoUsuario = this.favoritoxUsuarioCollection.doc(userId).collection<FavoritO>('favoritos');
    try {
      const favoritoUsurioAviso = await favoritoUsuario.doc(avisoId)
      // tslint:disable-next-line:object-literal-shorthand
      .set({ fechaAviso: fechaAviso, nombreAviso: nombreAviso, fotoAviso: fotoAviso});
      this.srvApp.refrescarfavorito(avisoId);
      this.srvAviso.incrementarFavoritos(avisoId, 1);
      return { exitoso: true,  objeto: favoritoUsurioAviso};
    } catch (error) {
      console.log(error);
      return { exitoso: false, texto: 'Error al grabar favorito' };
    }
  }
  public async deleteFavorito(avisoId: string, userId: string): Promise<Mensaje> {
    const favoritoUsuario = this.favoritoxUsuarioCollection.doc(userId).collection<FavoritO>('favoritos');
    try {
      const favoritoUsurioAviso = await favoritoUsuario.doc(avisoId).delete();
      this.srvApp.refrescarfavorito(avisoId);
      this.srvAviso.incrementarFavoritos(avisoId, -1);
      return { exitoso: true, objeto: favoritoUsurioAviso };
    } catch (error) {
      console.log(error);
      return { exitoso: true, objeto: error };
    }
  }
  public async comprobarFavorito(avisoId: string, userId: string) {
    const favoritoUsuario = this.favoritoxUsuarioCollection.doc(userId).collection<FavoritO>('favoritos');
    try {
      const resultado = await favoritoUsuario.doc(avisoId).get().toPromise();
      if (resultado.exists) {
          return { exitoso: true, texto: resultado };
      } else {
          return { exitoso: false, texto: resultado };
        }
    } catch (error) {
      console.log(error);
      return { exitoso: false, texto: 'Error en Consulta de favoritos', objeto: error };
    }
  }
}
