import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  urlBase = environment.pathApi;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(`${this.urlBase}/api/users`);
  }

  getClienti() {
    return this.http.get<any>(
      `${this.urlBase}/api/clienti?page=0&size=20&sort=id,ASC`
    );
  }

  getFatture() {
    return this.http.get<any>(
      `${this.urlBase}/api/fatture?page=0&size=20&sort=id,ASC`
    );
  }

  GetAll(p: number) {
    console.log('getall');
    return this.http.get<any>(
      this.urlBase + '/api/users?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetAllProvince(p: number) {
    return this.http.get<any>(
      this.urlBase + '/api/province?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetAllComuni(p: number) {
    return this.http.get<any>(
      this.urlBase + '/api/comuni?page=' + p + '&size=20&sort=id,ASC'
    );
  }
}
