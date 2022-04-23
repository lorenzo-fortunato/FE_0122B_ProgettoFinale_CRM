import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlBase = environment.pathApi;
  private authSubj = new BehaviorSubject<null | Auth>(null);
  user$ = this.authSubj.asObservable();
  x!: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { username: string; password: string }) {
    return this.http.post<Auth>(`${this.urlBase}/api/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));

        this.x = true;
      })
    );
  }

  logout() {
    if (this.x) {
      confirm('Sei sicuro di voler uscire?');
      localStorage.removeItem('user');
      this.authSubj.next(null);
      this.router.navigate(['/login']);
      this.x = false;
    }
  }

  registration(data: any) {
    return this.http.post(`${this.urlBase}/api/auth/signup`, data);
  }
}
