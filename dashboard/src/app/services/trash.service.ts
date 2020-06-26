import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  constructor(private http: HttpClient) { }

  /**
   * List garbage disposal dates based on given area
   *
   * @param areaId ID of the area to get
   */
  async list(areaId: number): Promise<any> {
    try {
      const resp = await this.http.get<any>(`https://cors-anywhere.herokuapp.com/${environment.baseUrls.trash}?bezirk=${areaId}`, {
        responseType: 'text' as 'json'
      }).toPromise();
      return this.parse(resp);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Parse a text from .ics
   *
   * @param text Parse .ics calendar text
   */
  private parse(text: string) {
    const lines = text.split('\n');
    let restmuell = false;
    let bio = false;

    // flags, if trash category has been found in parsing process to prevent overriding with newer dates
    const trashInfo = {
      restmuell: {
        date: undefined
      },
      bio: {
        date: undefined
      }
    };

    let trashDate: string;
    for (let line = 0; line < lines.length && (!restmuell || !bio); line++) {
      // check for start date -> actual disposal date
      if (lines[line].startsWith('DTSTART;VALUE=DATE:')) {
        trashDate = lines[line].split(':')[1];
      }
      // check for trash disposal category
      if (lines[line].startsWith('CATEGORIES')) {
        const category = lines[line].split(':')[1].trim();

        if ((category === 'Restmüll' || category === 'Altpapier') && !restmuell) {
          trashInfo.restmuell.date = trashDate;
          restmuell = true;
        } else if ((category === 'Biomüll' || category === 'Gelber Sack') && !bio) {
          trashInfo.bio.date = trashDate;
          bio = true;
        }
      }
    }

    return trashInfo;
  }
}
