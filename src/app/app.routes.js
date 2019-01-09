import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
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
export var routes = [
    { path: '', redirectTo: '/forside-cards', pathMatch: 'full' },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'repport-kategorier',
                component: RepportKategorierComponent
            },
            {
                path: 'add-rep-category',
                component: AddRepCategoryComponent
            },
            {
                path: 'edit-rep-category/:RepCategoryId',
                component: EditRepCategoryComponent
            },
            {
                path: 'rep-category-items',
                component: RepCategoryItemsComponent
            },
            {
                path: 'add-rep-category-item/:RepCategoryId',
                component: AddRepCategoryItemComponent
            },
            {
                path: 'edit-rep-category-item/:RepCategoryItemId',
                component: EditRepCategoryItemComponent
            },
            {
                path: 'rep-params',
                component: RepParamsComponent
            },
            {
                path: 'add-rep-param',
                component: AddRepParamComponent
            },
            {
                path: 'edit-rep-param/:ParamId',
                component: EditRepParamComponent
            },
            {
                path: 'rep-sources',
                component: RepSourcesComponent
            },
            {
                path: 'add-rep-source',
                component: AddRepSourceComponent
            },
            {
                path: 'edit-rep-source/:RepSourceId',
                component: EditRepSourceComponent
            },
            {
                path: 'repporter',
                component: RepporterComponent
            },
            {
                path: 'add-report',
                component: AddReportComponent
            },
            {
                path: 'edit-report/:RepID',
                component: EditReportComponent
            },
            {
                path: 'forespoergelse',
                component: ForespoergelseComponent
            },
            {
                path: 'gem-rapport',
                component: GemRapportComponent
            },
            {
                path: 'gem-som',
                component: GemSomComponent
            },
            {
                path: 'send',
                component: SendComponent
            },
            {
                path: 'test-side',
                component: TestSideComponent
            },
            {
                path: 'send-rapport',
                component: SendRapportComponent
            },
            {
                path: 'forside',
                component: ForsideComponent
            },
            {
                path: 'dummy',
                component: DummyComponent
            },
            {
                path: 'forside-cards',
                component: ForsideCardsComponent
            },
            {
                path: 'forespoergelse-ssrs/:model',
                component: ForespoergelseSsrsComponent
            },
            {
                path: 'report-ssrs/:reportId',
                component: ReportSsrsComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
            {
                path: 'testy',
                component: TestyComponent
            },
            {
                path: 'slet-rapport',
                component: SletRapportComponent
            },
        ]
    },
];
export var AppRoutes = RouterModule.forRoot(routes);
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/app.routes.js.map