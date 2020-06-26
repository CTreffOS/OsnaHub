import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { MastodonService } from 'src/app/services/mastodon.service';

@Component({
  selector: 'osnahub-cp-ris',
  templateUrl: './ris.component.html',
  styleUrls: ['./ris.component.scss']
})
export class RisComponent implements OnInit {
  decisions: Array<any>;
  decisionsIndexActive: number;

  constructor(private mastodonService: MastodonService) {
    this.decisions = new Array<any>();
    this.decisionsIndexActive = -1;
  }

  async ngOnInit() {
    const statuses = await this.mastodonService.listStatusesFromAccount(environment.mastodonAccounts.risDecisions);

    statuses.forEach(status => {
      status.content = status.content.replace(/<[^>]*>?/gm, '');

      if (status.thread) {
        status.thread.content = status.thread.content.replace(/<[^>]*>?/gm, '');
      }
    });

    this.decisions = statuses;

    if (this.decisions.length > 0) {
      this.decisionsIndexActive = 0;
    }
    console.log(statuses);
  }

  nextDecision() {
    this.decisionsIndexActive = this.decisionsIndexActive + 1 === this.decisions.length ?
      this.decisionsIndexActive : this.decisionsIndexActive + 1;
  }

  previousDecision() {
    this.decisionsIndexActive = this.decisionsIndexActive - 1 < 0 ?
      this.decisionsIndexActive : this.decisionsIndexActive - 1;
  }
}
