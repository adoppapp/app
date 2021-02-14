import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app/app.service';
@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.page.html',
  styleUrls: ['./wellcome.page.scss'],
})
export class WellcomePage implements OnInit {

  constructor(public srvApp: AppService, private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    console.log("inicialicion ionic");
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}
