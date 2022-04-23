import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  urlBase = environment.pathApi;
  form: any;
  utenteMod: any;

  constructor(private http: HttpClient) {}

  caricaComuni() {
    return this.http.get<any>(
      `${this.urlBase}/api/comuni?page=0&size=20&sort=id,ASC`
    );
  }

  caricaProvince() {
    return this.http.get<any>(
      `${this.urlBase}/api/province?page=0&size=20&sort=id,ASC`
    );
  }

  regClienti(data: any) {
    return this.http.post<any>(`${this.urlBase}/api/clienti`, data);
  }

  modClienti(data: number) {
    return this.http.get<any>(`${this.urlBase}/api/clienti/${data}`);
  }

  GetAll(p: number) {
    return this.http.get<any>(
      this.urlBase + '/api/clienti?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetById(ID: number) {
    return this.http.get<any>(this.urlBase + '/api/clienti/' + ID);
  }

  Delete(id: number) {
    return this.http.delete<boolean>(this.urlBase + '/api/clienti/' + id);
  }

  GetTipiClienti() {
    return this.http.get<any>(this.urlBase + '/api/clienti/tipicliente');
  }
}
