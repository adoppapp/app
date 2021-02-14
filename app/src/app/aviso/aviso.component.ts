import { Component, OnInit, Input, ViewChild, ElementRef, QueryList } from '@angular/core';
import { AvisoService } from '../services/aviso/aviso.service';
import { FavoritoService } from '../services/favorito/favorito.service';
import { AppService} from '../services/app/app.service';
import { Mensaje } from '../interface/mensaje';
import { corazon } from '../animations/corazon.animations';
import { AvisoPipe } from '../pipe/aviso.pipe';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
  animations: [corazon]
})
export class AvisoComponent implements OnInit {
  @Input() aviso: any;
  @Input() user: string;
  public activoFavorito = false;
  public pushBotonFavoritos = true;
  showChild: boolean;
  corazonestado: string;
  constructor(private srvAviso: AvisoService, private srvFavorito: FavoritoService,
              public srvApp: AppService, private alrControl: AlertController, private router: Router) {

  }
  @ViewChild("caja", { read: ElementRef, static: false }) cajachild: ElementRef<HTMLDivElement>;
  async ngOnInit() {

    this.srvApp.refreshFavorito$.subscribe ((idAvisos: string) => {
      console.log('escuche el llamado ' + this.aviso.id + ' = ' + idAvisos );
      if (this.aviso.id === idAvisos) {
        this.comprobarFavorito();
      }
    });
    this.comprobarFavorito();
    console.log(this.cajachild);

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    if (this.srvApp.swchsizesmall !== true) {
      console.log("soy grande :" + this.srvApp.largo);
    }
  }
  public async comprobarFavorito() {
    if (!this.srvApp.visita) {
    const mensajeFavorito = await this.srvFavorito.comprobarFavorito(this.aviso.id, this.user);
    if (mensajeFavorito.exitoso) {
      this.activoFavorito = true;
      this.corazonestado = 'active';
      this.pushBotonFavoritos = false;
    } else {
      // this.activoFavorito = true;
      this.corazonestado = 'inactive';
      this.pushBotonFavoritos = false;
      this.activoFavorito = false;
    }
    } else {
      this.corazonestado = 'inactive';
      this.pushBotonFavoritos = false;
      this.activoFavorito = false;
    }
  }
  onResize(event) {
    console.log(this.cajachild.nativeElement.getBoundingClientRect().left + this.srvApp.largo);
  }
  public async pushfavorito() {
    if (!this.srvApp.visita) {
        if (!this.pushBotonFavoritos) {
          this.pushBotonFavoritos = true;
          if (!this.activoFavorito) {
            this.activoFavorito = true;
            this.corazonestado = 'active';
            // tslint:disable-next-line:max-line-length
            const mensajeFavorito: Mensaje = await this.srvFavorito.saveFavorito(this.aviso.id, this.user, this.aviso.detalle.fecha, this.aviso.detalle.nombre, this.aviso.detalle.fotos[0]);
            if (!mensajeFavorito.exitoso) {
              this.activoFavorito = false;
              this.corazonestado = 'inactive';
            }
          } else {
            this.activoFavorito = false;
            this.corazonestado = 'inactive';
            const mensajeFavorito = await this.srvFavorito.deleteFavorito(this.aviso.id, this.user);
            if (!mensajeFavorito.exitoso) {
              this.activoFavorito = true;
              this.corazonestado = 'active';
            }
          }
          this.pushBotonFavoritos = false;
        }
      } else  {
          const alert = await this.alrControl.create({
            header: 'Información',
            subHeader: 'Solo los usuarios registrados pueden marcar favoritos',
            // tslint:disable-next-line:max-line-length
            message: '¿deseas ir al area de acceso?',
            buttons: [
              {
                text: 'No, Gracias'
              }, {
                text: 'Accesar',
                handler: () => {
                  this.router.navigate(['/acceso']);
                }
              }
            ],
            cssClass: 'alertCustomCss' //
          });
          await alert.present();
      }

}

}
