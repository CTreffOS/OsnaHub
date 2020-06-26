import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { MastodonService } from 'src/app/services/mastodon.service';


@Component({
  selector: 'osnahub-cp-ris',
  templateUrl: './ris.component.html',
  styleUrls: ['./ris.component.scss']
})
export class RisComponent implements OnInit {
  COLOR_PALETTE = ['#ed9828', '#a4661b', '#b0abae', '#352525'];

  decisions: Array<any>;
  decisionsIndexActive: number;

  loading = false;

  constructor(private mastodonService: MastodonService) {
    this.decisions = new Array<any>();
    this.decisionsIndexActive = -1;
  }

  async ngOnInit() {
    this.loading = true;

    // list "toots" posted by RIS decisions bot
    try {
      const statuses = await this.mastodonService.listStatusesFromAccount(environment.mastodonAccounts.risDecisions);

      statuses.forEach(status => {
        status.content = status.content.replace(/<[^>]*>?/gm, '');

        // split HTML tags from content
        if (status.thread) {
          status.thread.content = status.thread.content.replace(/<[^>]*>?/gm, '');
        }
      });

      this.decisions = statuses;

      if (this.decisions.length > 0) {
        this.decisionsIndexActive = 0;
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Paginate to next decision toot
   */
  nextDecision() {
    this.decisionsIndexActive = this.decisionsIndexActive + 1 === this.decisions.length ?
    this.decisionsIndexActive : this.decisionsIndexActive + 1;

    while (this.decisionsIndexActive < this.decisions.length
      && !this.decisions[this.decisionsIndexActive].in_reply_to_id
    ) {
      this.nextDecision();
    }
  }

  /**
   * Paginate to last decision toot
   */
  previousDecision() {
    this.decisionsIndexActive = this.decisionsIndexActive - 1 < 0 ?
      this.decisionsIndexActive : this.decisionsIndexActive - 1;

    while (this.decisionsIndexActive > -1
      && !this.decisions[this.decisionsIndexActive].in_reply_to_id
    ) {
      this.previousDecision();
    }
  }
}
