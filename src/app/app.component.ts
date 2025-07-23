import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { personOutline, personSharp, cardOutline, cardSharp, newspaperOutline, newspaperSharp } from 'ionicons/icons';
import fondos from '../assets/data/fondosData.json';
import cliente from '../assets/data/cliente.json';
import { FondoDisponibleService } from './core/service/fondo-disponible/fondo-disponible.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonNote, RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  fondoDisponible: number = 500000; // Valor inicial del fondo disponible

  public appPages = [
    { title: 'Fondos', url: '/folder/fondos', icon: 'card' },
    { title: 'Historial', url: '/folder/historial', icon: 'newspaper' },
  ];
  constructor(private fondoDisponibleService: FondoDisponibleService) {
    addIcons({ personOutline, personSharp, cardOutline, cardSharp, newspaperOutline, newspaperSharp });
  }

  ngOnInit() {
    this.fondoDisponibleService.monto$.subscribe(monto => {
      this.fondoDisponible = monto;
    });

    localStorage.setItem('dineroDisponible', JSON.stringify(500000));
    localStorage.setItem('historial', JSON.stringify(cliente.HistorialFondos));
    localStorage.setItem('fondos', JSON.stringify(fondos));
  }
}
