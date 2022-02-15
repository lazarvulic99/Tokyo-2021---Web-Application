import { TestBed } from '@angular/core/testing';
import { RekordiService } from './rekordi.service';
describe('RekordiService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RekordiService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=rekordi.service.spec.js.map