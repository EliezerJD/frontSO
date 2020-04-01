import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  alumnos: any = [];

  constructor(private apiService: ApiService, public router: Router) {
  }

  obtenerAlumnos() {
  	this.apiService.obtenerTodosLosAlumnos().subscribe(res => {
  		this.alumnos = res;
  	},
  	error=> {
  		console.log(JSON.stringify(error));
  	});
  }
  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
