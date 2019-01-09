var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import { ConfigService } from './config.service';
var NoegletalRestApiService = (function () {
    function NoegletalRestApiService(http, config) {
        this.http = http;
        this.config = config;
        this.basePath = config.get('noegletalRestApi');
    }
    NoegletalRestApiService.prototype.getUserReports = function (parent) {
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.http.request('get', Location.joinWithSlash("" + this.basePath, "Reports/GetUserReports/" + encodeURIComponent(parent)), {
            observe: 'response',
            headers: headers
        })
            .map(function (response) {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        });
    };
    NoegletalRestApiService.prototype.getSagsBehandlere = function () {
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.http.request('get', Location.joinWithSlash("" + this.basePath, "Reports/GetSagsBehandlere"), {
            observe: 'response',
            headers: headers
        })
            .map(function (response) {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        });
    };
    NoegletalRestApiService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, ConfigService])
    ], NoegletalRestApiService);
    return NoegletalRestApiService;
}());
export { NoegletalRestApiService };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/noegletal-rest-api.service.js.map