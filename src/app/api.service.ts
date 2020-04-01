import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token '+ localStorage.getItem('token'),
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  obtenerTodosLosAlumnos(): Observable<any> {
  	return this.httpClient.get('http://3.16.113.1:8000/api/v1/alumno/alumno/', httpOptions);
  }
  obtenerAlumno(id: any): Observable<any> {
    return this.httpClient.get('http://3.16.113.1:8000/api/v1/alumno/alumno/'+id, httpOptions);
  }
  obtenerTodosLosRfids(): Observable<any> {
    return this.httpClient.get('http://3.16.113.1:8000/api/v1/rfid/rfid/', httpOptions);
  }
  obtenerAsistencias(): Observable<any> {
    return this.httpClient.get('http://3.16.113.1:8000/api/v1/asistencia/asistencia/', httpOptions);
  }
  addEmployee(employee: any) {
    return this.httpClient.post('http://3.16.113.1:8000/api/v1/alumno/alumno/',{
      nombre: employee.name,
      ap_pat: employee.email,
      ap_mat: employee.phone,
      idrfid: null
    }, httpOptions);
  }

  addRfid(rfid: any) {
    return this.httpClient.post('http://3.16.113.1:8000/api/v1/rfid/rfid/',{
      codigo: rfid,
      status: 'Asignable'
    }, httpOptions);
  }

  login(username2: any, password2: any) {
    return this.httpClient.post('http:///3.16.113.1:8000/api/v1/login/',{
      username: username2,
      password: password2
    });
  }

  deleteAlumno(id: string) {
    return this.httpClient.delete('http://3.16.113.1:8000/api/v1/alumno/alumno/'+id, httpOptions);
  }
  update(alumno: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/alumno/alumno/'+alumno.id,{
      nombre: alumno.nombre,
      ap_pat: alumno.ap_pat,
      ap_mat: alumno.ap_mat
    }, httpOptions);
  }
  update2(idalumno: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/alumno/alumno/'+idalumno,{
      idrfid: null
    }, httpOptions);
  }
  updateAlumno(idAlumno: any, idRfid: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/alumno/alumno/'+idAlumno,{
      idrfid: idRfid
    }, httpOptions);
  }
  updateRfid(rfid: any, idRfid: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/rfid/rfid/'+idRfid,{
      status: 'Asignado',
      idalumno: rfid.idalumno
    }, httpOptions);
  }
  updateRfid2(id: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/rfid/rfid/'+id,{
      status: 'Asignable',
      idalumno: null
    }, httpOptions);
  }
  deleteRfid(id: string) {
    return this.httpClient.delete('http://3.16.113.1:8000/api/v1/rfid/rfid/'+id, httpOptions);
  }
  deleteAsistencia(id: string) {
    return this.httpClient.delete('http://3.16.113.1:8000/api/v1/asistencia/asistencia/'+id, httpOptions);
  }
  addAsistencia(id: any) {
    return this.httpClient.post('http://3.16.113.1:8000/api/v1/asistencia/asistencia/',{
      idalumno: id
    }, httpOptions);
  }
  updateAsistencia(id: any, idtemp: any) {
    return this.httpClient.put('http://3.16.113.1:8000/api/v1/asistencia/asistencia/'+idtemp,{
      idalumno: id
    }, httpOptions);
  }

}
