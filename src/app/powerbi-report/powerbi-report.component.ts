import {
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import * as pbi from 'powerbi-client';
import * as _ from 'lodash';
//import {IEmbedConfiguration} from "embed";
import {Report, IEmbedConfiguration, models, Page} from 'powerbi-client';
import {IReportLoadConfiguration, ISaveAsParameters, ISlicerFilter} from 'powerbi-models';
import {IReportNoegletal} from "./report";
import {ReportService} from "./report.service";
import {Observable, Subscription} from "rxjs";
import {IEmbedConfigurationBase} from "embed";
import {IEmbedConfigBase} from "../embed";
import {promise} from "selenium-webdriver";
import {ICustomEvent} from "service";
import {GemRapportComponent} from "../gem-rapport/gem-rapport.component";
import {
    ButtonComponent,
    ContentComponent, DIALOG_PARAMETERS, DialogRef, DialogService, DropDownComponent,
    HeadingComponent,
    LabelComponent, NotificationService,
    PanelComponent, SplitButtonComponent,
    TextBoxComponent
} from "@radzen/angular";
import {SendRapportComponent} from "../send-rapport/send-rapport.component";
import {SletRapportComponent} from "../slet-rapport/slet-rapport.component";
import {TestyComponent} from "../testy/testy.component";

import {ActivatedRoute, Router} from "@angular/router";

//import { PanelComponent } from '@radzen/angular/dist/panel';
import {HtmlComponent} from '@radzen/angular/dist/html';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
    selector: 'app-powerbi-report',
    templateUrl: './powerbi-report.component.html',
    //styleUrls: ['./Forespoergelse.component.css']
})
export class PowerbiReportComponent implements OnInit, OnChanges {
    private systemReport: string;

    constructor(private reportService: ReportService, private injector: Injector) {
    }

    hideDetail = true;
    detailLoaded = false;
    totalRendered = false;
    report: IReportNoegletal;
    errorMessage: string;


    //@Output() reportOut: EventEmitter<IReport> = new EventEmitter<IReport>();
    //@Input() NytReportName: string; // Nyt navn der skal gemmes Kommer fra Gem report
    //@Input() VisReportName: string; // Kommer fra DropDown over Reporter
    //@Input() reportId: string;      // Kommer fra DropDown over Reporter der er to parametere i urlen ved visning af raport.
    @Input() model: string; // Embed powerbi model

    @ViewChild('content1') content1: ContentComponent;
    @ViewChild('pageTitle') pageTitle: HeadingComponent;
    @ViewChild('panel0') panel0: PanelComponent;
    @ViewChild('labelGemNavn') labelGemNavn: LabelComponent;
    @ViewChild('textboxGemReport') textboxGemReport: TextBoxComponent;
    @ViewChild('buttonGem') buttonGem: ButtonComponent;
    @ViewChild('button0') button0: ButtonComponent;
    @ViewChild('dropdownVaelgReport') dropdownVaelgReport: DropDownComponent;

    @ViewChild('dropdown0') dropdown0: DropDownComponent;
    @ViewChild('buttonSend') buttonSend: ButtonComponent;
    @ViewChild('buttonSlet') buttonSlet: ButtonComponent;
    @ViewChild('SplitbuttonViewEdit') splitbuttonViewEdit: SplitButtonComponent;
    @ViewChild('html0') html0: HtmlComponent;

    selectedFilterData: any[];

    router: Router;

    cd: ChangeDetectorRef;

    route: ActivatedRoute;

    notificationService: NotificationService;

    dialogService: DialogService;

    dialogRef: DialogRef;

    _location: Location;

    _subscription: Subscription;


    types: any;

    userReports: any;

    reportStage: any;

    parameters: any;

    VisningsModeReport: string;

    NytReportName: string;

    VisReportName: string;

    reportId: string; // sættes i dropdownVaelgReport ved valg af personlig report.

    SplitVisEditer: any;

    showSpinner: boolean;

    paramsSub: any;

    ngOnInit() {

        this.showSpinner = true;

        this.notificationService = this.injector.get(NotificationService);

        this.dialogService = this.injector.get(DialogService);

        this.dialogRef = this.injector.get(DialogRef, null);

        this.router = this.injector.get(Router);

        this.cd = this.injector.get(ChangeDetectorRef);

        //this._location = this.injector.get(Location);

        this.route = this.injector.get(ActivatedRoute);


        // window.onresize = function(e) {
        //     console.log(e);
        //     onResize(e);
        // }
        //window.onresize = onResize(e);


    }


    reportControl() {
        // if (this.NytReportName != undefined) // && this.NyReportname != this.report.reportName)  // så opret ny retort med nu id og nyt navn
        // {
        //     this.GemNyReport();
        // }

        // else if (this.VisReportName != undefined && this.reportId != undefined) {
        //     this.showReportTotal();  // Vis valgte report fra DropDownlist over reporter.
        // }
        // else {
        this.showReportTotal();
        // }
        if (this.SplitVisEditer != undefined && this.SplitVisEditer === 'Fuldscreen') {
            PowerbiReportComponent.enterFullscreen();
        }
    }

