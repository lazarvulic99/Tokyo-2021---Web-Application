import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ZemljeService = class ZemljeService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000';
    }
    dohvatiZemlje() {
        return this.http.get(`${this.uri}/zemlje/dohvatiZemlje`);
    }
};
ZemljeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ZemljeService);
export { ZemljeService };
//# sourceMappingURL=zemlje.service.js.map