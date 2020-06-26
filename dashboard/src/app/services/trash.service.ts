import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  constructor(private http: HttpClient) { }

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

  private parse(text: string) {
    const lines = text.split('\n');
    let count = 0;
    let restmuell = false;
    let bio = false;

    const trashInfo = {
      restmuell: {
        date: undefined
      },
      bio: {
        date: undefined
      }
    };
    let trashDate;
    for (let line = 0; line < lines.length; line++) {
      if (lines[line].startsWith('DTSTART;VALUE=DATE:')) {
        trashDate = lines[line].split(':')[1];
      }
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
      console.log(lines[line]);
    }

    return trashInfo;
  }
}