    ngAfterViewInit() {

        // this._subscription = this.route.params.subscribe(parameters => {
        //     if (this.dialogRef) {
        //         this.parameters = this.injector.get(DIALOG_PARAMETERS);
        //     } else {
        //         this.parameters = parameters;
        //     }
        //     this.load();
        //     this.cd.detectChanges();
        // });
        this.load();
        //this.reportControl();
        this.cd.detectChanges();
    }


    ngOnDestroy() {
        //this._subscription.unsubscribe();
    }

    load() {
        // load user reports:
        this.getUserReports(this.model);


        // this.types = [{
        //     text: 'Medlemsbestand',
        //     reportId: '3ba998a8-e111-4c16-a8bb-f44887dbc7c3'
        // },
        //     {
        //         text: 'Medlemsbestand Bookmark',
        //         reportId: '92745961-1a93-478e-b259-c3ff4385ffad'
        //     }];

        this.reportStage = [{
            text: 'Editer',
            value: 'EditMode'
        },
            {
                text: 'Vis',
                value: 'ShowMode'
            },
            {
                text: 'Fullscreen',
                value: 'Fullscreen'
            }
        ];

        // this.Height = 900; //window.innerHeight - 130;
        //
        // this.Width = 1850;

        this.Height = window.innerHeight - 260;//this.containerEl.nativeElement.clientHeight > 850 ? 850 : this.containerEl.nativeElement.clientHeight;
        //this.Width = reportContainerTotal.clientWidth - 20;
        this.Width = window.innerWidth - 280;

        //this.reportControl();
    }

    btnBackClick(event: any) {
        let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        reportContainerTotal.style.display = reportContainerTotal.style.display == "none" ? "block" : "none";
        reportContainerDetail.style.display = reportContainerDetail.style.display == "none" ? "block" : "none";
        this.hideDetail = !this.hideDetail;
    }

    // event til modtagelse af model indparameter
    ngOnChanges() {
        this.reportControl();
    }

    async setReportFilter() {
        // Get a reference to the embedded report HTML element
        const data = JSON.parse(localStorage.getItem('filters'));
        let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let reportPbi = powerbi.get(reportContainerDetail) as Report;
        let reportFilters: models.IFilter[];
        reportFilters = await reportPbi.getFilters();
        if (_.isEqual(data, reportFilters)) {
            return;
        }
        reportPbi.setFilters(data)
            .then(function () {
                console.log("Report filter was set.");
            })
            .catch(function (errors) {
                console.log(errors);
            });
    }


