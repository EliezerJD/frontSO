import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import {Router} from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-asignarrfid',
  templateUrl: './asignarrfid.component.html',
  styleUrls: ['./asignarrfid.component.css']
})
export class AsignarrfidComponent implements OnInit {
  alumnos: any = [];
  alumnosnew: any = [];
  alumnomodel: any = [];
  rfidmodel: any = [];
  alumno = {
	    id:'',
	    nombre : '',
	    ap_pat : '',
	    ap_mat : '',
	    idrfid : ''
  };
  rfids: any = [];
  rfidsnew: any = [];
  rfid = {
	    id:'',
	    codigo : '',
	    status : '',
	    idalumno: ''
  };
  constructor(private apiService: ApiService, private router: Router, public wsService: WebsocketService) {
  	this.obtenerAlumnos();
  	this.obtenerRfids();
  }

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this.router.navigate(['login']);
    }
  }
  obtenerAlumnos() {
  	this.apiService.obtenerTodosLosAlumnos().subscribe(res => {
  		this.alumnos = res;
  	},
  	error=> {
  		console.log(JSON.stringify(error));
  	});
  }
  obtenerRfids() {
  	this.apiService.obtenerTodosLosRfids().subscribe(res => {
      this.rfids = res;
      setTimeout(() => {
        this.listar();
      }, 50);
  	},
  	error=> {
  		console.log(JSON.stringify(error));
  	});
  }
  listar() {
    for(const valor of this.rfids) {
      if(valor.status === 'Asignable') {
        this.rfidsnew.push(valor);
      }
    }
    for(const valor of this.alumnos) {
      if(valor.idrfid==null) {
        this.alumnosnew.push(valor);
      }
    }
  }

  asignar(idAlumno: string, idRfid: string) {
    this.rfid.idalumno = idAlumno;
    this.rfid.status = '1';
    this.apiService.updateRfid(this.rfid, idRfid).subscribe((res: any)=> {
  	});
    this.apiService.updateAlumno(idAlumno,idRfid).subscribe((res: any)=> {
    });
    this.wsService.sendMessage('2');
    setTimeout(() => {
      alert('Asignado correctamente');
      location.reload();
    }, 1000);
  }



}
