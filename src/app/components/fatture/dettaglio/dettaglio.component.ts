import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Fatture } from 'src/app/models/fatture';
import { FattureService } from 'src/app/services/fatture.service';
import { StatoFattura } from 'src/app/models/stato-fattura';

@Component({
  selector: 'app-dettaglio-fatture',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss'],
})
export class DettaglioComponent implements OnInit {
  id!: number;
  idCliente!: number;
  form!: FormGroup;
  fattura!: Fatture;
  statoFatture!: StatoFattura[];
  constructor(
    private fb: FormBuilder,
    private fattureService: FattureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  cSalva(DatiForm: {
    value: {
      data: string;
      numero: number;
      anno: number;
      importo: number;
      stato: number;
    };
  }) {
    console.log(0);
    console.log(DatiForm.value);
    if (!this.id) {
      this.id = 0;
      this.fattura = {
        id: 0,
        numero: 0,
        anno: 0,
        data: '',
        importo: 0,
        stato: { id: 0, nome: '' },
        cliente: {},
      };
    }
    this.fattura.id = this.id;
    this.fattura.data = DatiForm.value.data;
    this.fattura.numero = DatiForm.value.numero;
    this.fattura.anno = DatiForm.value.anno;
    this.fattura.importo = DatiForm.value.importo;
    this.fattura.stato.id = DatiForm.value.stato;
    if (this.idCliente) {
      this.fattura.cliente.id = this.idCliente;
    }

    this.fattureService.Save(this.id, this.fattura).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/fatture']);
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.idCliente = +params['idCliente'];
      console.log(this.id);
      this.InizializzaForm();
      this.Carica();
    });
    this.CaricaStatoFatture();
  }

  InizializzaForm() {
    console.log('InizializzaForm');
    this.form = this.fb.group({
      data: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      anno: new FormControl('', [Validators.required]),
      importo: new FormControl('', [Validators.required]),
      stato: new FormControl(''),
    });
  }

  Carica() {
    if (this.id !== 0) {
      this.fattureService.GetById(this.id).subscribe((data) => {
        console.log(data);
        this.fattura = data;
        this.fattura.data = this.fattura.data.substr(0, 10);
        this.form.patchValue({
          data: this.fattura.data,
          numero: this.fattura.numero,
          anno: this.fattura.anno,
          importo: this.fattura.importo,
        });
      });
    }
  }

  CaricaStatoFatture() {
    this.fattureService.GetAllStato(0).subscribe((data) => {
      this.statoFatture = data.content;
    });
  }
}
