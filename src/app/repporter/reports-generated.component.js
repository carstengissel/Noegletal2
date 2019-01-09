var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
  This file is automatically generated. Any changes will be overwritten.
  Modify reports.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';
import { AddReportComponent } from '../add-report/add-report.component';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { NoegleTalService } from '../noegle-tal.service';
import { SecurityService } from '../security.service';
var ReportsGenerated = (function () {
    function ReportsGenerated(injector) {
        this.injector = injector;
    }
    ReportsGenerated.prototype.ngOnInit = function () {
        this.notificationService = this.injector.get(NotificationService);
        this.dialogService = this.injector.get(DialogService);
        this.dialogRef = this.injector.get(DialogRef, null);
        this.router = this.injector.get(Router);
        this.cd = this.injector.get(ChangeDetectorRef);
        this._location = this.injector.get(Location);
        this.route = this.injector.get(ActivatedRoute);
        this.noegleTal = this.injector.get(NoegleTalService);
        this.security = this.injector.get(SecurityService);
    };
    ReportsGenerated.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._subscription = this.route.params.subscribe(function (parameters) {
            if (_this.dialogRef) {
                _this.parameters = _this.injector.get(DIALOG_PARAMETERS);
            }
            else {
                _this.parameters = parameters;
            }
            _this.load();
            _this.cd.detectChanges();
        });
    };
    ReportsGenerated.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ReportsGenerated.prototype.load = function () {
        var _this = this;
        this.noegleTal.getReports(null, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, this.grid0.allowPaging, "RepSource", null, null)
            .subscribe(function (result) {
            _this.getReportsResult = result.value;
            _this.getReportsCount = _this.grid0.allowPaging ? result['@odata.count'] : result.value.length;
        }, function (result) {
        });
    };
    ReportsGenerated.prototype.grid0LoadData = function (event) {
        var _this = this;
        this.noegleTal.getReports("" + event.filter, event.top, event.skip, "" + event.orderby, event.top != null && event.skip != null, "RepSource", null, null)
            .subscribe(function (result) {
            _this.getReportsResult = result.value;
            _this.getReportsCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
        }, function (result) {
        });
    };
    ReportsGenerated.prototype.grid0Delete = function (event) {
        var _this = this;
        this.noegleTal.deleteReport(event.RepID)
            .subscribe(function (result) {
            _this.notificationService.notify({ severity: "success", summary: "Success", detail: "Report deleted!" });
        }, function (result) {
            _this.notificationService.notify({ severity: "error", summary: "Error", detail: "Unable to delete Report" });
        });
    };
    ReportsGenerated.prototype.grid0Add = function (event) {
        this.dialogService.open(AddReportComponent, { parameters: {}, title: 'Add Report' });
    };
    ReportsGenerated.prototype.grid0RowSelect = function (event) {
        this.dialogService.open(EditReportComponent, { parameters: { RepID: event.RepID }, title: 'Edit Report' });
    };
    __decorate([
        ViewChild('content1'),
        __metadata("design:type", ContentComponent)
    ], ReportsGenerated.prototype, "content1", void 0);
    __decorate([
        ViewChild('pageTitle'),
        __metadata("design:type", HeadingComponent)
    ], ReportsGenerated.prototype, "pageTitle", void 0);
    __decorate([
        ViewChild('grid0'),
        __metadata("design:type", GridComponent)
    ], ReportsGenerated.prototype, "grid0", void 0);
    return ReportsGenerated;
}());
export { ReportsGenerated };
//# sourceMappingURL=E:/work/RadNoegletal/Noegletal/client/src/app/reports/reports-generated.component.js.map