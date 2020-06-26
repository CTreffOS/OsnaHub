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

  async listDeparturesFromStation(stationId: number, date?: Date): Promise<Array<any>> {
    try {
      const resp = await this.http.get<any>(
        `https://cors-anywhere.herokuapp.com/${environment.baseUrls.bahn}abfahrten/${stationId}?lookahead=250&lookbehind=0`).toPromise();
      return resp.departures;
    } catch (e) {
      throw e;
    }
  }
}
