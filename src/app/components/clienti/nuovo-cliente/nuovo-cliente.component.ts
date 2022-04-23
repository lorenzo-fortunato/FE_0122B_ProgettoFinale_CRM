import { Component, OnInit } from '@angular/core';
import { ClientiService } from 'src/app/services/clienti.service';
import { Clienti } from 'src/app/models/clienti';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Comune } from 'src/app/models/comuni';
import { Provincia } from 'src/app/models/provincia';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.component.html',
  styleUrls: ['./nuovo-cliente.component.scss'],
})
export class NuovoClienteComponent implements OnInit {
  form!: FormGroup;
  user!: Clienti;
  comune!: Comune[];
  comuni!: any;
  provincia!: Provincia[];
  province!: any;

  constructor(
    private generaleSrv: ClientiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.InizializzaForm();
    this.carComuni();
    this.carProvince();
  }

  regCliente() {
    this.user = this.form.value;
    this.generaleSrv.regClienti(this.user).toPromise();
    alert('Nuovo cliente registrato!');
    this.router.navigate(['/clienti']);
    console.log(this.form.value);
  }

  carComuni() {
    this.generaleSrv.caricaComuni().subscribe((res) => {
      this.comune = res.content;
    });
  }

  carProvince() {
    this.generaleSrv.caricaProvince().subscribe((res) => {
      this.provincia = res.content;
    });
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
}
