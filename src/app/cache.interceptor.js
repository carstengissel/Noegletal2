var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var CacheInterceptor = (function () {
    function CacheInterceptor() {
    }
    CacheInterceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
            }
        });
        return next.handle(request);
    };
    CacheInterceptor = __decorate([
        Injectable()
    ], CacheInterceptor);
    return CacheInterceptor;
}());
export { CacheInterceptor };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/cache.interceptor.js.map