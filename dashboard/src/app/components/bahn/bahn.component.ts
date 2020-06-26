import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { BahnService } from 'src/app/services/bahn.service';

@Component({
  selector: 'osnahub-cp-bahn',
  templateUrl: './bahn.component.html',
  styleUrls: ['./bahn.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BahnComponent implements OnInit {
  displayedColumns: string[] = ['trainName', 'destination', 'time', 'scheduledTime', 'track'];

  stationsForm: FormControl;
  stations: Array<any>;
  departures: Array<any>;
  departuresDataSource: MatTableDataSource<any>;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private bahnService: BahnService) {
    this.stationsForm = new FormControl();
    this.stations = new Array<any>();
    this.departures = new Array<{ trainName: string, destination: string, route: Array<any>, time?: string, scheduledTime?: string, track?: string }>();
    this.departuresDataSource = new MatTableDataSource<any>();
  }

  async ngOnInit() {
    const resp = await this.bahnService.listDeparturesFromStation(8000294);
    resp.forEach(result => {
      let resTime;
      let resScheduledTime;
      if (result.departure) {
        resTime = new Date(result.departure.time);
        resScheduledTime = new Date(result.departure.scheduledTime);
      }

      this.departures.push({
        trainName: result.train.name,
        destination: result.destination,
        route: result.route,
        time: resTime ? `${resTime.getUTCHours()}:${resTime.getUTCMinutes()}` : undefined,
        scheduledTime: resScheduledTime ? `${resScheduledTime.getUTCHours()}:${resScheduledTime.getUTCMinutes()}` : undefined,
        track: result.departure ? result.departure.platform : undefined
      });
    });
    this.departuresDataSource.data = this.departures;
  }

  onSearchChange(value: any) {
    console.log(value);
  }
}
