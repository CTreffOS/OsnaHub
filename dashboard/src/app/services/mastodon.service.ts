import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IPoll } from '../models/IPoll';

@Injectable({
  providedIn: 'root'
})
export class MastodonService {
  constructor(private http: HttpClient) { }

  /**
   * List all statuses from a specific account
   *
   * @param accountId ID of the account to catch statuses from
   */
  async listStatusesFromAccount(accountId: number): Promise<Array<any>> {
    try {
      const statuses = await this.http.get<any>(`${environment.baseUrls.mastodon}accounts/${accountId}/statuses`).toPromise();

      for (const status of statuses) {
        // append whole poll, if ID is defined
        if (status.poll) {
          status.poll = await this.getPoll(status.poll.id);
        }
        // append parent thread, if ID of it is defined
        if (status.in_reply_to_id) {
          status.thread = await this.getStatus(status.in_reply_to_id);
        }
      }
      return statuses;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get a specific status
   *
   * @param statusId ID of status to get
   */
  async getStatus(statusId: string) {
    try {
      const statuses = await this.http.get<any>(`${environment.baseUrls.mastodon}statuses/${statusId}`).toPromise();
      return statuses;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get a specific poll
   *
   * @param id ID of poll to get
   */
  async getPoll(id: number): Promise<any> {
    try {
      const resp = await this.http.get<IPoll>(`${environment.baseUrls.mastodon}polls/${id}`).toPromise();
      return resp;
    } catch (e) {
      throw e;
    }
  }
}
