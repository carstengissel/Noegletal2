var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
var ConfigService = (function () {
    function ConfigService() {
        this.config = {};
    }
    ConfigService.prototype.load = function () {
        this.config = Object.assign({}, environment);
    };
    ConfigService.prototype.get = function (key) {
        return this.config[key];
    };
    ConfigService = __decorate([
        Injectable()
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
export function configServiceFactory(configService) {
    return function () { return configService.load(); };
}
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/config.service.js.map