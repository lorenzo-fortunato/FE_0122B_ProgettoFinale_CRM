import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Fatture } from 'src/app/models/fatture';
import { ActivatedRoute, Router } from '@angular/router';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit {
  fatture!: Array<Fatture>;
  idCliente!: number;
  page!: number;
  pageSize!: number;
  response: any;

  constructor(
    private generalSrv: GeneralService,
    private fattureSrv: FattureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.generalSrv.getFatture().subscribe((res) => {
      this.fatture = res.content;
      console.log(this.fatture);

      this.route.params.subscribe((params) => {
        this.idCliente = +params['id'];
        console.log(this.idCliente);
        this.Carica();
      });
    });
  }

  Carica() {
    if (this.idCliente) {
      this.fattureSrv.GetByCliente(this.idCliente, 0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fattureSrv.GetAll(0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }

  CambiaPagina(p: number) {
    if (this.idCliente) {
      this.fattureSrv.GetByCliente(this.idCliente, p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fattureSrv.GetAll(p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  confirmDelete(name: number, id: number, i: number) {
    if (
      confirm('Sei sicuro di voler eliminare la fattura numero ' + name + ' ?')
    ) {
      console.log('Implement delete functionality here');
      this.fattureSrv.Delete(id).subscribe((c) => {
        console.log(c);
        this.fatture.splice(i, 1);
      });
    }
  }
}
