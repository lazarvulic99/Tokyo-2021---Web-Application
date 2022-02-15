import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { PromenaLozinkeComponent } from './promena-lozinke.component';
describe('PromenaLozinkeComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [PromenaLozinkeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PromenaLozinkeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=promena-lozinke.component.spec.js.map