    private powerbiTotal: any;
    showReportTotal() {
        let erReportVist = localStorage.getItem('cagi');
        //if(erReportVist != undefined)
        if(this.powerbiTotal === undefined) {
        //if(erReportVist === null) {
            const that: PowerbiReportComponent = this;
            this.showSpinner = true;
            let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
            let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
            reportContainerTotal.style.display = "block";
            reportContainerDetail.style.display = "none";
            this.systemReport = this.model + "Totaler";
            this.reportService.getEmbedConfigTotal(this.model).subscribe(
                (token: any) => {

                    let config: IEmbedConfiguration;
                    let viewModeSet = PowerbiReportComponent.switchMode(this.SplitVisEditer);

                    this.reportId = token.id;

                    config = {
                        type: 'report',
                        tokenType: models.TokenType.Embed,
                        accessToken: token.embedToken.token,
                        embedUrl: token.embedUrl,
                        id: token.id,
                        permissions: models.Permissions.All,
                        viewMode: viewModeSet, //models.ViewMode.Edit,
                        settings: {
                            filterPaneEnabled: true,
                            navContentPaneEnabled: true,
                            useCustomSaveAsDialog: true
                        }
                    };

                    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

                    powerbi.reset(reportContainerTotal);

                    this.powerbiTotal = powerbi.load(reportContainerTotal, config) as Report;


                    //localStorage.setItem('cagi', 'true');
                    localStorage.setItem('cagi', JSON.stringify(this.powerbiTotal));
                    //this.reportOut.emit(this.report);

                    this.powerbiTotal.off('loaded');
                    this.powerbiTotal.on('loaded', () => {
                        console.log('Report loaded');
                        this.powerbiTotal.render(config as IReportLoadConfiguration);
                        const newSettings = {
                            extensions: [
                                {
                                    command: {
                                        name: "extension command",
                                        title: "Detaljeadgang",
                                        extend: {
                                            visualContextMenu: {
                                                title: "Detaljeadgang",
                                            }
                                        }
                                    }
                                }
                            ]
                        };

                        this.powerbiTotal.updateSettings(newSettings)
                            .catch(function (error) {
                                alert(error);
                            });

                        this.powerbiTotal.on("dataSelected", (event: CustomEvent) => {
                            if (event.detail.visual.type === "slicer") {
                                return;
                            }
                            console.log("Event - dataSelected:");
                            let filterList = [];
                            event.detail.dataPoints.forEach(function (source) {
                                //byg filter for selected data
                                source.identity.forEach(function (item) {
                                    filterList.push({
                                        $schema: "http://powerbi.com/product/schema#basic",
                                        target: {
                                            table: item.target.table,
                                            column: item.target.column
                                        },
                                        filterType: 1,
                                        operator: "In",
                                        values: [item.equals]
                                    });
                                });
                            });
                            if (filterList.length === 0) {
                                that.selectedFilterData = [];
                            } else {
                                that.selectedFilterData = filterList;
                            }
                            console.log(JSON.stringify(that.selectedFilterData));
                        });

                        this.powerbiTotal.on("commandTriggered", async function (event: CustomEvent) {
                            let reportFilters: models.IFilter[];
                            let filters = [];
                            let pages: Page[];
                            pages = await this.powerbiTotal.getPages();

                            let activePage = pages.find(function (page) {
                                return page.isActive;
                            });

                            let visuals = await activePage.getVisuals();

                            // Retrieve the wanted visual.
                            const visual = visuals.find(function (visual) {
                                return visual.name === event.detail.visual.name;
                            });


                            let slicerFilters = [];
                            visuals.forEach(async function (vis) {
                                let ee = "sds";
                                // Get the slicer state which contains the slicer filter.
                                if (vis.type == "slicer") {
                                    let slicerState = await vis.getSlicerState();
                                    let slicerFilter = slicerState.filters as any;
                                    if (slicerFilter.operator !== 'All') {
                                        slicerFilters = slicerFilters.concat(slicerFilter);
                                    }
                                }

                            });

                            let visualFilters = await visual.getFilters();
                            let pageFilters = await activePage.getFilters();
                            reportFilters = await this.powerbiTotal.getFilters();

                            let visualFilterNotAll = [];
                            visualFilters.forEach(function (fil: any) {
                                let ee = "sds";
                                if (fil.operator !== 'All') {
                                    visualFilterNotAll = visualFilterNotAll.concat(fil);
                                }
                            });
                            filters = filters.concat(visualFilterNotAll);
                            filters = filters.concat(pageFilters);
                            filters = filters.concat(reportFilters);
                            filters = filters.concat(slicerFilters);
                            filters = filters.concat(that.selectedFilterData);
                            localStorage.clear();
                            localStorage.setItem('filters', JSON.stringify(filters));

                            if (this.selectedReport) {
                                await that.showReportDetailRepValg();
                            } else {
                                await that.showReportDetail();
                            }

                        });

                    });

                    this.powerbiTotal.off('rendered');
                    this.powerbiTotal.on('rendered', () => {
                        this.totalRendered = true;
                        this.hideDetail = true;
                        console.log('Report rendered');

                    });
                    this.powerbiTotal.off('saved');
                    this.powerbiTotal.on("saved", (event: any) => {
                        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                        let reportPbi = powerbi.get(reportContainerTotal) as Report;
                        //this.reportOut.emit(this.report);


                        // @ts-ignore
                        let report = {
                            ReportId: "",
                            ReportName: event.detail.reportName,
                            ShortDescription: "",
                            Type: "Embed",
                            ExternalId: event.detail.reportObjectId,
                            WebUrl: "",
                            Parent: this.model,
                            ShowUpdate: false,
                            Updated: "",
                            RouteUrl: "",
                            Dataset: "",
                            GroupId: reportPbi.config.groupId,
                            RegTid: "",
                            RegInit: "",
                            LongDescription: "",
                            System: "",
                            ReportOwner: ""
                        } as IReportNoegletal;

                        this.reportService.saveReport(this.systemReport, report).subscribe(() => {
                                console.log("asasa");
                                this.getUserReports(this.model);
                            },
                            (error: any) => {
                                this.errorMessage = <any>error
                            })
                    });

                    this.setiframeBorderNone();
                    this.showSpinner = false;
                },
                (error: any) => {
                    this.errorMessage = <any>error
                }
            )
        }
    }

    async gemNyReport(nyRepName: string) {
        let powerBi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

        let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        let reportPbi = powerBi.get(reportContainerTotal) as Report;

        const saveAsParameters = {
            name: nyRepName
        };
        reportPbi.saveAs(saveAsParameters);

    }

    showSelectedReportTotal(reportId: any) {
        let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        reportContainerTotal.style.display = "block";
        reportContainerDetail.style.display = "none";

        this.reportService.getEmbedConfigTotalRepValg(this.model, reportId).subscribe(
            (token: any) => {

                let config: IEmbedConfiguration;
                let viewModeSet = PowerbiReportComponent.switchMode(this.SplitVisEditer);

                config = {
                    type: 'report',
                    tokenType: models.TokenType.Embed,
                    accessToken: token.embedToken.token,
                    embedUrl: token.embedUrl,
                    id: token.id,
                    permissions: models.Permissions.All,
                    viewMode: viewModeSet, //models.ViewMode.Edit,
                    settings: {
                        filterPaneEnabled: true,
                        navContentPaneEnabled: true,
                        useCustomSaveAsDialog: true
                    }
                };

                let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

                powerbi.reset(reportContainerTotal);

                let reportPbi = powerbi.load(reportContainerTotal, config) as Report;
                //this.reportOut.emit(this.report);

                reportPbi.off('loaded');
                reportPbi.on('loaded', () => {
                    console.log('Report loaded');
                    reportPbi.render(config as IReportLoadConfiguration);
                });
                reportPbi.on('loaded', () => {
                    this.setupReportTotal(reportPbi, true);
                });
                reportPbi.off('rendered');
                reportPbi.on('rendered', () => {
                    this.totalRendered = true;
                    this.hideDetail = true;
                    console.log('Report rendered');

                });
                this.setiframeBorderNone();
                this.showSpinner = false;
            },
            (error: any) => {
                this.errorMessage = <any>error
            }
        )
    }

