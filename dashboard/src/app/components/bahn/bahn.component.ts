import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BahnService } from 'src/app/services/bahn.service';

@Component({
  selector: 'osnahub-cp-bahn',
  templateUrl: './bahn.component.html',
  styleUrls: ['./bahn.component.scss']
})
export class BahnComponent implements OnInit {
  displayedColumns: string[] = ['name'];

  stationsForm: FormControl;
  stations: Array<any>;
  departures: Array<any>;

  constructor(private bahnService: BahnService) {
    this.stationsForm = new FormControl();
    this.stations = new Array<any>();
    this.departures = new Array<any>();
  }

  async ngOnInit() {
    this.departures = await this.bahnService.listDeparturesFromStation(8000294);
    console.log(this.departures);
  }

  onSearchChange(value: any) {
    console.log(value);
  }
}
