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

  /**
   * Load user settings from local storage
   */
  loadSettings() {
    const settingsStr = localStorage.getItem('settings');
    if (settingsStr) {
      this.settings = JSON.parse(settingsStr);
    }
  }

  /**
   * Save user settings in local storage
   */
  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  /**
   * Listen for "drop" events of module cards
   * Used for storing new position of module card
   *
   * @param $event Drop event
   * @param key Module key (e.g. 'bahn')
   */
  drop($event: any, key: string) {
    // https://stackoverflow.com/questions/54185300/angular-material-7-drag-and-drop-x-and-y-coordinates
    const element = $event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    const parentPosition = this.getPosition(element);

    this.settings.modules[key].position.x = (boundingClientRect.x - parentPosition.left);
    this.settings.modules[key].position.y = (boundingClientRect.y - parentPosition.top);

    this.saveSettings();
  }

  /**
   * Get the current screen position of an element
   *
   * @param el Element reference
   */
  private getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }
}
