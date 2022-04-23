import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  urlBase = environment.pathApi;

  constructor(private http: HttpClient) {}

  cancellaFattura() {
    return this.http.delete(`${this.urlBase}/api/fatture/cliente/3`);
  }

  dettaglio(id: number) {
    return this.http.get<any>(
      `${this.urlBase}/api/fatture/cliente/${id}?page=0&size=20&sort=id,ASC`
    );
  }

  GetByCliente(ID: number, p: number) {
    return this.http.get<any>(
      this.urlBase +
        '/api/fatture/cliente/' +
        ID +
        '?page=' +
        p +
        '&size=20&sort=id,ASC'
    );
  }

  GetAll(p: number) {
    return this.http.get<any>(
      this.urlBase + '/api/fatture?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  Delete(id: number) {
    return this.http.delete<boolean>(this.urlBase + '/api/fatture/' + id);
  }

  GetAllStato(p: number) {
    return this.http.get<any>(
      this.urlBase + '/api/statifattura?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetById(ID: number) {
    return this.http.get<any>(this.urlBase + '/api/fatture/' + ID);
  }

  Save(id: number, item: any) {
    if (id === 0) {
      return this.http.post<any>(this.urlBase + '/api/fatture', item);
    } else {
      return this.http.put<any>(this.urlBase + '/api/fatture/' + id, item);
    }
  }
}
