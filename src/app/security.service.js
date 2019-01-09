var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { ODataClient } from './odata-client';
var TOKEN = 'id_token';
var NAME = 'unique_name';
var ROLE = 'role';
var UserService = (function () {
    function UserService() {
        this.init();
    }
    UserService.prototype.isAuthenticated = function () {
        var notExpired = tokenNotExpired(TOKEN);
        if (localStorage.getItem(TOKEN) && !notExpired) {
            this.logout();
        }
        return notExpired;
    };
    UserService.prototype.isInRole = function (role) {
        var _this = this;
        var roles = Array.isArray(role) ? role : [role];
        if (roles.indexOf('Everybody') >= 0) {
            return true;
        }
        if (!this.isAuthenticated()) {
            return false;
        }
        if (roles.indexOf('Authenticated') >= 0) {
            return true;
        }
        return roles.some(function (role) { return _this.roles.indexOf(role) >= 0; });
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem(TOKEN);
        location.reload();
    };
    UserService.prototype.init = function () {
        var profile = (_a = {},
            _a[NAME] = null,
            _a[ROLE] = null,
            _a);
        if (this.isAuthenticated()) {
            var jwt = new JwtHelper();
            profile = jwt.decodeToken(localStorage.getItem(TOKEN));
        }
        this.profile = profile;
        this.name = profile[NAME];
        this.roles = profile[ROLE];
        if (!this.roles) {
            this.roles = [];
        }
        this.roles = Array.isArray(this.roles) ? this.roles : [this.roles];
        var _a;
    };
    return UserService;
}());
export { UserService };
var SecurityService = (function () {
    function SecurityService(router, http, user) {
        this.router = router;
        this.http = http;
        this.user = user;
        this.basePath = environment.securityUrl;
        this.odata = new ODataClient(this.http, this.basePath, { legacy: false, withCredentials: true });
    }
    SecurityService.prototype.isAuthenticated = function () {
        return this.user.isAuthenticated();
    };
    SecurityService.prototype.isLoggedIn = function () {
        return this.isAuthenticated();
    };
    SecurityService.prototype.isInRole = function (role) {
        return this.user.isInRole(role);
    };
    Object.defineProperty(SecurityService.prototype, "profile", {
        get: function () {
            return this.user.profile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecurityService.prototype, "role", {
        get: function () {
            return this.user.roles[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecurityService.prototype, "roles", {
        get: function () {
            return this.user.roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecurityService.prototype, "name", {
        get: function () {
            return this.user.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecurityService.prototype, "accessToken", {
        get: function () {
            return localStorage.getItem(TOKEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecurityService.prototype, "token", {
        get: function () {
            return this.accessToken;
        },
        enumerable: true,
        configurable: true
    });
    SecurityService.prototype.logout = function () {
        this.user.logout();
    };
    SecurityService.prototype.canActivate = function (roles, state) {
        var _this = this;
        if (this.isAuthenticated()) {
            if (this.isInRole(roles)) {
                return true;
            }
            else {
                this.router.navigateByUrl('/unauthorized');
            }
        }
        else {
            this.router.navigate([{ outlets: { popup: null } }])
                .then(function () { return _this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } }); });
            return false;
        }
    };
    SecurityService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(this.basePath + "/login", JSON.stringify({ username: username, password: password }), {
            observe: 'response',
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
            .map(function (result) {
            if (result.status == 200) {
                var access_token = result.body.access_token;
                localStorage.setItem(TOKEN, access_token);
                _this.user.init();
                var _a = _this.router.routerState.snapshot.root.queryParams.redirectUrl, redirectUrl = _a === void 0 ? '/' : _a;
                _this.router.navigateByUrl(redirectUrl);
            }
        })
            .catch(function (response) {
            return Observable.throw(response.error);
        });
    };
    SecurityService.prototype.resetPassword = function (username) {
        var _this = this;
        return this.http.post(this.basePath + "/reset-password", JSON.stringify({ username: username }), {
            observe: 'response',
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
            .map(function (result) {
            if (result.status == 200) {
                var _a = _this.router.routerState.snapshot.root.queryParams.redirectUrl, redirectUrl = _a === void 0 ? '/' : _a;
                _this.router.navigateByUrl(redirectUrl);
            }
        })
            .catch(function (response) {
            return Observable.throw(response.error);
        });
    };
    SecurityService.prototype.registerUser = function (user) {
        return this.http.post(this.basePath + "/register", JSON.stringify(user), {
            observe: 'response',
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
            .catch(function (response) {
            return Observable.throw(response.error);
        });
    };
    SecurityService.prototype.changePassword = function (oldPassword, newPassword) {
        return this.http.post(this.basePath + "/change-password", JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }), {
            observe: 'response',
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
            .catch(function (response) {
            return Observable.throw(response.error);
        });
    };
    SecurityService.prototype.getRoleById = function (id) {
        return this.odata.get("/ApplicationRoles('" + id + "')");
    };
    SecurityService.prototype.getRoles = function (filter, top, skip, orderby, count, expand) {
        return this.odata.get('/ApplicationRoles', { filter: filter, top: top, skip: skip, orderby: orderby, count: count, expand: expand });
    };
    SecurityService.prototype.createRole = function (role) {
        return this.odata.post('/ApplicationRoles', role);
    };
    SecurityService.prototype.updateRole = function (id, role) {
        return this.odata.patch("/ApplicationRoles('" + id + "')", role, function (role) { return role.Id == id; });
    };
    SecurityService.prototype.deleteRole = function (id) {
        return this.odata.delete("/ApplicationRoles('" + id + "')", function (role) { return role.Id != id; });
    };
    SecurityService.prototype.getUserById = function (id) {
        return this.odata.get("/ApplicationUsers('" + id + "')");
    };
    SecurityService.prototype.createUser = function (user) {
        return this.odata.post('/ApplicationUsers', user);
    };
    SecurityService.prototype.getUsers = function (filter, top, skip, orderby, count, expand) {
        return this.odata.get('/ApplicationUsers', { filter: filter, top: top, skip: skip, orderby: orderby, count: count, expand: expand });
    };
    SecurityService.prototype.deleteUser = function (id) {
        return this.odata.delete("/ApplicationUsers('" + id + "')", function (user) { return user.Id != id; });
    };
    SecurityService.prototype.updateUser = function (id, user) {
        return this.odata.patch("/ApplicationUsers('" + id + "')", user, function (user) { return user.Id == id; });
    };
    SecurityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, HttpClient, UserService])
    ], SecurityService);
    return SecurityService;
}());
export { SecurityService };
//# sourceMappingURL=C:/Work/RadNoegletal/Noegletal/client/src/app/security.service.js.map