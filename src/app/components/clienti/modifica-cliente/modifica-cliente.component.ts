import { Component, OnInit } from '@angular/core';
import { ClientiService } from 'src/app/services/clienti.service';
import { GeneralService } from 'src/app/services/general.service';
import { Clienti } from 'src/app/models/clienti';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comune } from 'src/app/models/comuni';
import { Provincia } from 'src/app/models/provincia';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss'],
})
export class ModificaClienteComponent implements OnInit {
  cliente!: Clienti;
  form!: FormGroup;
  id!: number;
  province!: Provincia[];
  comuni!: Comune[];
  tipiclienti!: any[];

  constructor(
    private clientiSrv: ClientiService,
    private generalSrv: GeneralService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.InizializzaForm();
    });
    this.InizializzaForm();
    this.Carica();
  }

  InizializzaForm() {
    this.form = this.fb.group({
      ragioneSociale: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tipoCliente: new FormControl('', [Validators.required]),
      pec: new FormControl(''),
      telefono: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      emailContatto: new FormControl('', [Validators.required]),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl('', Validators.required),
          nome: '',
          provincia: {},
        }),
      }),
    });
  }

  Carica() {
    if (this.id !== 0) {
      this.clientiSrv.GetById(this.id).subscribe((data) => {
        console.log(data);
        this.cliente = data;
        this.form.patchValue({
          ragioneSociale: this.cliente.ragioneSociale,
          partitaIva: this.cliente.partitaIva,
          email: this.cliente.email,
          tipoCliente: this.cliente.tipoCliente,
          pec: this.cliente.pec,
          telefono: this.cliente.telefono,
          nomeContatto: this.cliente.nomeContatto,
          cognomeContatto: this.cliente.cognomeContatto,
          telefonoContatto: this.cliente.telefonoContatto,
          emailContatto: this.cliente.emailContatto,
          indirizzoSedeOperativa: {
            via: this.cliente.indirizzoSedeOperativa.via,
            civico: this.cliente.indirizzoSedeOperativa.civico,
            cap: this.cliente.indirizzoSedeOperativa.cap,
            localita: this.cliente.indirizzoSedeOperativa.localita,
          },
        });
      });
    }
    this.generalSrv
      .GetAllProvince(0)
      .subscribe((res) => (this.province = res.content));
    this.generalSrv
      .GetAllComuni(0)
      .subscribe((res) => (this.comuni = res.content));
    this.clientiSrv
      .GetTipiClienti()
      .subscribe((res) => (this.tipiclienti = res));
  }
}
