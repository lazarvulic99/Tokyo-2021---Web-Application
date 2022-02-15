import { TestBed } from '@angular/core/testing';
import { KorisnikService } from './korisnik.service';
describe('KorisnikService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(KorisnikService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=korisnik.service.spec.js.map