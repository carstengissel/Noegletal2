import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppImports, AppComponent, AppDeclarations, AppProviders } from './app.module-generated';
import { PowerbiReportComponent } from './powerbi-report/powerbi-report.component';
import {ReportService} from "./powerbi-report/report.service";

@NgModule({
  declarations: [
    ...AppDeclarations,
    PowerbiReportComponent
  ],
  imports: [
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
      HttpModule,
    ...AppImports
  ],
  providers: [
      ReportService,
    ...AppProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
