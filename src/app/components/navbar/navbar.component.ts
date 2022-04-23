import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogged!: boolean;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('user') != null;
  }

  logout() {
    return this.authSrv.logout();
  }

  utenteLoggato(): boolean {
    return localStorage.getItem('user') != null;
  }
}
