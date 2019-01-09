var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppImports, AppComponent, AppDeclarations, AppProviders } from './app.module-generated';
import { PowerbiReportComponent } from './powerbi-report/powerbi-report.component';
import { ReportService } from "./powerbi-report/report.service";
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: AppDeclarations.concat([
                PowerbiReportComponent
            ]),
            imports: [
                environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
                HttpModule
            ].concat(AppImports),
            providers: [
                ReportService
            ].concat(AppProviders),
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/app.module.js.map