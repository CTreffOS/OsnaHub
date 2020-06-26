import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { BahnService } from 'src/app/services/bahn.service';

@Component({
  selector: 'osnahub-cp-bahn',
  templateUrl: './bahn.component.html',
  styleUrls: ['./bahn.component.scss']
})
export class BahnComponent implements OnInit {
  displayedColumns: string[] = ['trainName', 'destination', 'time', 'scheduledTime', 'track'];

  departures: Array<any>;
  departuresDataSource: MatTableDataSource<any>;
  departureInput: string;
  departureInputTimeout: any;
  departureStation: string;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private bahnService: BahnService) {
    this.departures = new Array<{ trainName: string, destination: string, route: Array<any>, time?: string, scheduledTime?: string, track?: string }>();
    this.departuresDataSource = new MatTableDataSource<any>();
  }

  async ngOnInit() {}

  /**
   * Listen for input change events in search input
   *
   * @param value New search value
   */
  onSearchChange(value: any) {
    clearTimeout(this.departureInputTimeout);

    this.departureInput = value;

    // wait for API calls until there is no input for 2 seconds
    this.departureInputTimeout = setTimeout(async () => {
      try {
        // first search stations by name and use best guess (first position)
        const stations = await this.bahnService.listStations(this.departureInput);
        if (stations && stations.length > 0) {
          this.departureStation = stations[0].title;

          // get the depatures from the retrieved station
          const resp = await this.bahnService.listDeparturesFromStation(Number(stations[0].id));
          resp.forEach(result => {
            let resTime;
            let resScheduledTime;
            if (result.departure) {
              resTime = new Date(result.departure.time);
              resScheduledTime = new Date(result.departure.scheduledTime);
            }

            // push formatted depature for displaying
            this.departures.push({
              trainName: result.train.name,
              destination: result.destination,
              route: result.route,
              time: resTime ?
                `${this.pad(resTime.getUTCHours())}:${this.pad(resTime.getUTCMinutes())}` : undefined,
              scheduledTime: resScheduledTime ?
                `${this.pad(resScheduledTime.getUTCHours())}:${this.pad(resScheduledTime.getUTCMinutes())}` : undefined,
              track: result.departure ? result.departure.platform : undefined
            });
          });
          this.departuresDataSource.data = this.departures;
        }
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  }

  /**
   * Helper function for zero-padding
   *
   * @param value Value to pad
   */
  private pad(value: number) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
  }
}
