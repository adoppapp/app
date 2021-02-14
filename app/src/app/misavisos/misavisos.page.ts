import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services//auth/auth.service';
import { AvisoService } from '../services/aviso/aviso.service';
import { AvisoI } from '../interface/aviso.interace';
import { escalonado } from '../animations/escalonado.animation';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-misavisos',
  templateUrl: './misavisos.page.html',
  styleUrls: ['./misavisos.page.scss'],
  animations: [escalonado],
})
export class MisavisosPage implements OnInit {
  public swtCargando = true;
  public user: string;
  public avisos: Array<AvisoI>;

  constructor(public srvApp: AppService, public authSrv: AuthService, private srvAviso: AvisoService) {
  }

  ngOnInit() {
    this.authSrv.userData$.subscribe(async user => {
      this.user = user.uid;
      this.swtCargando = true;
      const resultado = await this.srvAviso.avisosdeUsuario(this.user);
      if (resultado.exitoso) {
        this.avisos = resultado.objeto;
        this.swtCargando = false;
        console.log(this.avisos);
      }
    });
  }
}
