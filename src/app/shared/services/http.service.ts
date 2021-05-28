import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_URL = '/api';
  constructor(private _http: HttpClient, private uiService: UiService) {}

  private _post(
    method: string,
    module: string,
    command: string,
    payload: Object
  ) {
    this.uiService.setShowProgress(true);
    return new Observable<any>((observer) => {
      this._http
        .post(this.API_URL, { method, module, command, payload })
        .subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
            this.uiService.setShowProgress(false);
          },
          (err) => {
            observer.error(err);
            observer.complete();
            this.uiService.setShowProgress(false);
          }
        );
    });
  }

  post(module: string, command: string, payload: Object) {
    return this._post('post', module, command, payload);
  }

  get(module: string, command: string, payload: Object) {
    return this._post('get', module, command, payload);
  }
}
