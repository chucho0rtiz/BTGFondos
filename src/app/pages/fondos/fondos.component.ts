import { Component, OnInit } from '@angular/core';
// import fondos from '../../../assets/data/fondosData.json';
// import cliente from '../../../assets/data/cliente.json';
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from "@ionic/angular/standalone";
import { addIcons} from 'ionicons';
import { trashOutline, trashSharp, checkboxOutline, checkboxSharp, squareOutline, squareSharp } from 'ionicons/icons';
import { FondoDisponibleService } from '../../core/service/fondo-disponible/fondo-disponible.service';
import { AlertService } from '../../core/service/alert/alert.service'

@Component({
  selector: 'app-fondos',
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.scss'],
  imports: [IonButton, IonIcon, IonCol, IonRow, IonGrid],
})
export class FondosComponent  implements OnInit {
  fondosData = JSON.parse(localStorage.getItem('fondos') || '[]');
  cliente = JSON.parse(localStorage.getItem('cliente') || '{}');
  nombresCampos: string[] = Object.keys(this.fondosData[0] || {});
  sizeRow = 0;
  dineroCliente: number = 0;
  dineroInvertir: number = 0;

  constructor(private alertService: AlertService,
    private fondoDisponibleService: FondoDisponibleService
  ) {
  }
  
  ngOnInit() {
    addIcons({ trashOutline, trashSharp, checkboxOutline, checkboxSharp, squareOutline, squareSharp });    
    this.fondoDisponibleService.monto$.subscribe(monto => this.dineroCliente = monto);

    // Inicializador para estilos de columnas y nombre de campos
    this.nombresCampos.push('Acciones');
    this.sizeRow = 12/(this.getValores(this.fondosData[0]).length+1);
  }  

  // Llamadas al serivicio de alertas
  alertSuscrip(seleccion: any,) {
    this.alertService.alertSuscrip((data) => {
      this.dineroInvertir = data[0]; 
      this.suscribir(seleccion);
    });
  }

  alertCancelarSus(seleccion: any) {
    this.alertService.alertCancelarSus(seleccion, () => this.cancelarSuscripcion(seleccion))
  }

  // funciones de suscripcion y cancelacion de fondos
  suscribir(seleccion: any) {    
    let data = {
      "IdFondo": seleccion.ID,
      "TipoOperacion": "Suscripción",
      "Fondo": seleccion.Nombre,
      "Monto": this.dineroInvertir,
      "Fecha": new Date()
    }

    if (this.dineroInvertir >= seleccion.MontoMinimo) {
      if(this.dineroInvertir <= this.dineroCliente){
        
        this.restarDinero();
        this.historialAdd(data);
        this.changeStatusSuscripcion(seleccion);

        this.alertService.alert('Suscribir Fondo', 'Se ha suscrito correctamente al fondo.', [
            {label: 'SMS', type: 'radio', value: 'SMS'},{label: 'Email', type: 'radio', value: 'Email'}]
        );
        return;
      }else {
        this.alertService.alert('Suscribir Fondo', 'No tienes suficiente dinero disponible para suscribir este fondo.');
        return;
      }
    }else if(this.dineroInvertir > this.dineroCliente || this.dineroInvertir < seleccion.MontoMinimo) {
      this.alertService.alert('Suscribir Fondo', 'El monto ingresado es menor al mínimo requerido.');
      return;
    }
    
  }

  cancelarSuscripcion(seleccion: any) {
    let data = {
      "IdFondo": seleccion.ID,
      "TipoOperacion": "Suscripción",
      "Fondo": seleccion.Nombre,
      "Monto": this.dineroInvertir,
      "Fecha": new Date()
    }
    this.sumarDinero(seleccion);
    this.historialAdd(data);
    this.changeStatusSuscripcion(seleccion);
  }

  // funciones de dinero y historial
  restarDinero() {
    let dineroDisponible = JSON.parse(localStorage.getItem('dineroDisponible') || '[]');
    dineroDisponible -= this.dineroInvertir;
    localStorage.setItem('dineroDisponible', JSON.stringify(dineroDisponible));
    this.fondoDisponibleService.actualizarMonto(dineroDisponible);
  }

  sumarDinero(data: any) {
    let dineroDisponible = JSON.parse(localStorage.getItem('dineroDisponible') || '[]');
    let historial: any[] = JSON.parse(localStorage.getItem('historial') || '[]');
    let listHistorial = historial.filter(h => h.IdFondo === data.ID);
    let lastRegister = listHistorial[listHistorial.length - 1] || { Monto: 0 };
      // [historial.length - 1];   
    dineroDisponible += Number(lastRegister.Monto);
    localStorage.setItem('dineroDisponible', JSON.stringify(dineroDisponible));
    this.fondoDisponibleService.actualizarMonto(dineroDisponible);
    
  }

  historialAdd(data: any) {
    let historial = JSON.parse(localStorage.getItem('historial') || '[]');
    historial.push(data);
    localStorage.setItem('historial', JSON.stringify(historial));
  }

  changeStatusSuscripcion(data: any) {
    let fondos: any[] = JSON.parse(localStorage.getItem('fondos') || '[]');
    let response = fondos.find(f => f.ID === data.ID);

    try {
      response.status = response.status === "No suscrito" ? "Suscrito" : "No suscrito";
      localStorage.setItem('fondos', JSON.stringify(fondos));
      this.fondosData = fondos;
    } catch (error) {
      console.error('Fondo no encontrado');
    }
  }

  getValores(obj: number): any[] {
    return Object.values(obj || 0);
  }
}
