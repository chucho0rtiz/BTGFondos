import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async alert(header: string, message: string, input?: any[]) {
    const alert = await this.alertController.create({
      header: header,
      inputs: input || [],
      message: message,
      buttons: ['OK'],
      cssClass: 'alertError',
    });

    await alert.present();
  }

  async alertSuscrip(func: (data: any) => void) {
    const alert = await this.alertController.create({
      header: "¿Cuanto dinero invertira en el fondo?",
      inputs: [
        {
          type: 'number',
          placeholder: 'monto',
          min: 1,
          max: 9,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: func
        },
      ]
    });

    await alert.present();
  }

  async alertCancelarSus(seleccion: any, funcion: () => void) {
    const alert = await this.alertController.create({
      header: "¿Desea cancelar la suscripción?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: funcion,
        },
      ]
    });

    await alert.present();
  }
}
