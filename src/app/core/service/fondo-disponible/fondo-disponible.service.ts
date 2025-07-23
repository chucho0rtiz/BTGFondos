import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FondoDisponibleService {

  constructor() { }

  dineroDisponible = localStorage.getItem('dineroDisponible');
  private dinero = new BehaviorSubject<number>(this.dineroDisponible !== null && !isNaN(Number(this.dineroDisponible)) ? Number(this.dineroDisponible) : 0);

  monto$: Observable<number> = this.dinero.asObservable();

  actualizarMonto(nuevoMonto: number) {
    this.dinero.next(nuevoMonto);
  }
  
}