    private powerbiDetail: any;

    async showReportDetail() {
        if(this.powerbiDetail === undefined) {
            let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
            let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
            reportContainerTotal.style.display = "none";
            reportContainerDetail.style.display = "block";
            this.systemReport = this.model + "Medlemmer";
            if (this.detailLoaded) {
                this.hideDetail = false;
                await this.setReportFilter();
                return;
            }

            this.reportService.getEmbedConfigDetail(this.model).subscribe(
                async (token: any) => {

                    let config: IEmbedConfiguration;
                    let viewModeSet = PowerbiReportComponent.switchMode(this.SplitVisEditer);
                    this.reportId = token.id;

                    config = {
                        type: 'report',
                        tokenType: models.TokenType.Embed,
                        accessToken: token.embedToken.token,
                        embedUrl: token.embedUrl,
                        id: token.id,
                        permissions: models.Permissions.All,
                        viewMode: viewModeSet, //models.ViewMode.Edit,
                        settings: {
                            filterPaneEnabled: true,
                            navContentPaneEnabled: true,
                            useCustomSaveAsDialog: true
                        }
                    };

                    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

                    powerbi.reset(reportContainerDetail);

                    this.powerbiDetail = powerbi.load(reportContainerDetail, config) as Report;
                    //this.reportOut.emit(this.report);

                    this.powerbiDetail.off('loaded');
                    this.powerbiDetail.on('loaded', () => {
                        this.setReportFilter();
                        this.detailLoaded = true;
                        console.log('Report loaded');
                        this.powerbiDetail.render(config as IReportLoadConfiguration);


                        this.powerbiDetail.off('rendered');
                        this.powerbiDetail.on('rendered', () => {
                            this.hideDetail = false;

                            console.log('Report rendered');

                        });
                    });


                    this.setiframeBorderNone();
                },
                (error: any) => {
                    this.errorMessage = <any>error
                })
        }
    }


    async showReportDetailRepValg() {
        let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        reportContainerTotal.style.display = "none";
        reportContainerDetail.style.display = "block";
        if (this.detailLoaded) {
            this.hideDetail = false;
            await this.setReportFilter();
            return;
        }

        this.reportService.getEmbedConfigDetailRepValg(this.model, this.reportId).subscribe(
            async (token: any) => {
                let config: IEmbedConfiguration;
                let viewModeSet = PowerbiReportComponent.switchMode(this.SplitVisEditer);

                config = {
                    type: 'report',
                    tokenType: models.TokenType.Embed,
                    accessToken: token.embedToken.token,
                    embedUrl: token.embedUrl,
                    id: token.id,
                    permissions: models.Permissions.All,
                    viewMode: viewModeSet, //models.ViewMode.Edit,
                    settings: {
                        filterPaneEnabled: true,
                        navContentPaneEnabled: true,
                        useCustomSaveAsDialog: true
                    }
                };

                let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

                powerbi.reset(reportContainerDetail);

                let reportPbi = powerbi.load(reportContainerDetail, config) as Report;
                //this.reportOut.emit(this.report);

                reportPbi.off('loaded');
                reportPbi.on('loaded', () => {
                    this.setReportFilter();
                    this.detailLoaded = true;
                    console.log('Report loaded');
                    reportPbi.render(config as IReportLoadConfiguration);

                });
                reportPbi.off('rendered');
                reportPbi.on('rendered', () => {
                    this.hideDetail = false;

                    console.log('Report rendered');

                });


                this.setiframeBorderNone();
            },
            (error: any) => {
                this.errorMessage = <any>error
            })
    }

    setiframeBorderNone() {
        if (window.document.getElementsByTagName("iframe")) {
            // der er kun en iframe
            var iFrameElements = window.document.getElementsByTagName("iframe");
            for (var i = 0; i < iFrameElements.length; i++) {
                iFrameElements[i].frameBorder = "0";
                iFrameElements[i].setAttribute("frameBorder", "0");
            }
        }
    }


    static enterFullscreen() {
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let reportcontaainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');

        let report: Report;
        report = powerbi.get(reportcontaainerTotal) as Report;

        report.fullscreen();
    }


    private viewModeToString(viewMode: models.ViewMode): string {
        let mode: string;
        switch (viewMode) {
            case models.ViewMode.Edit:
                mode = "edit";
                break;
            case models.ViewMode.View:
                mode = "view";
                break;
        }

        return mode;
    }

