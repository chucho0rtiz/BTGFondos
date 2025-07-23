import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { AlertController } from '@ionic/angular';

describe('AlertService', () => {
  let service: AlertService;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(() => {
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    TestBed.configureTestingModule({
      providers: [
        { provide: AlertController, useValue: alertSpy }
      ]
    });
    service = TestBed.inject(AlertService);
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should alert', async () => {
    let { header, message, input } = { header: 'Test Header', message: 'Test Message', input: [{label: 'SMS', type: 'radio', value: 'SMS'}] };

    spyOn(service, 'alert').and.callThrough();

    service.alert(header, message, input);
    expect(service.alert).toHaveBeenCalledWith(header, message, input);
  });

  it('should alertSuscrip', async () => {
    const funcSpy = jasmine.createSpy('func');
    spyOn(service, 'alertSuscrip').and.callThrough();

    service.alertSuscrip(funcSpy);
    expect(service.alertSuscrip).toHaveBeenCalledWith(funcSpy);
  });

  it('should alertCancelarSus', async () => {
    let seleccion = { "ID": 2, "Nombre": "FPV_BTG_PACTUAL_ECOPETROL", "MontoMinimo": 125000, "Categoria": "FPV", "status": "No suscrito"};
    const funcSpy = jasmine.createSpy('func');
    spyOn(service, 'alertCancelarSus').and.callThrough();
    service.alertCancelarSus(seleccion, funcSpy);
    expect(service.alertCancelarSus).toHaveBeenCalledWith(seleccion, funcSpy);
  });
});
