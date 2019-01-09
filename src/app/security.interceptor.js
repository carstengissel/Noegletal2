var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from './security.service';
import { environment } from '../environments/environment';
var SecurityInterceptor = (function () {
    function SecurityInterceptor(injector, router) {
        this.injector = injector;
        this.router = router;
    }
    SecurityInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var auth = this.injector.get(SecurityService);
        if (request.url.indexOf(environment.noegleTal) != 0 && request.url.indexOf(environment.securityUrl) != 0) {
            return next.handle(request);
        }
        if (auth.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + auth.accessToken
                }
            });
        }
        return next.handle(request).catch(function (response) {
            if (response.status === 401) {
                var redirectUrl_1 = _this.router.url;
                _this.router.navigate([{ outlets: { popup: null } }]).then(function () {
                    return _this.router.navigate(['login'], { queryParams: { redirectUrl: redirectUrl_1 } });
                });
                response.error = { error: { message: 'Session expired.' } };
            }
            return Observable.throw(response);
        });
    };
    SecurityInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Injector, Router])
    ], SecurityInterceptor);
    return SecurityInterceptor;
}());
export { SecurityInterceptor };
//# sourceMappingURL=C:/Work/RadNoegletal/Noegletal/client/src/app/security.interceptor.js.map