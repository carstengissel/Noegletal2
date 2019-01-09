/*
  This file is automatically generated. Any changes will be overwritten.
  Modify main-layout.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { HeaderComponent } from '@radzen/angular/dist/header';
import { SidebarToggleComponent } from '@radzen/angular/dist/sidebar-toggle';
import { LabelComponent } from '@radzen/angular/dist/label';
import { BodyComponent } from '@radzen/angular/dist/body';
import { ContentContainerComponent } from '@radzen/angular/dist/content-container';
import { SidebarComponent } from '@radzen/angular/dist/sidebar';
import { PanelMenuComponent } from '@radzen/angular/dist/panelmenu';


export class MainLayoutGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('header0') header0: HeaderComponent;
  @ViewChild('sidebar-toggle0') sidebarToggle0: SidebarToggleComponent;
  @ViewChild('label0') label0: LabelComponent;
  @ViewChild('body0') body0: BodyComponent;
  @ViewChild('main') main: ContentContainerComponent;
  @ViewChild('sidebar0') sidebar0: SidebarComponent;
  @ViewChild('panelmenu0') panelmenu0: PanelMenuComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  _location: Location;

  _subscription: Subscription;

  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
