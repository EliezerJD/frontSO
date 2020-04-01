import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompaddComponent } from './compadd/compadd.component';
import { VerAlumnosComponent } from './ver-alumnos/ver-alumnos.component';
import { AddrfidComponent } from './addrfid/addrfid.component';
import { VerrfidComponent } from './verrfid/verrfid.component';
import { VerasistenciaComponent } from './verasistencia/verasistencia.component';
import { AsignarrfidComponent } from './asignarrfid/asignarrfid.component';
import { AsignarasistenciaComponent } from './asignarasistencia/asignarasistencia.component';
import { LoginComponent } from './login/login.component';


const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

const rutas: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'add', component: CompaddComponent },
  { path: 'veralumnos', component: VerAlumnosComponent },
  { path: 'addrfid', component: AddrfidComponent },
  { path: 'verrfid', component: VerrfidComponent },
  { path: 'verasistencia', component: VerasistenciaComponent },
  { path: 'asignarrfid', component: AsignarrfidComponent },
  { path: 'asignarasistencia', component: AsignarasistenciaComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CompaddComponent,
    VerAlumnosComponent,
    AddrfidComponent,
    VerrfidComponent,
    VerasistenciaComponent,
    AsignarrfidComponent,
    AsignarasistenciaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      rutas,
      { enableTracing: true } // <-- tareas de debug
    ),
    HttpClientModule,
    NgbModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
