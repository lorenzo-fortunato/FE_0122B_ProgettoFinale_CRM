import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Clienti } from 'src/app/models/clienti';
import { Router } from '@angular/router';
import { ClientiService } from 'src/app/services/clienti.service';

import { FattureService } from 'src/app/services/fatture.service';
import { Fatture } from 'src/app/models/fatture';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
})
export class ClientiComponent implements OnInit {
  clienti!: Array<Clienti>;
  dettagli!: Fatture[];
  response: any;

  constructor(
    private generalSrv: GeneralService,
    private readonly router: Router,
    private clientiSrv: ClientiService,
    private srvFatture: FattureService
  ) {}

  ngOnInit(): void {
    this.generalSrv.getClienti().subscribe((res) => {
      this.clienti = res.content;
      console.log(this.clienti);
    });
    this.Carica();
  }

  Carica() {
    this.clientiSrv.GetAll(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.clienti = c.content;
    });
  }

  nuovoCliente() {
    this.router.navigate(['nuovo-cliente']);
  }

  modificaCliente(x: number) {
    this.clientiSrv.modClienti(x).toPromise();

    this.router.navigate([`modifica-cliente/${x}`]);
  }

  dettaglioFatture(x: number) {
    this.srvFatture.dettaglio(x).subscribe((res) => {
      this.dettagli = res.content;
      console.log(this.dettagli);
    });
  }

  CambiaPagina(p: number) {
    this.clientiSrv.GetAll(p).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.clienti = c.content;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  confirmDelete(name: string, id: number, i: number) {
    if (confirm('Sei sicuro di voler eliminare il cliente ' + name + '?')) {
      console.log('Implement delete functionality here');
      this.clientiSrv.Delete(id).subscribe((c) => {
        console.log(c);
        this.clienti.splice(i, 1);
      });
    }
  }
}
