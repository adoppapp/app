import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AvisoService } from '../services/aviso/aviso.service';
import { AppService } from '../services/app/app.service';
import { FavoritoService } from '../services/favorito/favorito.service';
import { escalonado } from '../animations/escalonado.animation';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  animations: [escalonado],
})
export class FavoritosPage implements OnInit {
  public user: string;
  public swtCargando = true;
  public favoritos = [];
  public FavoritosDeUsuariO: Array<{ avisoId: string, nombre: string, fecha: string, imagen: string, especie: string }>;
  constructor(public authSrv: AuthService, private srvAviso: AvisoService,
              public srvApp: AppService, private srvFavorito: FavoritoService) {
    this.authSrv.userData$.subscribe(async user => {
      this.user = user.uid;
      const resultado = await this.srvFavorito.favoritosdeUsuario(this.user);
      if (resultado.exitoso) {
        this.favoritos = resultado.objeto;
        this.swtCargando = false;
      }
    });
  }

  async ngOnInit() {

  }
  public push() {
    console.log(this.favoritos);
  }
}
