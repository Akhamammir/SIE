import { Component,NgModule, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {MessageService} from 'primeng/api';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import {Conns} from './../../Conections/Connection';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Login.html',
    styleUrls: [
        './Log.css'
        ],
    providers: []
})
export class LoginFSH{
    Usr= ''; Pwd= '';
    constructor(private H: Http, private R: Router, private M: MessageService) {
        new Conns(this.H, this.R).Connect().then(() => {
            console.log('Yo');
        }).catch(Res => {
            console.log(Res);
        });
    }
    Log() {
        const db = firebase.firestore();
        db.collection('Users').doc(this.Usr).get().then(doc => {
            if (doc.exists) {
                if (doc.data().Pwd === this.Pwd) {
                    this.R.navigate(['FSH/Main', doc.data().ID, doc.data().Roll]);
                } else {
                    this.M.add({severity: 'info', summary: 'Error de Credenciales', detail: 'Error en Contraseña o Usuario'})
                }
            } else {
                this.M.add({severity: 'info', summary: 'Error de Credenciales', detail: 'Error en Contraseña o Usuario'})
            }
        });
    }
}
