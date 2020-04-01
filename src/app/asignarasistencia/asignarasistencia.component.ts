import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';
import { WebsocketService } from 'src/app/websocket.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asignarasistencia',
  templateUrl: './asignarasistencia.component.html',
  styleUrls: ['./asignarasistencia.component.css']
})
export class AsignarasistenciaComponent implements OnInit {
  mensajesSubscription: Subscription;
	alumnos: any = [];
  alumno = {
	    id:'',
	    name : '',
	    ap_pat : '',
	    ap_mat : '',
      idrfid : ''
  };
  rfids: any = [];
  asistencias: any = [];
	rfid= {
		    id:'',
		    codigo : '',
		    status : ''
	};
  tempidrfid = null;
  constructor(private apiService: ApiService, private router: Router, public wsService: WebsocketService) {
    this.obtenerRfids();
    this.obtenerAlumnos();
    this.obtenerAsistencias();
  }
  obtenerRfids() {
  	this.apiService.obtenerTodosLosRfids().subscribe(res => {
  		this.rfids = res;
  	},
  	error=> {
  		console.log(JSON.stringify(error));
  	});
  }
  obtenerAlumnos() {
  	this.apiService.obtenerTodosLosAlumnos().subscribe(res => {
  		this.alumnos = res;
  	},
  	error=> {
  		console.log(JSON.stringify(error));
  	});
  }
  addAsistencia() {
  	let encontrado = false;
  	for(const valor of this.rfids) {
      if(valor.codigo === this.rfid.codigo && valor.status === 'Asignado') {
        this.tempidrfid = valor.id;
        for(const valor2 of this.alumnos) {
          if(valor2.idrfid === this.tempidrfid) {
            encontrado=true;
            this.insertAsistencia(this.tempidrfid, valor2.id);
            break;
          }
  			}
  		}
  	}
  	if(encontrado === true) {
  	} else {
      alert('Este rfid no esta asignado o no existe');
      this.wsService.sendMessage('4');
      setTimeout(() => {
      this.rfid.codigo = '';
    }, 300);
  	}
  }
  getMessages() {
    return this.wsService.listen('mensaje-response');
  }

  insertAsistencia(idrfid: any, idalumno) {
    let find = false;
    for(const valor of this.asistencias) {
      if(valor.idalumno === idalumno) {
        const registro = Date.now();
        find = true;
        this.apiService.updateAsistencia(valor.idalumno, valor.id).subscribe(res => {
          alert('Asistencia agregada correctamente');
          this.wsService.sendMessage('3');
          this.rfid.codigo = '';
          location.reload();
        },
        error=> {
          console.log(JSON.stringify(error));
        });
        break;
      }
    }
    if(find !== true) {
      this.apiService.addAsistencia(idalumno).subscribe(res => {
        this.wsService.sendMessage('3');
        this.rfid.codigo = '';
      },
      error=> {
        console.log(JSON.stringify(error));
      });
      alert('Asistencia agregada correctamente');
      location.reload();
    }
  }
  obtenerAsistencias() {
    this.apiService.obtenerAsistencias().subscribe(res => {
      this.asistencias = res;
    },
    error=> {
      console.log(JSON.stringify(error));
    });
  }
  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this.router.navigate(['login']);
    }
  }

}