    static switchMode(viewMode: string): models.ViewMode {
        let newMode: models.ViewMode;
        if (viewMode != undefined && viewMode === 'EditMode') {
            newMode = models.ViewMode.Edit;
        }
        else if (viewMode != undefined && viewMode === 'ShowMode') {
            newMode = models.ViewMode.View;
        }
        else {
            newMode = models.ViewMode.View;
        }
        return newMode;
    }

    setupReportTotal(reportPbi: Report, selectedReport: boolean) {
        const that: PowerbiReportComponent = this;

    }

    dropdownVaelgReportChange(event: any) {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        this.reportId = event.reportId;
        this.showSelectedReportTotal(event.reportId);
    }

    buttonGemClick(event: any) {
        this.dialogService.open(GemRapportComponent, {parameters: {}, width: 400, height: 250, title: 'Gem Report'})
            .afterClosed().subscribe(async result => {
            this.NytReportName = result;
            if (this.NytReportName != undefined && this.NytReportName.trim() != '') {
                await this.gemNyReport(this.NytReportName.trim());
                this.notificationService.notify({severity: "success", summary: `Report Gemt`, detail: ``});
            }
        });
    }

    buttonSendClick(event: any) {
        this.dialogService.open(SendRapportComponent, {
            parameters: {model: this.model},
            width: 600,
            height: 440,
            title: 'Send Rapport'
        });
    }

    buttonSletClick(event: any) {
        this.dialogService.open(SletRapportComponent, {parameters: {}, width: 450, height: 200, title: 'Slet Rapport'});
    }

    SplitbuttonViewEditClick(event: any) {
        if (event != null && event.text != undefined) {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
            this.SplitVisEditer = event.value; //'Fuldscreen'
            //this.reportControl();
            this.switchMode2(event.value);
        }
    }

    Height = 800; // any;
    Width = 1600; //: any;

    onResize(event: any) {
        let reportContainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        //let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        this.Height = window.innerHeight - 260;//this.containerEl.nativeElement.clientHeight > 850 ? 850 : this.containerEl.nativeElement.clientHeight;
        //this.Width = reportContainerTotal.clientWidth - 20;
        this.Width = window.innerWidth - 280;

    }

    getUserReports(parent: string) {
        this.reportService.getUserReports(parent)
            .subscribe(
                (reps: any) => {
                    this.userReports = reps;

                },
                (error: any) => {
                    this.errorMessage = <any>error
                }
            );

    }

    switchMode2(viewMode: string) {
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let reportcontaainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
        let reportContainerDetail = this.detailLoaded ? <HTMLElement>document.getElementById('reportContainerDetail') : undefined;

        let reportTotal: Report;
        let reportDetail: Report;
        reportTotal = powerbi.get(reportcontaainerTotal) as Report;

        reportDetail = this.detailLoaded ? powerbi.get(reportContainerDetail) as Report : undefined;


        if (viewMode != undefined && viewMode === 'EditMode') {
            reportTotal.switchMode("edit");
            reportContainerDetail != undefined ? reportDetail.switchMode("edit") : reportContainerDetail;
        }
        else if (viewMode != undefined && viewMode === 'ShowMode') {
            //newMode = models.ViewMode.View;
            reportTotal.switchMode("view");
            reportContainerDetail != undefined ? reportDetail.switchMode("view") : reportContainerDetail;
        }
        else if (viewMode != undefined && viewMode === 'Fuldscreen') {
            reportTotal.fullscreen();
            //reportContainerDetail != undefined ? reportDetail.fullscreen() : reportContainerDetail;
        }
        else {
            reportTotal.switchMode("view");
            reportContainerDetail != undefined ? reportDetail.switchMode("view") : reportContainerDetail;
        }

    }


}


