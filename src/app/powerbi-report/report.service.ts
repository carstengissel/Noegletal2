import {Injectable, NgZone} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {IReportNoegletal} from './report';
import {tick} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {errorObject} from 'rxjs/util/errorObject';
import {promise} from "selenium-webdriver";

// import {environment} from '../../environments/environment';

@Injectable()
export class ReportService {
    reports: IReportNoegletal[];


    // private baseUrl = 'http://localhost:8753/api/reports';
    private baseUrl: 'http://localhost:8753/api/reports'; //baseUrl = environment.baseUrl;



    constructor(private http: Http,
                private router: Router,
                private ngZone: NgZone) {

        this.baseUrl = 'http://localhost:8753/api/reports';
    }

    // getReports(): Observable<IReport[]> {
    // Henter alle reporter
    getReports(): Observable<any> {
        return this.http.get(this.baseUrl, {withCredentials: true})
            .map((data: any) => (data.data || data))
            .do(data => console.log('getReports: ' + JSON.stringify(data)))
            .do(data => this.reports = data)
            .catch(this.handleError);
    }

    getReportsfromFolder(folderType: string): Observable<any> {
        const url = `${this.baseUrl + '/GlobAfdPersonReports'}/${folderType}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(data => console.log('getReports: ' + JSON.stringify(data)))
            .do(data => this.reports = data)
            .catch(this.handleError);
    }

    // 18/12
    getSsrsReports(parent: string): Observable<any> {
        const url = `${this.baseUrl + '/GetSsrsReports'}/${parent}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(data => console.log('getSsrsReports: ' + JSON.stringify(data)))
            .do(data => this.reports = data)
            .catch(this.handleError);
    }
    getReportsFromFolderOfType(folderType: string, reportType: string): Observable<any> {
        const url = `${this.baseUrl + '/GlobAfdPersonReportsOfTypes'}/${folderType}/${reportType}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(data => console.log('>>>>> getReportsFromFolderOfType: <<<<<<<<' + JSON.stringify(data)))
            .do(data => this.reports = data)
            .catch(this.handleError);
    }

    // oprindelige:
    // getEmbedConfigDetail(): Observable<any> {
    //     const url = `${this.baseUrl + '/GetEmbedConfigDetail'}`;
    //     return this.http.get(url, {withCredentials: true})
    //         .map(this.extractData)
    //         .do(    data => console.log('getReport: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }
    getEmbedConfigDetail(model: string): Observable<any> {
        const url = `${this.baseUrl + '/GetEmbedConfigDetail'}/${model}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getEmbedConfigDetailRepValg(model: string, reportid: string): Observable<any> {
        const url = `${this.baseUrl + '/GetEmbedConfigDetail'}/${model}/${reportid}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // oprindelige
    //  getEmbedConfigTotal() {
    //     const url = `${this.baseUrl + '/GetEmbedConfigTotal'}`;
    //     return this.http.get(url, {withCredentials: true})
    //         .map(this.extractData)
    //         .do(    data => console.log('getReport: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }
    getEmbedConfigTotal(model: string) {
        const url = `${this.baseUrl + '/GetEmbedConfigTotal'}/${model}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getEmbedConfigTotal ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getEmbedConfigTotalRepValg(model: string, reportid: string) {
        const url = `${this.baseUrl + '/GetEmbedConfigTotal'}/${model}/${reportid}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getEmbedConfigTotal ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmbedToken(id: string): Observable<any> {
        const url = `${this.baseUrl + '/embed'}/${id}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getReport(id: string): Observable<any> {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(data => console.log('getReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUserReports(parent: string): Observable<any> {
        const url = `${this.baseUrl + '/GetUserReports'}/${parent}`;
        return this.http.get(url, {withCredentials: true})
            .map(this.extractData)
            .do(    data => console.log('getUserReports ' + JSON.stringify(data)))
            .catch(this.handleError);
    }




    getReportplusDoc(id: string, tab: number): Observable<any> {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }
        const urlrep = `${this.baseUrl}/${id}`;
        var urlReport = this.http.get(urlrep, {withCredentials: true})
            .map(this.extractData)
            .do(data => console.log('getReportplusDoc (*Report*): ' + JSON.stringify(data)))
            .catch(this.handleError);

        const urldo = `${this.baseUrl}/docs/${id}/${tab}`;
        var urlDoc = this.http.get(urldo, {withCredentials: true})
            .map(this.extratText)
            .do(data => console.log('getReportplusDoc (*Doc*): ' + JSON.stringify(data)))
            .catch(this.handleError, );

        return Observable.forkJoin([urlReport, urlDoc]);
    }

    getReportDoc(id: string, tab: number): Observable<any> {
        if (id === '') {
            return Observable.of(this.initializeReport());
        }

        const urldo = `${this.baseUrl}/docs/${id}/${tab}`;
        return this.http.get(urldo, {withCredentials: true})
            .map(this.extratText)
            .do(data => console.log('getReportDoc (*Doc*): ' + JSON.stringify(data)))
            .catch(this.handleError, );
    }

    // movereportfolder/{type}/{repId}
    movereportfolder(type: string, id: string): Observable<any> {

        const urldo = `${this.baseUrl}/movereportfolder/${type}/${id}`;
        return this.http.get(urldo, {withCredentials: true})
            .map(this.extratText)
            .do(data => console.log('movereportfolder report: ' + JSON.stringify(data)))
            .catch(this.handleError, );
    }

    // Erstattes af denne midlertidig:
    // getReport(name: string): Observable<IReport> {
    //     debugger;
    //     const report = this.reports.find(c => c.ReportName === name);
    //     console.log('service getReport : ' + JSON.stringify(report));
    //     return Observable.of(report);
    // }

    deleteReport(repottId: string): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        let options = new RequestOptions({headers: headers, withCredentials: true});

        const url = `${this.baseUrl}/DeleteReport/${repottId}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    downloadReport(repottId: string): Observable<Response> {
        /*let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        let options = new RequestOptions({headers: headers, withCredentials: true});

        const url = `${this.baseUrl}/DeleteReport/${repottId}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteReport: ' + JSON.stringify(data)))
            .catch(this.handleError);*/
        return new Observable<Response>();
    }

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

    saveReport(systemReport: string, report: IReportNoegletal): Observable<IReportNoegletal> {
        let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        let options = new RequestOptions({headers: headers, withCredentials: true});

        if (report.ReportName != '' && report.ExternalId != '') {
            return this.createReport(systemReport,report, options);
        }
        else {
            return Observable.throw( JSON.stringify(report) || 'Server error');
        }
        //return this.updateReport(report, options);
    }

    updateReportItem(repId: string, report: IReportNoegletal): Observable<IReportNoegletal> {
        let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        headers.append('Accept', 'application/json');
        headers.append('responseType', 'text');
        let options = new RequestOptions({headers: headers, withCredentials: true});

        if (report.ReportName != '' && report.ReportId != '') {
            return this.updateReport(repId, report, options);
        }
        else {
            return Observable.throw( JSON.stringify(report) || 'Server error');
        }
    }

    // old udkommenteret den 7-3-20118
    /* private createReport(report: IReport, options: RequestOptions): Observable<IReport> {
        report.reportName = undefined;
        return this.http.post(this.baseUrl, report, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }*/

    // type er Globale = 0, Afdeling = 1 eller  Personlige = 2
    private createReport(systemReport: string,report: IReportNoegletal, options: RequestOptions): Observable<any> {
        const url = `${this.baseUrl}/savereport/${systemReport}`;  //  `$http://localhost:9876/Api/Values`; // til test  type
        // return this.http.post(url, reportFolder, options)  // gammel
        return this.http.post(url, JSON.stringify(report), options) // ny
            .map(() => report)
            //.map(this.extractData)
            .do(data => console.log('createReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateReport(repId: string, report: IReportNoegletal, options: RequestOptions): Observable<IReportNoegletal> {
        const url = `${this.baseUrl}/UpdateReport/${repId}`; // UpdateReport/{repId}")]
        return this.http.put(url, JSON.stringify(report), options)
            .map(() => report)
            .do(data => console.log('updateReport: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {

        let body = response.json();
        this.reports = body;
        return body || {};
    }

    private extratText(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error.json().error || 'Server error');
        return Observable.throw(error.json().error || 'Server error');
        //return Observable.create(); // throw(error.json().error || 'Server error');
    }

    initializeReport(): IReportNoegletal {
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
            ReportOwner:''
        };
    }


}

