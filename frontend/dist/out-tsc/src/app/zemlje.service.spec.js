import { TestBed } from '@angular/core/testing';
import { ZemljeService } from './zemlje.service';
describe('ZemljeService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ZemljeService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=zemlje.service.spec.js.map