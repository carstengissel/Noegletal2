var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injector } from '@angular/core';
import { ReportSsrsGenerated } from './report-ssrs-generated.component';
import { ReportService } from "../powerbi-report/report.service";
import { DomSanitizer } from '@angular/platform-browser';
var ReportSsrsComponent = (function (_super) {
    __extends(ReportSsrsComponent, _super);
    function ReportSsrsComponent(injector, reportService, sanitizer) {
        var _this = _super.call(this, injector, reportService, sanitizer) || this;
        if (_this.parameters != undefined) {
            //this.ssrsviewer0.reportName = this.parameters.reportid;
        }
        return _this;
    }
    ReportSsrsComponent = __decorate([
        Component({
            selector: 'page-report-ssrs',
            templateUrl: './report-ssrs.component.html'
        }),
        __metadata("design:paramtypes", [Injector, ReportService, DomSanitizer])
    ], ReportSsrsComponent);
    return ReportSsrsComponent;
}(ReportSsrsGenerated));
export { ReportSsrsComponent };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/report-ssrs/report-ssrs.component.js.map