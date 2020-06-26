import { Component } from '@angular/core';
import { ISettings } from './models/ISettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard | OsnaHub';

  settings: ISettings;

  constructor() {
    // set default settings
    this.settings = {
      modules: {
        ris: {
          active: true,
          position: { x: 0, y: 0 }
        },
        bahn: {
          active: true,
          position: { x: 0, y: 0 }
        },
        trash: {
          active: true,
          position: { x: 0, y: 0 }
        },
        bus: {
          active: true,
          position: { x: 0, y: 0 }
        }
      }
    };

    this.loadSettings();
  }

  loadSettings() {
    const settingsStr = localStorage.getItem('settings');
    if (settingsStr) {
      this.settings = JSON.parse(settingsStr);
    }
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  drop($event: any, key: string) {
    this.settings.modules[key].position.x += $event.distance.x;
    this.settings.modules[key].position.y += $event.distance.y;

    this.saveSettings();
  }
}
