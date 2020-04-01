import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-verasistencia',
  templateUrl: './verasistencia.component.html',
  styleUrls: ['./verasistencia.component.css']
})
export class VerasistenciaComponent implements OnInit {

  asistencias: any = [];
  asistencia = {
	    id:'',
	    fecha : '',
	    idalumno : ''
  };
  alumnos: any = [];
  alumno = {
	    id:'',
	    nombre : '',
	    ap_pat : '',
	    ap_mat : '',
      	idrfid : '',
      	fecha : ''
  };
  data = {
      nombre : '',
      fecha : ''
  };
  datas: any = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.obtenerAsistencias();
    this.obtenerAlumnos();
  }

  ngOnInit() {
  	if(localStorage.getItem('token')==null) {
      this.router.navigate(['login']);
    }
  }

  obtenerAsistencias() {
  	this.apiService.obtenerAsistencias().subscribe(res => {
  		this.asistencias = res;
  		setTimeout(() => {
        this.listar();
      }, 50);
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

  listar() {
  	for(const valor2 of this.asistencias) {
      for(const valor3 of this.alumnos) {
        if(valor2.idalumno === valor3.id) {
          this.data.nombre = valor3.nombre + ' ' + valor3.ap_pat + ' ' + valor3.ap_mat;
          valor2.fecha = valor2.fecha.split('T');
          const fecha2 = valor2.fecha[1].split('.');
          this.data.fecha= valor2.fecha[0]+' '+fecha2[0];
          this.datas.push({name: this.data.nombre,fecha:this.data.fecha});
        }
      }
    }
  }

}
