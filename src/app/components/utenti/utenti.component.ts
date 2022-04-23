import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Auth } from 'src/app/models/auth';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss'],
})
export class UtentiComponent implements OnInit {
  page!: number;
  pageSize!: number;
  response: any;
  users!: Array<Auth>;

  constructor(private generalSrv: GeneralService) {}

  ngOnInit() {
    this.Carica();
  }

  Carica() {
    this.generalSrv.GetAll(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.users = c.content;
    });
  }

  CambiaPagina(p: number) {
    this.generalSrv.GetAll(p).subscribe((res) => {
      this.response = res;
      this.users = res.content;
    });
  }

  counter(i: number) {
    return new Array(i);
  }
}