// GemNyReport() {
//     let accessToken = 'H4sIAAAAAAAEACWWta7FjLWE3-VvHclMkVKYmXG7MzOzo_vu90jpV_XNzJr57z92-g5zWvzz738k4HurPPoWBqSO8GAG3pleiVmoDMs3MTXgqMh-Va-ZlWJkEO4GrRrb2C9XlY4xGqk8jJeA-SDAJAEpRM37LVu0-HyCW9mEgvaknn5ZqLClq-22ImIU5R7jmyZGi0pP13b2LTBBJzRc2sYrQHucZuTVKR4UGmHXU3Y36Q7tiDC6sr59ZN_oIqxzd1Bo6_OQimpTQhnuSeO5p6YQbpOVljLbg92zjCOOYJrHFhNIxHkkiePLRRl9mGZyhVH0yjMUVsimtZbhmaOIgpqTa5Ul6HK5vuhL5SIbOLoaUZec_GTUw9NdoHKWbc4dTtWw4rDNjhNvOixnRizYNUnLeAoJ4oZtdouPDD6QJI_WTpLB1ZYQA7wNIhwdatF0u-8LA33Ty7V2MgBwnZBOy1xpjOiy0KxMEbl5GwvA7QFqvD-iyirIGtF39cfYftaOkqYWLah4TOjFxLMRZhK80OOIJzqd8_FiQggWTpPw0pfZEaH0xNxDykfcF-gOE4ItDHpQEapC4kS7CUisjAB4gcT-fLtWE-wgQdMy_izVRip3M5wvej-T0ZV49hSeBtrHr7d8g7Aidpvq8Le0ZnTAFT8v2aVFZJEPnUJR1rGRcBSGQZcm_50F0lDtibV73Krat2XQVsgEA0Xcck79wRB1tWob7r4YbJZPj9cmelh_oh3hHE0afSbxPiVPzr2Ig4QpiXIfQPCFXGoSFkVjv3fzNQYEkrkiAnVsPeAx4v0kUTLcQ5WmdzrM_rwwO3-ReI8kwWJKqXHeLi5aYW5gnQRrYf7FVoMkPn_YllPlep4zyxV0yG-UGkHjqMDFUO7RABmxzCZjfxQl2LX8qpzOlX-cm1_upRPsaGwNICV4Id3zTuLAhueVddjZKYFYQoaEBWIMeAtBdxm1ejEPXn3Q2YVD_zSkRSeOBC_SqwD-0IihEDni21rX4pZ5lAGwrsXNOQrHA-zhINnpFt1lJRgwlA7tU0DUuMVe3F6ufDU4HLfZ14t15AKC8Rsm5Xj35cK3YX5aeOz17T12_Ms64mc-iow-wZpJctqck-qCeEWUWWAwKJE3VRFLO8PcLa9pncdy00zqdJt_Z3DDTffbTHoBM9iPMRDsgyAjxi0qWJ82jUyNQp0O0htU2Re2ZtNwoNGDL3oNaxnWMFGYiRaFCl1WOY6bsOuurdQFZtCfvRJDnLUR4ydx-xBbevvWkbftcOMVgXC6hQEvxcTQ771Co19_TJ1J1yEjefkNaXn_9Ea0a5Br-B970ckdQPm2ewH9EkbF1_XaWYUSSOdV1Kc4S2C0k3zvtVBq4u2WKYhIjEqelc8aJLE72UoY72xl5EPGdJL9M0_KefjLHEupk4-a4t5Y0BSTqGjoc7lXLUBZV_svpg2Cpucvhzti8bvMQh8UNm68yGGdyd-S0l0JgGXWPp4uEMIzaBIWW7KKQ6S4jZI76Sjl6Rqvr91nRJRvkVlfjSZqR40odAMf4lARVksa6QMK-ehnW-99iCfg5_ilpy2FYJo8hhH5loG8Z-YNcsLq32t1tf7PMNg831D1HDRFfHnTexVE0fKhCUTfkq8dnpHSNUg7i4Il3YXpa4ucJASdMeecOj2_C12LmW1HEcvQNlUmkk-1J_GWLhXb6PZTVyhsvirGtUijmGywnDIo3EFl70ZqNmGXrm5fK2-RFvVWAVVZGB8VTrhz2kk_GqD2M6ZJORaUHV30e7XAavhdTDiukQi77dP24NkQ_cIqTrLd9JfTG0oXm1lke8sJSwvw66hE3SBk_dhvsCDNSA3BnBtCuU_7w3-3TqTIUjdu-5cbP5uLaj8fa5UTqhSxoiDsNQ4cTdUuzmNJtrEFiYV0llWqW5PR1gldMoFB0GvL541gyB0o1fR-N7aKZxdZ1ahSSSvAXa2QEkpOX4PAB7oaw2BC_HOIAhTHJbTSQTXju7CY70btdDE2zEgBlPfXPrBxtoregNqEAbkJOiXAU4AeDkVOlZycPUf4askoAoIpylBi96nO51QVbmG7vob9RbUb5r5ULU5fmaLeLAzMerBSdulIQYwgswtSexhi-r4R_7BakoqAIC-iwnDa7e0HXR96AtnPi4x5XiLGMCspOUjpd03889ssfJqpL0tS6mar17lWsMIYyyN-yoC9-9LBKAtOq2x9Xv2f__zzr3-47V2OWSvfv5nhKxdVvbfCSkskORxj-q3bhRKDPtNylTgekEzoaCku_yzgreGpk-j7TdRxkE9qEcJuyk2uyAzZ0EMMCnjGU7QDntnxXUnQE-oWMiZRleN8r-PNl7pc4AsirzwNQAYF_wpalM0hNUeoB24sKJqOeaa6fNJGMt8Ua3L2m6QHia1Hrk2naabpUy42a9sz5-KOCBiTqYPd06Jg2AQHeT8XzCN-nJd9yv5qt9t-J-F5gQKShJYk44XlGO5mJ3uPagDM3X4f3djXxANAa-7K0_W-duMOxqcKr_TzzFAYIMRfWdW6qcXqCdnjUQp0PuL8GHSYqPDq2AHVWJ8oInn_2gT5Pg0cReZ_mN-lKTcl_KNsXagf9kVQA3-G6HN5whsX_J8YXltP6XFu5d-ZMIffVFAE08KuEUgScptQUvOan_NdncNNw53QcNNikFB35LyLdh5Y3ZHPR6AES3XqOqTBElTmzFJ1QFc4kS0kqf64Rphs3by_HrvH3Qe0buQ1C5lWFGE8gvzkDOGs3id71iJxWMB4T67wtoL5yCeTJVViANuyjjSX29i3y10fidSUTo-COLjdgacJTBY_ox2BUo1Lx_oA8P3L09sVGkj3L5k5Mr4tyT1b-LdRLYZegNRWLZY3C9cC4G2nk9_szz0MQrhYKUet59Gwtu6AHGZAgSY0t3fT2o51MpUe7V0XKGfoQ4XyY7AfIi8-yKmiVguSk3HvE4v-uWmTftNjt1R7h84f5v_7f9TulK9aCwAA';
//     let embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=f754129e-03ba-4129-ace4-e8c16658c39f&groupId=cfe705c8-04ac-49ef-8f76-2888b8624e48&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9';
//     let embedReportId = 'f754129e-03ba-4129-ace4-e8c16658c39f';//'f6bfd646-b718-44dc-a378-b73e6b528204';
//
//     let config: IEmbedConfiguration;
//
//     config = {
//         type: 'report',
//         tokenType: models.TokenType.Embed,
//         accessToken: accessToken,
//         embedUrl: embedUrl,
//         id: embedReportId,
//         permissions: models.Permissions.All,
//         viewMode: models.ViewMode.Edit,
//         settings: {
//             filterPaneEnabled: true,
//             navContentPaneEnabled: true,
//             useCustomSaveAsDialog: true
//         }
//     };
//     let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
//     let reportcontaainerTotal = <HTMLElement>document.getElementById('reportContainerTotal');
//     powerbi.reset(reportcontaainerTotal);
//     let reportPbi: Report;
//     reportPbi = powerbi.load(reportcontaainerTotal, config) as Report;
//
//     this.report = {
//         dataSet: "00000000-0000-0000-0000-000000000000", // muligvis forkert
//         externalId: embedReportId, // muligvis forkert
//         groupId: embedReportId, // muligvis forkert
//         parent: "",
//         regInit: "",
//         regTid: new Date(),
//         reportId: embedReportId,
//         reportName: this.NytReportName,
//         routeUrl: "",
//         shortDescription: "",
//         showUpdate: false,
//         tab1: "",
//         tab2: "",
//         type: "",
//         updated: new Date(),
//         webUrl: embedUrl,
//     };
//
//     //this.reportOut.emit(this.report);
//     reportPbi.off("saveAsTriggered");
//
//     var saveAsParameters = {
//         name: this.NytReportName
//     };
//
//     reportPbi.on('save9d', function (event) {
//         console.log(event);
//     });
//
//     reportPbi.on("saveAsTriggered", function (event) {
//         console.log(event);
//         let newReportId = reportPbi.getId();
//         this.this.saveReport(reportPbi, newReportId);
//     });
//
//     reportPbi.saveAs(saveAsParameters);
//
//     reportPbi.off('loaded');
//     reportPbi.on('loaded', () => {
//         console.log('Report loaded');
//         reportPbi.render(config as IReportLoadConfiguration);
//     });
//
//     reportPbi.off('rendered');
//     reportPbi.on('rendered', () => {
//         console.log('Report rendered');
//     });
// }


