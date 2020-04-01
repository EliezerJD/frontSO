import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verrfid',
  templateUrl: './verrfid.component.html',
  styleUrls: ['./verrfid.component.css']
})
export class VerrfidComponent implements OnInit {
	rfids: any = [];
  rfidsnew: any = [];
	rfid= {
		    id:'',
		    codigo : '',
		    status : '',
        alumno : ''
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
  data= {
        id:'',
        codigo : '',
        status : '',
        alumno : ''
  };
  datas: any = [];
  constructor(private apiService: ApiService, private router: Router) {
    this.obtenerRfids();
    this.obtenerAlumnos();
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
      setTimeout(() => {
        this.listar();
      }, 50);
    },
    error=> {
      console.log(JSON.stringify(error));
    });
  }

  deleteRfid(id: any, idalumno: any, alumno: string) {
    this.apiService.deleteRfid(id).subscribe((res: any)=> {
    });
    if(alumno !== 'No Asignado') {
      this.apiService.update2(idalumno).subscribe((res: any)=> {
      });
    }
    setTimeout(() => {
        alert('RFID borrado correctamente');
        location.reload();
      }, 50);
  }

  listar() {
    for(const valor of this.rfids) {
      for(const valor2 of this.alumnos) {
        if(valor.status === 'Asignable') {
          this.datas.push({id: valor.id, codigo: valor.codigo, status: valor.status, alumno: 'No Asignado',idalumno:valor2.id});
          break;
        }
        if(valor.idalumno === valor2.id) {
          this.datas.push( {id: valor.id, codigo: valor.codigo,
          status: valor.status, alumno: valor2.nombre +' ' +valor2.ap_pat+' '+valor2.ap_mat, idalumno:valor2.id} );
        }
      }
    }
  }

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

}
