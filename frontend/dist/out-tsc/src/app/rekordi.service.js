import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let RekordiService = class RekordiService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000';
    }
    dohvatiSveRekorde(pol) {
        const podaci = {
            pol: pol
        };
        return this.http.post(`${this.uri}/rekordi/dohvatiSveRekorde`, podaci);
    }
};
RekordiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RekordiService);
export { RekordiService };
//# sourceMappingURL=rekordi.service.js.map