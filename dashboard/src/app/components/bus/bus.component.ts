import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'osnahub-cp-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class BusComponent implements OnInit {
  displayedColumns: string[] = ['line', 'destination', 'departure', 'delay', 'warning'];
  departures: Array<any>;
  departuresDataSource: MatTableDataSource<any>;
  departureInput: string;
  departureInputTimeout: any;

  constructor(private busService: BusService) {
    this.departures = new Array<{ line: string, destination: string, departure: string, delay: number; warning: string }>();
    this.departuresDataSource = new MatTableDataSource<any>();
    this.departureInput = '';
  }

  async ngOnInit() {}

  /**
   * Listen for input change events in search input
   *
   * @param value New search value
   */
  async onSearchChange(value: string) {
    clearTimeout(this.departureInputTimeout);

    this.departureInput = value;

    // wait for API calls until there is no input for 2 seconds
    this.departureInputTimeout = setTimeout(async () => {
      const resp = await this.busService.listDeparturesFromStation(this.departureInput);
      resp.forEach(result => {
        if (result) {
          this.departures.push({
            line: result[0],
            destination: result[1],
            departure: result[2],
            delay: result[3],
            warning: result[4]
          });
        }
      });
      this.departuresDataSource.data = this.departures;
    }, 2000);
  }
}
