/*
  This file is automatically generated. Any changes will be overwritten.
  Modify app.module.ts instead.
*/
import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BodyModule } from '@radzen/angular/dist/body';
import { CardModule } from '@radzen/angular/dist/card';
import { ContentContainerModule } from '@radzen/angular/dist/content-container';
import { HeaderModule } from '@radzen/angular/dist/header';
import { SidebarToggleModule } from '@radzen/angular/dist/sidebar-toggle';
import { LabelModule } from '@radzen/angular/dist/label';
import { SidebarModule } from '@radzen/angular/dist/sidebar';
import { PanelMenuModule } from '@radzen/angular/dist/panelmenu';
import { ContentModule } from '@radzen/angular/dist/content';
import { HeadingModule } from '@radzen/angular/dist/heading';
import { GridModule } from '@radzen/angular/dist/grid';
import { FormModule } from '@radzen/angular/dist/form';
import { ButtonModule } from '@radzen/angular/dist/button';
import { HtmlModule } from '@radzen/angular/dist/html';
import { PanelModule } from '@radzen/angular/dist/panel';
import { TextBoxModule } from '@radzen/angular/dist/textbox';
import { AutoCompleteModule } from '@radzen/angular/dist/autocomplete';
import { ListBoxModule } from '@radzen/angular/dist/listbox';
import { TextAreaModule } from '@radzen/angular/dist/textarea';
import { AccordionModule } from '@radzen/angular/dist/accordion';
import { DropDownModule } from '@radzen/angular/dist/dropdown';
import { PickListModule } from '@radzen/angular/dist/picklist';
import { LinkModule } from '@radzen/angular/dist/link';
import { SplitButtonModule } from '@radzen/angular/dist/splitbutton';
import { TabsModule } from '@radzen/angular/dist/tabs';
import { DataListModule } from '@radzen/angular/dist/datalist';
import { SharedModule } from '@radzen/angular/dist/shared';
import { NotificationModule } from '@radzen/angular/dist/notification';
import { DialogModule } from '@radzen/angular/dist/dialog';
import { ConfigService, configServiceFactory } from './config.service';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { CacheInterceptor } from './cache.interceptor';
export { AppComponent } from './app.component';
import { RepportKategorierComponent } from './repport-kategorier/repport-kategorier.component';
import { AddRepCategoryComponent } from './add-rep-category/add-rep-category.component';
import { EditRepCategoryComponent } from './edit-rep-category/edit-rep-category.component';
import { RepCategoryItemsComponent } from './rep-category-items/rep-category-items.component';
import { AddRepCategoryItemComponent } from './add-rep-category-item/add-rep-category-item.component';
import { EditRepCategoryItemComponent } from './edit-rep-category-item/edit-rep-category-item.component';
import { RepParamsComponent } from './rep-params/rep-params.component';
import { AddRepParamComponent } from './add-rep-param/add-rep-param.component';
import { EditRepParamComponent } from './edit-rep-param/edit-rep-param.component';
import { RepSourcesComponent } from './rep-sources/rep-sources.component';
import { AddRepSourceComponent } from './add-rep-source/add-rep-source.component';
import { EditRepSourceComponent } from './edit-rep-source/edit-rep-source.component';
import { RepporterComponent } from './repporter/repporter.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ForespoergelseComponent } from './forespoergelse/forespoergelse.component';
import { GemRapportComponent } from './gem-rapport/gem-rapport.component';
import { GemSomComponent } from './gem-som/gem-som.component';
import { SendComponent } from './send/send.component';
import { TestSideComponent } from './test-side/test-side.component';
import { SendRapportComponent } from './send-rapport/send-rapport.component';
import { ForsideComponent } from './forside/forside.component';
import { DummyComponent } from './dummy/dummy.component';
import { ForsideCardsComponent } from './forside-cards/forside-cards.component';
import { ForespoergelseSsrsComponent } from './forespoergelse-ssrs/forespoergelse-ssrs.component';
import { ReportSsrsComponent } from './report-ssrs/report-ssrs.component';
import { ReportsComponent } from './reports/reports.component';
import { TestyComponent } from './testy/testy.component';
import { SletRapportComponent } from './slet-rapport/slet-rapport.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NoegleTalService } from './noegle-tal.service';
import { NoegletalRestApiService } from './noegletal-rest-api.service';
export var PageDeclarations = [
    RepportKategorierComponent,
    AddRepCategoryComponent,
    EditRepCategoryComponent,
    RepCategoryItemsComponent,
    AddRepCategoryItemComponent,
    EditRepCategoryItemComponent,
    RepParamsComponent,
    AddRepParamComponent,
    EditRepParamComponent,
    RepSourcesComponent,
    AddRepSourceComponent,
    EditRepSourceComponent,
    RepporterComponent,
    AddReportComponent,
    EditReportComponent,
    ForespoergelseComponent,
    GemRapportComponent,
    GemSomComponent,
    SendComponent,
    TestSideComponent,
    SendRapportComponent,
    ForsideComponent,
    DummyComponent,
    ForsideCardsComponent,
    ForespoergelseSsrsComponent,
    ReportSsrsComponent,
    ReportsComponent,
    TestyComponent,
    SletRapportComponent,
];
export var LayoutDeclarations = [
    LoginLayoutComponent,
    MainLayoutComponent,
];
export var AppDeclarations = PageDeclarations.concat(LayoutDeclarations, [
    AppComponent
]);
export var AppProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CacheInterceptor,
        multi: true
    },
    NoegleTalService,
    NoegletalRestApiService,
    ConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [ConfigService],
        multi: true
    }
];
export var AppImports = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BodyModule,
    CardModule,
    ContentContainerModule,
    HeaderModule,
    SidebarToggleModule,
    LabelModule,
    SidebarModule,
    PanelMenuModule,
    ContentModule,
    HeadingModule,
    GridModule,
    FormModule,
    ButtonModule,
    HtmlModule,
    PanelModule,
    TextBoxModule,
    AutoCompleteModule,
    ListBoxModule,
    TextAreaModule,
    AccordionModule,
    DropDownModule,
    PickListModule,
    LinkModule,
    SplitButtonModule,
    TabsModule,
    DataListModule,
    SharedModule,
    NotificationModule,
    DialogModule,
    AppRoutes
];
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/app.module-generated.js.map