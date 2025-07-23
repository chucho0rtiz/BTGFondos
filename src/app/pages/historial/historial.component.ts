import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  imports: [IonCol, IonRow, IonGrid],
})
export class HistorialComponent  implements OnInit {
  historial = JSON.parse(localStorage.getItem('historial') || '[]');
  nombresCampos: string[] = Object.keys(this.historial[0] || {});
  sizeRow = 0;

  constructor() { }

  ngOnInit() {
    this.sizeRow = 11/(this.getValores(this.historial[0]).length);
  }  

  getValores(obj: any): any[] {
    return Object.values(obj || 0);
  }
}
