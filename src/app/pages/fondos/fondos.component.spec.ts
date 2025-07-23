import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FondosComponent } from './fondos.component';

describe('FondosComponent', () => {
  let component: FondosComponent;
  let fixture: ComponentFixture<FondosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [ FondosComponent ],
      imports: [FondosComponent, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alertSuscrip', async () => {
    let seleccion = { "ID": 2, "Nombre": "FPV_BTG_PACTUAL_ECOPETROL", "MontoMinimo": 125000, "Categoria": "FPV", "status": "No suscrito"};
    spyOn(component, 'alertSuscrip').and.callThrough();
    await component.alertSuscrip(seleccion);
    expect(component.alertSuscrip).toHaveBeenCalledWith(seleccion);
  })
  
});
