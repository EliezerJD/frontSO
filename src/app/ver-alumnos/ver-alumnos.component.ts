import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.css']
})
export class VerAlumnosComponent implements OnInit {
  closeResult: string;
  modalOptions: NgbModalOptions;
  alumnos: any = [];
  rfids: any = [];
  rfid= {
        id:'',
        codigo : '',
        status : '',
        alumno : ''
  };
  alumno = {
	    id:'',
	    nombre : '',
	    ap_pat : '',
	    ap_mat : '',
      idrfid : ''
  };
  data= {
        id:'',
        codigo : '',
        status : '',
        alumno : ''
  };
  datas: any = [];
  asistencias: any = [];
  asistencia = {
      id:'',
      fecha : '',
      idalumno : ''
  };
  constructor(private apiService: ApiService, private modalService: NgbModal, private router: Router) {
    this.obtenerAlumnos();
    this.obtenerRfids();
    this.obtenerAsistencias();
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    };
  }
  open(content, alumno: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.alumno.nombre = alumno.nombre;
    this.alumno.ap_pat = alumno.ap_pat;
    this.alumno.ap_mat = alumno.ap_mat;
    this.alumno.id = alumno.id;

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  listar() {
    console.log(this.alumnos);
    for(const valor of this.alumnos) {
      for(const valor2 of this.rfids) {
        if(valor.idrfid === valor2.id && valor.idrfid !== null) {
          this.datas.push({id: valor.id, nombre: valor.nombre, ap_pat: valor.ap_pat,
          ap_mat: valor.ap_mat, rfid: valor2.codigo, idrfid: valor.idrfid, status:valor2.status});
          break;
        }
        if(valor.idrfid==null) {
          this.datas.push({id: valor.id, nombre: valor.nombre, ap_pat: valor.ap_pat,
          ap_mat: valor.ap_mat, rfid: 'No Asignado', idrfid: valor.idrfid, status:valor2.status});
          break;
        }
      }
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
      }, 300);
    },
    error=> {
      console.log(JSON.stringify(error));
    });
  }
  obtenerAsistencias() {
    this.apiService.obtenerAsistencias().subscribe(res => {
      this.asistencias = res;
    },
    error=> {
      console.log(JSON.stringify(error));
    });
  }
  deleteAlumno(id: string, idrfid: string, status: string) {
    this.apiService.deleteAlumno(id).subscribe((res: any)=> {
    });
    console.log(status);
    if(status !== 'No Asignado') {
      this.apiService.updateRfid2(idrfid).subscribe((res: any)=> {
      });
    }
    let encontrado = false;
    let temp = null;
    for(const valor of this.asistencias) {
      if(valor.idalumno === id) {
        encontrado = true;
        temp = valor.id;
        break;
      }
    }
    if(encontrado === true) {
      this.borrar(temp);
      this.obtenerAlumnos();
    }
    setTimeout(() => {
        location.reload();
      }, 250);
  }
  update(id: string) {
    this.apiService.update(this.alumno).subscribe((res: any)=> {
      this.obtenerAlumnos();
      alert('Actualizado correctamente');
      this.alumno.nombre=null;
      this.alumno.ap_pat=null;
      this.alumno.ap_mat=null;
      this.alumno.idrfid=null;
    });
    this.modalService.dismissAll();
  }
  borrar(id: string) {
    this.apiService.deleteAsistencia(id).subscribe((res: any)=> {
    });
  }
  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this.router.navigate(['login']);
    }

  }

}
