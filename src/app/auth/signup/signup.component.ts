import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  form!: NgForm;

  nuovoUtente = {
    username: '',
    password: '',
    email: '',
    role: [''],
  };

  constructor(private authSrv: AuthService, private router: Router) {}
  ngOnInit(): void {}
  async onsubmit(form: NgForm) {
    this.nuovoUtente.username = form.value.name;
    this.nuovoUtente.password = form.value.password;
    this.nuovoUtente.email = form.value.email;
    this.nuovoUtente.role.splice(0, 1);
    this.nuovoUtente.role.push(form.value.ruolo);

    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.registration(this.nuovoUtente).toPromise();
      this.router.navigate(['/login']);
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      alert('Attenzione! Utente già registrato');
      form.reset();
      this.isLoading = false;
    }
  }
}
