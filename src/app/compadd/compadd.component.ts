import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compadd',
  templateUrl: './compadd.component.html',
  styleUrls: ['./compadd.component.css']
})
export class CompaddComponent implements OnInit {

	employee = {
	    id:'',
	    name : '',
	    email : '',
	    phone : ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this.router.navigate(['login']);
    }
  }
  addEmployee() {
    this.apiService.addEmployee(this.employee).subscribe((res: any)=> {
      alert('Registrado correctamente');
      this.employee.name=null;
      this.employee.email=null;
      this.employee.phone=null;
    });
  }
}
