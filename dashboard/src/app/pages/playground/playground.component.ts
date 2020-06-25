import { Component, OnInit } from '@angular/core';

import { MastodonService } from 'src/app/services/mastodon.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  COLOR_PALETTE = ['#99b898', '#feceab', '#ff847c', '#e84a5f'];

  statuses: Array<any>;
  statusesFiltered: Array<any>;

  constructor(private mastodonService: MastodonService) {
    this.statuses = new Array<any>();
    this.statusesFiltered = new Array<any>();
  }

  async ngOnInit() {
    this.statuses = await this.mastodonService.listStatusesFromAccount(744);
    this.statuses.forEach(status => {
      status.content = status.content.replace(/<[^>]*>?/gm, '');
    });
    console.log(this.statuses);
    this.statusesFiltered = this.statuses;
  }

  onSearchChange(value: any) {
    this.statusesFiltered = this.statuses.filter(status => status.content.includes(value));
  }
}
