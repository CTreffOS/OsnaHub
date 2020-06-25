import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BahnService {

  constructor(private http: HttpClient) { }

  async listStations(searchTerm: string) {
    try {
      const resp = await this.http.get<any>(`${environment.baseUrls.bahn}search/${searchTerm}?type=default`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }

  async listDeparturesFromStation(stationId: number, date?: Date) {
    try {
      const resp = await this.http.get<any>(`${environment.baseUrls.bahn}abfahrten/8000294?lookahead=150&lookbehind=0`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }
}
