import { Component, OnInit } from '@angular/core';
import { TrashService } from 'src/app/services/trash.service';

@Component({
  selector: 'osnahub-cp-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  result: object;

  constructor(private trashService: TrashService) { }

  async ngOnInit() {}

  /**
   * Get all trash disposal dates in area
   *
   * @param $event Event to get area ID entered by user
   */
  async getTrashForArea($event: any) {
    this.result = await this.trashService.list(Number($event.value));
  }
}
