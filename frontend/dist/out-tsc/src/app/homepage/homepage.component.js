import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomepageComponent = class HomepageComponent {
    constructor(ruter, zemljeServis) {
        this.ruter = ruter;
        this.zemljeServis = zemljeServis;
    }
    ngOnInit() {
        this.zemljeServis.dohvatiZemlje().subscribe((podaci) => {
            this.zemlje = podaci;
        });
    }
};
HomepageComponent = __decorate([
    Component({
        selector: 'app-homepage',
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css']
    })
], HomepageComponent);
export { HomepageComponent };
//# sourceMappingURL=homepage.component.js.map