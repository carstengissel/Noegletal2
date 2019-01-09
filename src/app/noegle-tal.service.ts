import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ConfigService } from './config.service';
import { ODataClient } from './odata-client';
import * as models from './noegle-tal.model';

@Injectable()
export class NoegleTalService {
  odata: ODataClient;
  basePath: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.basePath = config.get('noegleTal');
    this.odata = new ODataClient(this.http, this.basePath, { legacy: false, withCredentials: true });
  }

  getNoegleTalReports(filter: string | null, top: number | null, skip: number | null, orderby: string | null, count: boolean | null, expand: string | null, format: string | null, select: string | null) {
    return this.odata.get(`/NoegleTalReports`, { filter, top, skip, orderby, count, expand, format, select });
  }

  createNoegleTalReport(noegleTalReport: models.NoegleTalReport | null) {
    return this.odata.post(`/NoegleTalReports`, noegleTalReport);
  }

  deleteNoegleTalReport(reportId: string | null) {
    return this.odata.delete(`/NoegleTalReports(${encodeURIComponent(reportId)})`, item => !(item.ReportId == reportId));
  }

  getNoegleTalReportByReportId(reportId: string | null) {
    return this.odata.get(`/NoegleTalReports(${encodeURIComponent(reportId)})`);
  }

  updateNoegleTalReport(reportId: string | null, noegleTalReport: models.NoegleTalReport | null) {
    return this.odata.patch(`/NoegleTalReports(${encodeURIComponent(reportId)})`, noegleTalReport, item => item.ReportId == reportId);
  }
}
