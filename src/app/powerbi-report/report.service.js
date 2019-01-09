var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
// import {environment} from '../../environments/environment';
var ReportService = (function () {
    function ReportService(http, router, ngZone) {
        this.http = http;
        this.router = router;
        this.ngZone = ngZone;
        this.baseUrl = 'http://localhost:8753/api/reports';
    }
    // getReports(): Observable<IReport[]> {
    // Henter alle reporter
    ReportService.prototype.getReports = function () {
        var _this = this;
        return this.http.get(this.baseUrl, { withCredentials: true })
            .map(function (data) { return (data.data || data); })
            .do(function (data) { return console.log('getReports: ' + JSON.stringify(data)); })
            .do(function (data) { return _this.reports = data; })
            .catch(this.handleError);
    };
    ReportService.prototype.getReportsfromFolder = function (folderType) {
        var _this = this;
        var url = this.baseUrl + '/GlobAfdPersonReports' + "/" + folderType;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReports: ' + JSON.stringify(data)); })
            .do(function (data) { return _this.reports = data; })
            .catch(this.handleError);
    };
    // 18/12
    ReportService.prototype.getSsrsReports = function (parent) {
        var _this = this;
        var url = this.baseUrl + '/GetSsrsReports' + "/" + parent;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getSsrsReports: ' + JSON.stringify(data)); })
            .do(function (data) { return _this.reports = data; })
            .catch(this.handleError);
    };
    ReportService.prototype.getReportsFromFolderOfType = function (folderType, reportType) {
        var _this = this;
        var url = this.baseUrl + '/GlobAfdPersonReportsOfTypes' + "/" + folderType + "/" + reportType;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('>>>>> getReportsFromFolderOfType: <<<<<<<<' + JSON.stringify(data)); })
            .do(function (data) { return _this.reports = data; })
            .catch(this.handleError);
    };
    // oprindelige:
    // getEmbedConfigDetail(): Observable<any> {
    //     const url = `${this.baseUrl + '/GetEmbedConfigDetail'}`;
    //     return this.http.get(url, {withCredentials: true})
    //         .map(this.extractData)
    //         .do(    data => console.log('getReport: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }
    ReportService.prototype.getEmbedConfigDetail = function (model) {
        var url = this.baseUrl + '/GetEmbedConfigDetail' + "/" + model;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getEmbedConfigDetailRepValg = function (model, reportid) {
        var url = this.baseUrl + '/GetEmbedConfigDetail' + "/" + model + "/" + reportid;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // oprindelige
    //  getEmbedConfigTotal() {
    //     const url = `${this.baseUrl + '/GetEmbedConfigTotal'}`;
    //     return this.http.get(url, {withCredentials: true})
    //         .map(this.extractData)
    //         .do(    data => console.log('getReport: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }
    ReportService.prototype.getEmbedConfigTotal = function (model) {
        var url = this.baseUrl + '/GetEmbedConfigTotal' + "/" + model;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getEmbedConfigTotal ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getEmbedConfigTotalRepValg = function (model, reportid) {
        var url = this.baseUrl + '/GetEmbedConfigTotal' + "/" + model + "/" + reportid;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getEmbedConfigTotal ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getEmbedToken = function (id) {
        var url = this.baseUrl + '/embed' + "/" + id;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getReport = function (id) {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }
        var url = this.baseUrl + "/" + id;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getUserReports = function (parent) {
        var url = this.baseUrl + '/GetUserReports' + "/" + parent;
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getUserReports ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.getReportplusDoc = function (id, tab) {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }
        var urlrep = this.baseUrl + "/" + id;
        var urlReport = this.http.get(urlrep, { withCredentials: true })
            .map(this.extractData)
            .do(function (data) { return console.log('getReportplusDoc (*Report*): ' + JSON.stringify(data)); })
            .catch(this.handleError);
        var urldo = this.baseUrl + "/docs/" + id + "/" + tab;
        var urlDoc = this.http.get(urldo, { withCredentials: true })
            .map(this.extratText)
            .do(function (data) { return console.log('getReportplusDoc (*Doc*): ' + JSON.stringify(data)); })
            .catch(this.handleError);
        return Observable.forkJoin([urlReport, urlDoc]);
    };
    ReportService.prototype.getReportDoc = function (id, tab) {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }
        var urldo = this.baseUrl + "/docs/" + id + "/" + tab;
        return this.http.get(urldo, { withCredentials: true })
            .map(this.extratText)
            .do(function (data) { return console.log('getReportDoc (*Doc*): ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // movereportfolder/{type}/{repId}
    ReportService.prototype.movereportfolder = function (type, id) {
        var urldo = this.baseUrl + "/movereportfolder/" + type + "/" + id;
        return this.http.get(urldo, { withCredentials: true })
            .map(this.extratText)
            .do(function (data) { return console.log('movereportfolder report: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Erstattes af denne midlertidig:
    // getReport(name: string): Observable<IReport> {
    //     debugger;
    //     const report = this.reports.find(c => c.ReportName === name);
    //     console.log('service getReport : ' + JSON.stringify(report));
    //     return Observable.of(report);
    // }
    ReportService.prototype.deleteReport = function (repottId) {
        var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        var url = this.baseUrl + "/DeleteReport/" + repottId;
        return this.http.delete(url, options)
            .do(function (data) { return console.log('deleteReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.downloadReport = function (repottId) {
        /*let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        let options = new RequestOptions({headers: headers, withCredentials: true});

        const url = `${this.baseUrl}/DeleteReport/${repottId}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteReport: ' + JSON.stringify(data)))
            .catch(this.handleError);*/
        return new Observable();
    };
    // Old udkommenteret 7-3-2018
    // saveReport(report: IReport): Observable<string> {
    //     let headers = new Headers({'Content-Type': 'application/json'});
    //     let options =  new RequestOptions({headers: headers, withCredentials: true});
    //
    //
    //     const url = `${this.baseUrl}/save`;
    //     console.log('kalder savereport');
    //     return this.http.post(url, report, options)
    //         .map(this.extractData)
    //         .do(data => console.log('save report: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }
    ReportService.prototype.saveReport = function (systemReport, report) {
        var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        if (report.ReportName != '' && report.ExternalId != '') {
            return this.createReport(systemReport, report, options);
        }
        else {
            return Observable.throw(JSON.stringify(report) || 'Server error');
        }
        //return this.updateReport(report, options);
    };
    ReportService.prototype.updateReportItem = function (repId, report) {
        var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        if (report.ReportName != '' && report.ReportId != '') {
            return this.updateReport(repId, report, options);
        }
        else {
            return Observable.throw(JSON.stringify(report) || 'Server error');
        }
    };
    // old udkommenteret den 7-3-20118
    /* private createReport(report: IReport, options: RequestOptions): Observable<IReport> {
        report.reportName = undefined;
        return this.http.post(this.baseUrl, report, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }*/
    // type er Globale = 0, Afdeling = 1 eller  Personlige = 2
    ReportService.prototype.createReport = function (systemReport, report, options) {
        var url = this.baseUrl + "/savereport/" + systemReport; //  `$http://localhost:9876/Api/Values`; // til test  type
        // return this.http.post(url, reportFolder, options)  // gammel
        return this.http.post(url, JSON.stringify(report), options) // ny
            .map(function () { return report; })
            .do(function (data) { return console.log('createReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.updateReport = function (repId, report, options) {
        var url = this.baseUrl + "/UpdateReport/" + repId; // UpdateReport/{repId}")]
        return this.http.put(url, JSON.stringify(report), options)
            .map(function () { return report; })
            .do(function (data) { return console.log('updateReport: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ReportService.prototype.extractData = function (response) {
        var body = response.json();
        this.reports = body;
        return body || {};
    };
    ReportService.prototype.extratText = function (response) {
        var body = response.json();
        return body || {};
    };
    ReportService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error.json().error || 'Server error');
        return Observable.throw(error.json().error || 'Server error');
        //return Observable.create(); // throw(error.json().error || 'Server error');
    };
    ReportService.prototype.initializeReport = function () {
        // Return an initialized object
        return {
            ReportId: '',
            ReportName: '',
            ShortDescription: '',
            Type: '',
            ExternalId: '',
            WebUrl: '',
            Parent: '',
            ShowUpdate: false,
            Updated: '',
            RouteUrl: '',
            Dataset: '',
            GroupId: '',
            RegTid: '',
            RegInit: '',
            LongDescription: '',
            System: '',
            ReportOwner: ''
        };
    };
    ReportService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            Router,
            NgZone])
    ], ReportService);
    return ReportService;
}());
export { ReportService };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/powerbi-report/report.service.js.map