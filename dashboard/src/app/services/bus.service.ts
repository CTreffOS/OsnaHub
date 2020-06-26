import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }

  async listDeparturesFromStation(stationName: string, cols: number): Promise<Array<any>> {
    try {
      const resp = await this.http.get<any>(
        `${environment.baseUrls.bus}departures?station=${stationName}&cols=${cols}`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }
}
