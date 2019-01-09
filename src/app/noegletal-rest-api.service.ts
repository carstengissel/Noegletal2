import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import * as models from './noegletal-rest-api.model';

@Injectable()
export class NoegletalRestApiService {
  basePath: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.basePath = config.get('noegletalRestApi');
  }

  getUserReports(parent: string | null) {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');

    return this.http.request('get', Location.joinWithSlash(`${this.basePath}`, `Reports/GetUserReports/${encodeURIComponent(parent)}`), {
      observe: 'response',
      headers
    })
    .map(response => {
      switch (response.status) {
        case 200: {
          return response.body;
        }
      }
    })
  }

  getSagsBehandlere() {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');

    return this.http.request('get', Location.joinWithSlash(`${this.basePath}`, `Reports/GetSagsBehandlere`), {
      observe: 'response',
      headers
    })
    .map(response => {
      switch (response.status) {
        case 200: {
          return response.body;
        }
      }
    })
  }
}
