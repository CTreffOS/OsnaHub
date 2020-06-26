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

  async ngOnInit() {
    this.result = await this.trashService.list(7);
  }
}