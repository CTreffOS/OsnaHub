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
      const resp = await this.http.get<any>(`${environment.baseUrls.bahn}location/${searchTerm}`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }

  async listDeparturesFromStation(stationId: number, date?: Date) {
    try {
      const resp = await this.http.get<any>(`${environment.baseUrls.bahn}departureBoard/${stationId}?date=${
        date ? date : new Date().toISOString()
      }`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }
}
