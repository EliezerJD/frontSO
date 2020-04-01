import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { switchMap } from 'rxjs/operators';
import { WebsocketService } from 'src/app/websocket.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addrfid',
  templateUrl: './addrfid.component.html',
  styleUrls: ['./addrfid.component.css']
})
export class AddrfidComponent implements OnInit {
  rfids: any = [];
  rfid = {
	 id: '',
	 codigo : ''
  };
  constructor(private apiService: ApiService, public wsService: WebsocketService, private router: Router) {
    this.obtenerRfids();
  }

  ngOnInit() {
    if( localStorage.getItem('token') === null ) {
      this.router.navigate(['login']);
    }
  }

  getMessages() {
    return this.wsService.listen('mensaje-response');
  }

  addRfid() {
    let encontrado = false;
    for(const valor of this.rfids) {
      console.log(valor.codigo);
      if(valor.codigo === this.rfid.codigo) {
        alert('Ya existe este RFID');
        encontrado = true;
        break;
      }
    }
    if(encontrado === false) {
      this.apiService.addRfid(this.rfid.codigo).subscribe((res: any)=> {
        this.wsService.sendMessage('1');
      });
      setTimeout(() => {
      this.rfid.codigo='';
      alert('Registrado correctamente');
      this.rfids=null;
      this.obtenerRfids();
      }, 1000);
    }
  }

  obtenerRfids() {
    this.apiService.obtenerTodosLosRfids().subscribe(res => {
      this.rfids = res;
    },
    error=> {
      console.log(JSON.stringify(error));
    });
  }
}
