import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fatture } from 'src/app/models/fatture';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-fatture-clienti',
  templateUrl: './fatture-clienti.component.html',
  styleUrls: ['./fatture-clienti.component.scss'],
})
export class FattureClientiComponent implements OnInit {
  idCliente!: number;
  page!: number;
  pageSize!: number;
  response: any;
  fatture!: Fatture[];

  constructor(
    private fattureSrv: FattureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCliente = +params['id'];
      console.log(this.idCliente);
      this.Carica();
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
      confirm('Sei sicuro di voler cancellare la fattura numero ' + name + '?')
    ) {
      console.log('Implement delete functionality here');
      this.fattureSrv.Delete(id).subscribe((c) => {
        console.log(c);
        this.fatture.splice(i, 1);
      });
    }
  }
}
