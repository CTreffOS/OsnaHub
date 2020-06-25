import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IPoll } from '../models/IPoll';

@Injectable({
  providedIn: 'root'
})
export class MastodonService {
  filterId = 0;

  constructor(private http: HttpClient) { }

  async listStatusesFromAccount(accountId: number): Promise<Array<any>> {
    try {
      const statuses = await this.http.get<any>(`${environment.baseUrls.mastodon}accounts/${accountId}/statuses`).toPromise();

      for (const status of statuses) {
        if (status.poll) {
          status.poll = await this.getPoll(status.poll.id);
        }
      }
      return statuses;
    } catch (e) {
      throw e;
    }
  }

  async getPoll(id: number): Promise<any> {
    try {
      const resp = await this.http.get<IPoll>(`${environment.baseUrls.mastodon}polls/${id}`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }
}
