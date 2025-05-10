import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'alpinejs';


bootstrapApplication(AppComponent, {
    providers: [
    ...appConfig.providers, // Proveedores de la aplicación
       provideAnimations() // Habilita el soporte para animaciones
    ]
    }).catch(err => console.error(err));
