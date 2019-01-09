var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Location } from '@angular/common';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
function cacheKey(path) {
    return path.replace(/\(.*?\)$/, '');
}
function toLegacyFilter(value) {
    // Cast GUID
    value = value.replace(/([0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i, "guid'$&'");
    // Cast DateTime
    value = value.replace(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/i, "datetime'$&'");
    // Change contains() to substringof()
    value = value.replace(/contains\((.+?), (.+?)\)/g, 'substringof($2, $1) eq true');
    return value;
}
function updateCount(result, amount) {
    if ('@odata.count' in result) {
        result['@odata.count'] = result['@odata.count'] + amount;
    }
    else if ('odata.count' in result) {
        result['odata.count'] = +result['odata.count'] + amount;
    }
}
function errorResponse(response) {
    if (response.status == 0) {
        return __assign({}, response, { error: { message: response.statusText } });
    }
    else {
        return __assign({}, response, response.error);
    }
}
var ODataClient = (function () {
    function ODataClient(http, basePath, options) {
        this.http = http;
        this.basePath = basePath;
        this.options = options;
        this.cache = {};
    }
    ODataClient.prototype.get = function (path, odataParams) {
        var _this = this;
        if (!odataParams) {
            return this.request('get', path)
                .map(function (response) {
                switch (response.status) {
                    case 200:
                        return _this.filterResponseBody(response.body);
                }
            });
        }
        if (odataParams.format == 'csv' || odataParams.format == 'xlsx') {
            return this.export(path, odataParams);
        }
        var params = Object.keys(odataParams).reduce(function (params, key) {
            var value = odataParams[key];
            if (value == null || value === '') {
                return params;
            }
            if (key == 'filter' && _this.options.legacy) {
                value = toLegacyFilter(value);
            }
            return params.set("$" + key, value.toString());
        }, new HttpParams());
        return this.request('get', path, params)
            .map(function (response) {
            switch (response.status) {
                case 200: {
                    var key = cacheKey(path);
                    var cache = _this.cache[key];
                    if (cache) {
                        cache.result.unsubscribe();
                    }
                    var result = new BehaviorSubject(_this.filterResponseBody(response.body));
                    _this.cache[key] = { result: result };
                    return result;
                }
            }
        })
            .switchMap(function (result) { return result; });
    };
    ODataClient.prototype.delete = function (path, filterByKeys) {
        var _this = this;
        return this.request('delete', path)
            .map(function (response) {
            switch (response.status) {
                case 204: {
                    var cache = _this.cache[cacheKey(path)];
                    if (cache) {
                        var result = cache.result.getValue();
                        result.value = result.value.filter(filterByKeys);
                        updateCount(result, -1);
                        cache.result.next(result);
                    }
                    return {};
                }
            }
        });
    };
    ODataClient.prototype.invoke = function (path, body) {
        return this.request('post', path, null, body)
            .map(function (response) {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        });
    };
    ODataClient.prototype.post = function (path, body) {
        var cache = this.cache[cacheKey(path)];
        return this.request('post', path, null, body)
            .map(function (response) {
            switch (response.status) {
                case 201: {
                    var body_1 = response.body;
                    if (cache) {
                        var result = cache.result.getValue();
                        result.value = result.value.concat([body_1]);
                        updateCount(result, 1);
                        cache.result.next(result);
                    }
                    return body_1;
                }
            }
        });
    };
    ODataClient.prototype.put = function (path, body, findByKeys) {
        var cache = this.cache[cacheKey(path)];
        return this.request('put', path, null, body)
            .map(function (response) {
            switch (response.status) {
                case 200:
                case 204: {
                    if (cache) {
                        var result = cache.result.getValue();
                        var index = result.value.findIndex(findByKeys);
                        var replacement = response.status == 200 ? response.body : Object.assign({}, result.value[index], body);
                        result.value = result.value.slice(0, index).concat([replacement], result.value.slice(index + 1));
                        cache.result.next(result);
                    }
                    return body;
                }
            }
        });
    };
    ODataClient.prototype.upload = function (path, file) {
        return this.uploadFile('put', path, file)
            .map(function (response) {
            switch (response.status) {
                case 200:
                case 204: {
                    return file;
                }
            }
        });
    };
    ODataClient.prototype.patch = function (path, body, findByKeys) {
        var cache = this.cache[cacheKey(path)];
        return this.request('patch', path, null, body)
            .map(function (response) {
            switch (response.status) {
                case 200:
                case 204: {
                    if (cache) {
                        var result = cache.result.getValue();
                        var index = result.value.findIndex(findByKeys);
                        var replacement = response.status == 200 ? response.body : Object.assign({}, result.value[index], body);
                        result.value = result.value.slice(0, index).concat([replacement], result.value.slice(index + 1));
                        cache.result.next(result);
                    }
                    return body;
                }
            }
        });
    };
    ODataClient.prototype.export = function (path, odataParams) {
        var _this = this;
        var headers = new HttpHeaders();
        if (odataParams.format == 'xlsx') {
            headers = headers.set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }
        else if (odataParams.format == 'csv') {
            headers = headers.set('Accept', 'text/csv');
        }
        var params = Object.keys(odataParams).reduce(function (params, key) {
            var value = odataParams[key];
            if (value == null || value === '') {
                return params;
            }
            if (key == 'filter' && _this.options.legacy) {
                value = toLegacyFilter(value);
            }
            return params.set("$" + key, value.toString());
        }, new HttpParams());
        return this.http.request('get', Location.joinWithSlash(this.basePath, path), {
            responseType: 'blob',
            params: odataParams ? params : undefined,
            headers: headers,
            withCredentials: this.options.withCredentials
        }).map(function (response) {
            _this.downloadFile(response, "Export." + odataParams.format);
        })
            .catch(function (response) {
            return Observable.throw(errorResponse(response));
        });
    };
    ODataClient.prototype.request = function (method, path, params, body) {
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        if (body) {
            headers = headers.set('Content-Type', 'application/json');
        }
        if ((method == 'delete' || body) && this.options.legacy && method != 'post') {
            headers = headers.set('If-Match', '*');
        }
        if (body && '@odata.etag' in body) {
            headers = headers.set('If-Match', body['@odata.etag']);
        }
        return this.http.request(method, Location.joinWithSlash(this.basePath, path), {
            observe: 'response',
            body: body ? JSON.stringify(this.filterRequestBody(body)) : undefined,
            params: params,
            headers: headers,
            withCredentials: this.options.withCredentials
        })
            .catch(function (response) {
            return Observable.throw(errorResponse(response));
        });
    };
    ODataClient.prototype.uploadFile = function (method, path, file) {
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/octet-stream');
        return this.http.request(method, Location.joinWithSlash(this.basePath, path), {
            observe: 'response',
            body: file,
            headers: headers,
            withCredentials: this.options.withCredentials
        });
    };
    ODataClient.prototype.downloadFile = function (blob, fileName) {
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        }
        else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    ODataClient.prototype.filterRequestBody = function (body) {
        return Object.keys(body)
            .filter(function (key) { return key == 'RoleNames' || (!Array.isArray(body[key]) && !(Object.prototype.toString.call(body[key]) === '[object Object]')); })
            .reduce(function (obj, key) {
            return __assign({}, obj, (_a = {}, _a[key] = body[key], _a));
            var _a;
        }, {});
    };
    ODataClient.prototype.filterResponseBody = function (body) {
        return Object.keys(body)
            .filter(function (key) { return key !== '@odata.context'; })
            .reduce(function (obj, key) {
            return __assign({}, obj, (_a = {}, _a[key] = body[key], _a));
            var _a;
        }, {});
    };
    return ODataClient;
}());
export { ODataClient };
//# sourceMappingURL=D:/work/RadNoegletal/Noegletal/client/src/app/odata-client.js.map