import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard | OsnaHub';

  modules: object;

  constructor() {
    this.modules = {
      bahn: true,
      weather: false,
      trash: true,
      ris: true
    };
  }
}
