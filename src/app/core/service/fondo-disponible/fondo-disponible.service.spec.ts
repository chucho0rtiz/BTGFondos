import { TestBed } from '@angular/core/testing';
import { FondoDisponibleService } from './fondo-disponible.service';

describe('FondoDisponibleService', () => {
  let service: FondoDisponibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FondoDisponibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should actualizarMonto',(done) => {
    const nuevoMonto = 5000;
    
    service.monto$.subscribe((valor) => {
      if (valor === nuevoMonto) {
      expect(valor).toBe(nuevoMonto);
      done();
    }
    });
    
    service.actualizarMonto(nuevoMonto);  })
});