//
// // SaveAs report
//         report.saveAs(saveAsParameters);

// let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
// reportContainerTotal.style.display = "none";
// reportContainerDetail.style.display = "block";

/*
        this.reportService.getEmbedConfigDetailRepValg(this.model, this.reportId).subscribe(
            async (token: any) => {
                let config: IEmbedConfiguration;
                let viewModeSet = PowerbiReportComponent.switchMode(this.SplitVisEditer);

                config = {
                    type: 'report',
                    tokenType: models.TokenType.Embed,
                    accessToken: token.embedToken.token,
                    embedUrl: token.embedUrl,
                    id: token.id,
                    permissions: models.Permissions.All,
                    viewMode: viewModeSet, //models.ViewMode.Edit,
                    settings: {
                        filterPaneEnabled: true,
                        navContentPaneEnabled: true,
                        useCustomSaveAsDialog: true
                    }
                };

                let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

                powerbi.reset(reportContainerTotal);

                let reportPbi = powerbi.load(reportContainerTotal,  config) as Report;
                //this.reportOut.emit(this.report);

                this.report = {
                    dataSet: "00000000-0000-0000-0000-000000000000", // muligvis forkert
                    externalId: '', // muligvis forkert
                    groupId: token.groupId, // muligvis forkert
                    parent: "",
                    regInit: "",
                    regTid: new Date(),
                    reportId: token.id,
                    reportName: nytReportName,
                    routeUrl: "",
                    shortDescription: "",
                    showUpdate: false,
                    tab1: "",
                    tab2: "",
                    type: "",
                    updated: new Date(),
                    webUrl: token.embedUrl,
                };

                //this.reportOut.emit(this.report);
                reportPbi.off("saveAsTriggered");

                var saveAsParameters = {
                    name: nytReportName
                };

                reportPbi.on('saved', function (event) {
                    console.log(event);
                });

                reportPbi.on("saveAsTriggered", function (event) {
                    console.log(event);
                    let newReportId = reportPbi.getId();
                    this.saveReport(reportPbi, newReportId);
                });

                reportPbi.saveAs(saveAsParameters);

                reportPbi.off('loaded');
                reportPbi.on('loaded', () => {
                    console.log('Report loaded');
                    reportPbi.render(config as IReportLoadConfiguration);
                });

                // reportPbi.off('rendered');
                // reportPbi.on('rendered', () => {
                //     console.log('Report rendered');
                // });
                //
                //
                // this.setiframeBorderNone();
            },
            (error: any) => {
                this.errorMessage = <any>error
            })*/
