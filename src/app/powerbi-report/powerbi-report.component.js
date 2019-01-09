var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ChangeDetectorRef, Component, Injector, Input, ViewChild, } from '@angular/core';
import * as pbi from 'powerbi-client';
import * as _ from 'lodash';
//import {IEmbedConfiguration} from "embed";
import { models } from 'powerbi-client';
import { ReportService } from "./report.service";
import { GemRapportComponent } from "../gem-rapport/gem-rapport.component";
import { ButtonComponent, ContentComponent, DialogRef, DialogService, DropDownComponent, HeadingComponent, LabelComponent, NotificationService, PanelComponent, SplitButtonComponent, TextBoxComponent } from "@radzen/angular";
import { SendRapportComponent } from "../send-rapport/send-rapport.component";
import { SletRapportComponent } from "../slet-rapport/slet-rapport.component";
import { ActivatedRoute, Router } from "@angular/router";
//import { PanelComponent } from '@radzen/angular/dist/panel';
import { HtmlComponent } from '@radzen/angular/dist/html';
var PowerbiReportComponent = (function () {
    function PowerbiReportComponent(reportService, injector) {
        this.reportService = reportService;
        this.injector = injector;
        this.hideDetail = true;
        this.detailLoaded = false;
        this.totalRendered = false;
        this.Height = 800; // any;
        this.Width = 1600; //: any;
    }
    PowerbiReportComponent_1 = PowerbiReportComponent;
    PowerbiReportComponent.prototype.ngOnInit = function () {
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
    };
    PowerbiReportComponent.prototype.reportControl = function () {
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
            PowerbiReportComponent_1.enterFullscreen();
        }
    };
    PowerbiReportComponent.prototype.ngAfterViewInit = function () {
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
    };
    PowerbiReportComponent.prototype.ngOnDestroy = function () {
        //this._subscription.unsubscribe();
    };
    PowerbiReportComponent.prototype.load = function () {
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
        this.Height = window.innerHeight - 260; //this.containerEl.nativeElement.clientHeight > 850 ? 850 : this.containerEl.nativeElement.clientHeight;
        //this.Width = reportContainerTotal.clientWidth - 20;
        this.Width = window.innerWidth - 280;
        //this.reportControl();
    };
    PowerbiReportComponent.prototype.btnBackClick = function (event) {
        var reportContainerTotal = document.getElementById('reportContainerTotal');
        var reportContainerDetail = document.getElementById('reportContainerDetail');
        reportContainerTotal.style.display = reportContainerTotal.style.display == "none" ? "block" : "none";
        reportContainerDetail.style.display = reportContainerDetail.style.display == "none" ? "block" : "none";
        this.hideDetail = !this.hideDetail;
    };
    // event til modtagelse af model indparameter
    PowerbiReportComponent.prototype.ngOnChanges = function () {
        this.reportControl();
    };
    PowerbiReportComponent.prototype.setReportFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, reportContainerDetail, powerbi, reportPbi, reportFilters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = JSON.parse(localStorage.getItem('filters'));
                        reportContainerDetail = document.getElementById('reportContainerDetail');
                        powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                        reportPbi = powerbi.get(reportContainerDetail);
                        return [4 /*yield*/, reportPbi.getFilters()];
                    case 1:
                        reportFilters = _a.sent();
                        if (_.isEqual(data, reportFilters)) {
                            return [2 /*return*/];
                        }
                        reportPbi.setFilters(data)
                            .then(function () {
                            console.log("Report filter was set.");
                        })
                            .catch(function (errors) {
                            console.log(errors);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PowerbiReportComponent.prototype.showReportTotal = function () {
        var _this = this;
        var erReportVist = localStorage.getItem('cagi');
        //if(erReportVist != undefined)
        if (this.powerbiTotal === undefined) {
            //if(erReportVist === null) {
            var that_1 = this;
            this.showSpinner = true;
            var reportContainerTotal_1 = document.getElementById('reportContainerTotal');
            var reportContainerDetail = document.getElementById('reportContainerDetail');
            reportContainerTotal_1.style.display = "block";
            reportContainerDetail.style.display = "none";
            this.systemReport = this.model + "Totaler";
            this.reportService.getEmbedConfigTotal(this.model).subscribe(function (token) {
                var config;
                var viewModeSet = PowerbiReportComponent_1.switchMode(_this.SplitVisEditer);
                _this.reportId = token.id;
                config = {
                    type: 'report',
                    tokenType: models.TokenType.Embed,
                    accessToken: token.embedToken.token,
                    embedUrl: token.embedUrl,
                    id: token.id,
                    permissions: models.Permissions.All,
                    viewMode: viewModeSet,
                    settings: {
                        filterPaneEnabled: true,
                        navContentPaneEnabled: true,
                        useCustomSaveAsDialog: true
                    }
                };
                var powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                powerbi.reset(reportContainerTotal_1);
                _this.powerbiTotal = powerbi.load(reportContainerTotal_1, config);
                //localStorage.setItem('cagi', 'true');
                localStorage.setItem('cagi', JSON.stringify(_this.powerbiTotal));
                //this.reportOut.emit(this.report);
                _this.powerbiTotal.off('loaded');
                _this.powerbiTotal.on('loaded', function () {
                    console.log('Report loaded');
                    _this.powerbiTotal.render(config);
                    var newSettings = {
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
                    _this.powerbiTotal.updateSettings(newSettings)
                        .catch(function (error) {
                        alert(error);
                    });
                    _this.powerbiTotal.on("dataSelected", function (event) {
                        if (event.detail.visual.type === "slicer") {
                            return;
                        }
                        console.log("Event - dataSelected:");
                        var filterList = [];
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
                            that_1.selectedFilterData = [];
                        }
                        else {
                            that_1.selectedFilterData = filterList;
                        }
                        console.log(JSON.stringify(that_1.selectedFilterData));
                    });
                    _this.powerbiTotal.on("commandTriggered", function (event) {
                        return __awaiter(this, void 0, void 0, function () {
                            var reportFilters, filters, pages, activePage, visuals, visual, slicerFilters, visualFilters, pageFilters, visualFilterNotAll;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filters = [];
                                        return [4 /*yield*/, this.powerbiTotal.getPages()];
                                    case 1:
                                        pages = _a.sent();
                                        activePage = pages.find(function (page) {
                                            return page.isActive;
                                        });
                                        return [4 /*yield*/, activePage.getVisuals()];
                                    case 2:
                                        visuals = _a.sent();
                                        visual = visuals.find(function (visual) {
                                            return visual.name === event.detail.visual.name;
                                        });
                                        slicerFilters = [];
                                        visuals.forEach(function (vis) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var ee, slicerState, slicerFilter;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            ee = "sds";
                                                            if (!(vis.type == "slicer")) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, vis.getSlicerState()];
                                                        case 1:
                                                            slicerState = _a.sent();
                                                            slicerFilter = slicerState.filters;
                                                            if (slicerFilter.operator !== 'All') {
                                                                slicerFilters = slicerFilters.concat(slicerFilter);
                                                            }
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        });
                                        return [4 /*yield*/, visual.getFilters()];
                                    case 3:
                                        visualFilters = _a.sent();
                                        return [4 /*yield*/, activePage.getFilters()];
                                    case 4:
                                        pageFilters = _a.sent();
                                        return [4 /*yield*/, this.powerbiTotal.getFilters()];
                                    case 5:
                                        reportFilters = _a.sent();
                                        visualFilterNotAll = [];
                                        visualFilters.forEach(function (fil) {
                                            var ee = "sds";
                                            if (fil.operator !== 'All') {
                                                visualFilterNotAll = visualFilterNotAll.concat(fil);
                                            }
                                        });
                                        filters = filters.concat(visualFilterNotAll);
                                        filters = filters.concat(pageFilters);
                                        filters = filters.concat(reportFilters);
                                        filters = filters.concat(slicerFilters);
                                        filters = filters.concat(that_1.selectedFilterData);
                                        localStorage.clear();
                                        localStorage.setItem('filters', JSON.stringify(filters));
                                        if (!this.selectedReport) return [3 /*break*/, 7];
                                        return [4 /*yield*/, that_1.showReportDetailRepValg()];
                                    case 6:
                                        _a.sent();
                                        return [3 /*break*/, 9];
                                    case 7: return [4 /*yield*/, that_1.showReportDetail()];
                                    case 8:
                                        _a.sent();
                                        _a.label = 9;
                                    case 9: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                _this.powerbiTotal.off('rendered');
                _this.powerbiTotal.on('rendered', function () {
                    _this.totalRendered = true;
                    _this.hideDetail = true;
                    console.log('Report rendered');
                });
                _this.powerbiTotal.off('saved');
                _this.powerbiTotal.on("saved", function (event) {
                    var powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                    var reportPbi = powerbi.get(reportContainerTotal_1);
                    //this.reportOut.emit(this.report);
                    // @ts-ignore
                    var report = {
                        ReportId: "",
                        ReportName: event.detail.reportName,
                        ShortDescription: "",
                        Type: "Embed",
                        ExternalId: event.detail.reportObjectId,
                        WebUrl: "",
                        Parent: _this.model,
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
                    };
                    _this.reportService.saveReport(_this.systemReport, report).subscribe(function () {
                        console.log("asasa");
                        _this.getUserReports(_this.model);
                    }, function (error) {
                        _this.errorMessage = error;
                    });
                });
                _this.setiframeBorderNone();
                _this.showSpinner = false;
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    PowerbiReportComponent.prototype.gemNyReport = function (nyRepName) {
        return __awaiter(this, void 0, void 0, function () {
            var powerBi, reportContainerTotal, reportPbi, saveAsParameters;
            return __generator(this, function (_a) {
                powerBi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                reportContainerTotal = document.getElementById('reportContainerTotal');
                reportPbi = powerBi.get(reportContainerTotal);
                saveAsParameters = {
                    name: nyRepName
                };
                reportPbi.saveAs(saveAsParameters);
                return [2 /*return*/];
            });
        });
    };
    PowerbiReportComponent.prototype.showSelectedReportTotal = function (reportId) {
        var _this = this;
        var reportContainerTotal = document.getElementById('reportContainerTotal');
        var reportContainerDetail = document.getElementById('reportContainerDetail');
        reportContainerTotal.style.display = "block";
        reportContainerDetail.style.display = "none";
        this.reportService.getEmbedConfigTotalRepValg(this.model, reportId).subscribe(function (token) {
            var config;
            var viewModeSet = PowerbiReportComponent_1.switchMode(_this.SplitVisEditer);
            config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
                accessToken: token.embedToken.token,
                embedUrl: token.embedUrl,
                id: token.id,
                permissions: models.Permissions.All,
                viewMode: viewModeSet,
                settings: {
                    filterPaneEnabled: true,
                    navContentPaneEnabled: true,
                    useCustomSaveAsDialog: true
                }
            };
            var powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
            powerbi.reset(reportContainerTotal);
            var reportPbi = powerbi.load(reportContainerTotal, config);
            //this.reportOut.emit(this.report);
            reportPbi.off('loaded');
            reportPbi.on('loaded', function () {
                console.log('Report loaded');
                reportPbi.render(config);
            });
            reportPbi.on('loaded', function () {
                _this.setupReportTotal(reportPbi, true);
            });
            reportPbi.off('rendered');
            reportPbi.on('rendered', function () {
                _this.totalRendered = true;
                _this.hideDetail = true;
                console.log('Report rendered');
            });
            _this.setiframeBorderNone();
            _this.showSpinner = false;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    PowerbiReportComponent.prototype.showReportDetail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var reportContainerTotal, reportContainerDetail_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.powerbiDetail === undefined)) return [3 /*break*/, 3];
                        reportContainerTotal = document.getElementById('reportContainerTotal');
                        reportContainerDetail_1 = document.getElementById('reportContainerDetail');
                        reportContainerTotal.style.display = "none";
                        reportContainerDetail_1.style.display = "block";
                        this.systemReport = this.model + "Medlemmer";
                        if (!this.detailLoaded) return [3 /*break*/, 2];
                        this.hideDetail = false;
                        return [4 /*yield*/, this.setReportFilter()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.reportService.getEmbedConfigDetail(this.model).subscribe(function (token) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var config, viewModeSet, powerbi;
                            return __generator(this, function (_a) {
                                viewModeSet = PowerbiReportComponent_1.switchMode(this.SplitVisEditer);
                                this.reportId = token.id;
                                config = {
                                    type: 'report',
                                    tokenType: models.TokenType.Embed,
                                    accessToken: token.embedToken.token,
                                    embedUrl: token.embedUrl,
                                    id: token.id,
                                    permissions: models.Permissions.All,
                                    viewMode: viewModeSet,
                                    settings: {
                                        filterPaneEnabled: true,
                                        navContentPaneEnabled: true,
                                        useCustomSaveAsDialog: true
                                    }
                                };
                                powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                                powerbi.reset(reportContainerDetail_1);
                                this.powerbiDetail = powerbi.load(reportContainerDetail_1, config);
                                //this.reportOut.emit(this.report);
                                this.powerbiDetail.off('loaded');
                                this.powerbiDetail.on('loaded', function () {
                                    _this.setReportFilter();
                                    _this.detailLoaded = true;
                                    console.log('Report loaded');
                                    _this.powerbiDetail.render(config);
                                    _this.powerbiDetail.off('rendered');
                                    _this.powerbiDetail.on('rendered', function () {
                                        _this.hideDetail = false;
                                        console.log('Report rendered');
                                    });
                                });
                                this.setiframeBorderNone();
                                return [2 /*return*/];
                            });
                        }); }, function (error) {
                            _this.errorMessage = error;
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PowerbiReportComponent.prototype.showReportDetailRepValg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var reportContainerTotal, reportContainerDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reportContainerTotal = document.getElementById('reportContainerTotal');
                        reportContainerDetail = document.getElementById('reportContainerDetail');
                        reportContainerTotal.style.display = "none";
                        reportContainerDetail.style.display = "block";
                        if (!this.detailLoaded) return [3 /*break*/, 2];
                        this.hideDetail = false;
                        return [4 /*yield*/, this.setReportFilter()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.reportService.getEmbedConfigDetailRepValg(this.model, this.reportId).subscribe(function (token) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var config, viewModeSet, powerbi, reportPbi;
                            return __generator(this, function (_a) {
                                viewModeSet = PowerbiReportComponent_1.switchMode(this.SplitVisEditer);
                                config = {
                                    type: 'report',
                                    tokenType: models.TokenType.Embed,
                                    accessToken: token.embedToken.token,
                                    embedUrl: token.embedUrl,
                                    id: token.id,
                                    permissions: models.Permissions.All,
                                    viewMode: viewModeSet,
                                    settings: {
                                        filterPaneEnabled: true,
                                        navContentPaneEnabled: true,
                                        useCustomSaveAsDialog: true
                                    }
                                };
                                powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
                                powerbi.reset(reportContainerDetail);
                                reportPbi = powerbi.load(reportContainerDetail, config);
                                //this.reportOut.emit(this.report);
                                reportPbi.off('loaded');
                                reportPbi.on('loaded', function () {
                                    _this.setReportFilter();
                                    _this.detailLoaded = true;
                                    console.log('Report loaded');
                                    reportPbi.render(config);
                                });
                                reportPbi.off('rendered');
                                reportPbi.on('rendered', function () {
                                    _this.hideDetail = false;
                                    console.log('Report rendered');
                                });
                                this.setiframeBorderNone();
                                return [2 /*return*/];
                            });
                        }); }, function (error) {
                            _this.errorMessage = error;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PowerbiReportComponent.prototype.setiframeBorderNone = function () {
        if (window.document.getElementsByTagName("iframe")) {
            // der er kun en iframe
            var iFrameElements = window.document.getElementsByTagName("iframe");
            for (var i = 0; i < iFrameElements.length; i++) {
                iFrameElements[i].frameBorder = "0";
                iFrameElements[i].setAttribute("frameBorder", "0");
            }
        }
    };
    PowerbiReportComponent.enterFullscreen = function () {
        var powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        var reportcontaainerTotal = document.getElementById('reportContainerTotal');
        var report;
        report = powerbi.get(reportcontaainerTotal);
        report.fullscreen();
    };
    PowerbiReportComponent.prototype.viewModeToString = function (viewMode) {
        var mode;
        switch (viewMode) {
            case models.ViewMode.Edit:
                mode = "edit";
                break;
            case models.ViewMode.View:
                mode = "view";
                break;
        }
        return mode;
    };
    PowerbiReportComponent.switchMode = function (viewMode) {
        var newMode;
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
    };
    PowerbiReportComponent.prototype.setupReportTotal = function (reportPbi, selectedReport) {
        var that = this;
    };
    PowerbiReportComponent.prototype.dropdownVaelgReportChange = function (event) {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        this.reportId = event.reportId;
        this.showSelectedReportTotal(event.reportId);
    };
    PowerbiReportComponent.prototype.buttonGemClick = function (event) {
        var _this = this;
        this.dialogService.open(GemRapportComponent, { parameters: {}, width: 400, height: 250, title: 'Gem Report' })
            .afterClosed().subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.NytReportName = result;
                        if (!(this.NytReportName != undefined && this.NytReportName.trim() != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.gemNyReport(this.NytReportName.trim())];
                    case 1:
                        _a.sent();
                        this.notificationService.notify({ severity: "success", summary: "Report Gemt", detail: "" });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    PowerbiReportComponent.prototype.buttonSendClick = function (event) {
        this.dialogService.open(SendRapportComponent, {
            parameters: { model: this.model },
            width: 600,
            height: 440,
            title: 'Send Rapport'
        });
    };
    PowerbiReportComponent.prototype.buttonSletClick = function (event) {
        this.dialogService.open(SletRapportComponent, { parameters: {}, width: 450, height: 200, title: 'Slet Rapport' });
    };
    PowerbiReportComponent.prototype.SplitbuttonViewEditClick = function (event) {
        if (event != null && event.text != undefined) {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
            this.SplitVisEditer = event.value; //'Fuldscreen'
            //this.reportControl();
            this.switchMode2(event.value);
        }
    };
    PowerbiReportComponent.prototype.onResize = function (event) {
        var reportContainerTotal = document.getElementById('reportContainerTotal');
        //let reportContainerDetail = <HTMLElement>document.getElementById('reportContainerDetail');
        this.Height = window.innerHeight - 260; //this.containerEl.nativeElement.clientHeight > 850 ? 850 : this.containerEl.nativeElement.clientHeight;
        //this.Width = reportContainerTotal.clientWidth - 20;
        this.Width = window.innerWidth - 280;
    };
    PowerbiReportComponent.prototype.getUserReports = function (parent) {
        var _this = this;
        this.reportService.getUserReports(parent)
            .subscribe(function (reps) {
            _this.userReports = reps;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    PowerbiReportComponent.prototype.switchMode2 = function (viewMode) {
        var powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        var reportcontaainerTotal = document.getElementById('reportContainerTotal');
        var reportContainerDetail = this.detailLoaded ? document.getElementById('reportContainerDetail') : undefined;
        var reportTotal;
        var reportDetail;
        reportTotal = powerbi.get(reportcontaainerTotal);
        reportDetail = this.detailLoaded ? powerbi.get(reportContainerDetail) : undefined;
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
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PowerbiReportComponent.prototype, "model", void 0);
    __decorate([
        ViewChild('content1'),
        __metadata("design:type", ContentComponent)
    ], PowerbiReportComponent.prototype, "content1", void 0);
    __decorate([
        ViewChild('pageTitle'),
        __metadata("design:type", HeadingComponent)
    ], PowerbiReportComponent.prototype, "pageTitle", void 0);
    __decorate([
        ViewChild('panel0'),
        __metadata("design:type", PanelComponent)
    ], PowerbiReportComponent.prototype, "panel0", void 0);
    __decorate([
        ViewChild('labelGemNavn'),
        __metadata("design:type", LabelComponent)
    ], PowerbiReportComponent.prototype, "labelGemNavn", void 0);
    __decorate([
        ViewChild('textboxGemReport'),
        __metadata("design:type", TextBoxComponent)
    ], PowerbiReportComponent.prototype, "textboxGemReport", void 0);
    __decorate([
        ViewChild('buttonGem'),
        __metadata("design:type", ButtonComponent)
    ], PowerbiReportComponent.prototype, "buttonGem", void 0);
    __decorate([
        ViewChild('button0'),
        __metadata("design:type", ButtonComponent)
    ], PowerbiReportComponent.prototype, "button0", void 0);
    __decorate([
        ViewChild('dropdownVaelgReport'),
        __metadata("design:type", DropDownComponent)
    ], PowerbiReportComponent.prototype, "dropdownVaelgReport", void 0);
    __decorate([
        ViewChild('dropdown0'),
        __metadata("design:type", DropDownComponent)
    ], PowerbiReportComponent.prototype, "dropdown0", void 0);
    __decorate([
        ViewChild('buttonSend'),
        __metadata("design:type", ButtonComponent)
    ], PowerbiReportComponent.prototype, "buttonSend", void 0);
    __decorate([
        ViewChild('buttonSlet'),
        __metadata("design:type", ButtonComponent)
    ], PowerbiReportComponent.prototype, "buttonSlet", void 0);
    __decorate([
        ViewChild('SplitbuttonViewEdit'),
        __metadata("design:type", SplitButtonComponent)
    ], PowerbiReportComponent.prototype, "splitbuttonViewEdit", void 0);
    __decorate([
        ViewChild('html0'),
        __metadata("design:type", HtmlComponent)
    ], PowerbiReportComponent.prototype, "html0", void 0);
    PowerbiReportComponent = PowerbiReportComponent_1 = __decorate([
        Component({
            selector: 'app-powerbi-report',
            templateUrl: './powerbi-report.component.html',
        }),
        __metadata("design:paramtypes", [ReportService, Injector])
    ], PowerbiReportComponent);
    return PowerbiReportComponent;
    var PowerbiReportComponent_1;
}());
export { PowerbiReportComponent };
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
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/powerbi-report/powerbi-report.component.js.map