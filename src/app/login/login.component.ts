import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datas: any = [];
  data = {
	    username:'',
	    password : '',
	    token : ''
  };
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') !== null) {
      this.router.navigate(['asignarasistencia']);
    }
  }

  login() {
  	this.apiService.login(this.data.username, this.data.password).subscribe(res => {
      this.datas = res;
      localStorage.setItem('token', this.datas.token);
      alert('Logueado correctamente');
      this.router.navigate(['asignarasistencia']);
    },
    error=> {
      alert('Credenciales incorrectas');
      this.data.username = '';
      this.data.password = '';
    });
  }

}