//}
/*saveReport(report: IReport, newReportId: string): void {
    report.shortDescription = "";//this.reportCustomSaveAsParameters.Description;
    let oldReportId = report.reportId;
    report.reportId = newReportId;
    this.reportService.saveReport('2', report) // privat report
        .subscribe(() => {
                if (oldReportId != newReportId) {
                    // notifier skal komme her
                }
            },
            (error: any) => {
                this.errorMessage = <any>error
            });
}

deleteAndRefreshReport(repId: string) {
    this.reportService.deleteReport(repId)
        .subscribe(
            () => {
                console.log('report deleted');
                // this.refresh(); // Efter sletning så refresh visningen
            },
            (error: any) => {
                this.errorMessage = <any>error
            }
        );
}

setupReportTotal(reportPbi: Report, selectedReport: boolean) {
    const that: PowerbiReportComponent = this;
    const newSettings = {
        extensions: [
            {
                command: {
                    name: "extension command",
                    title: "Detaljeadgang",
                    extend: {
                        visualContextMenu: {
                            title: "Detaljeadgang",
                        }
                    }
                }
            }
        ]
    };
    reportPbi.updateSettings(newSettings)
        .catch(function (error) {
            alert(error);
        });
    reportPbi.off("dataSelected");
    reportPbi.off("saveAsTriggered");

    reportPbi.on("saveAsTriggered", function (event) {
        console.log(event);
    });

    reportPbi.on('saved', function (event) {
        console.log(event);
    });
    reportPbi.on("dataSelected", (event: CustomEvent) => {
        if (event.detail.visual.type === "slicer") {
            return;
        }
        console.log("Event - dataSelected:");
        let filterList = [];
        event.detail.dataPoints.forEach(function (source) {
            //byg filter for selected data
            source.identity.forEach(function (item) {
                filterList.push({
                    $schema: "http://powerbi.com/product/schema#basic",
                    target: {
                        table: item.target.table,
                        column: item.target.column
                    },
                    filterType: 1,
                    operator: "In",
                    values: [item.equals]
                });
            });
        });
        if (filterList.length === 0) {
            that.selectedFilterData = [];
        } else {
            that.selectedFilterData = filterList;
        }
        console.log(JSON.stringify(that.selectedFilterData));
    });

    reportPbi.on("commandTriggered", async function (event: CustomEvent) {
        let reportFilters: models.IFilter[];
        let filters = [];
        let pages: Page[];
        pages = await reportPbi.getPages();

        let activePage = pages.find(function (page) {
            return page.isActive;
        });

        let visuals = await activePage.getVisuals();

        // Retrieve the wanted visual.
        const visual = visuals.find(function (visual) {
            return visual.name === event.detail.visual.name;
        });


        let slicerFilters = [];
        visuals.forEach(async function (vis) {
            let ee = "sds";
            // Get the slicer state which contains the slicer filter.
            if (vis.type == "slicer") {
                let slicerState = await vis.getSlicerState();
                let slicerFilter = slicerState.filters as any;
                if (slicerFilter.operator !== 'All') {
                    slicerFilters = slicerFilters.concat(slicerFilter);
                }
            }

        });

        let visualFilters = await visual.getFilters();
        let pageFilters = await activePage.getFilters();
        reportFilters = await reportPbi.getFilters();

        let visualFilterNotAll = [];
        visualFilters.forEach(function (fil: any) {
            let ee = "sds";
            if (fil.operator !== 'All') {
                visualFilterNotAll = visualFilterNotAll.concat(fil);
            }
        });
        filters = filters.concat(visualFilterNotAll);
        filters = filters.concat(pageFilters);
        filters = filters.concat(reportFilters);
        filters = filters.concat(slicerFilters);
        filters = filters.concat(that.selectedFilterData);

        localStorage.clear();
        localStorage.setItem('filters', JSON.stringify(filters));

        if(selectedReport) {
            await that.showReportDetailRepValg();
        }
        else {
            await that.showReportDetail();
        }

    });
}

dropdown0Change(event: any) {
    if (event != null && event.text != undefined) {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        // this.VisningsModeReport = event.value;
        //this.router.navigate(['forespoergelse', event.text, event.value, event.value]);
        event.stopPropagation();
    }*/
// }




