import { Component,NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Message} from 'primeng/primeng';
import * as firebase from "firebase";
import {Conns} from './../../Conections/Connection';
@Component({
    selector: 'app-root',
    templateUrl: './log.html',
    styleUrls: [
        './../../Frame.css'
        ],
    providers: []
})
export class Login{
    title:string;Usr:string;Pwd:string;I: Message []=[];
    constructor(private H:Http, private R:Router){
        new Conns(H, R).Connect();
    }
    Getter(){
        firebase.database().ref('/Users/'+this.Usr).once('value').then((Z)=>{
            if (Z.val) {
                if (Z.val().Pswd == this.Pwd) {
                    switch(Z.val().Roll){
                        case 222:
                            this.R.navigate(['Auth', Z.val().ID, Z.val().Roll])
                        break;
                        case 333:
                            this.R.navigate(['ComE', Z.val().ID, Z.val().Roll])
                        break;
                        default:
                            this.R.navigate(['main', Z.val().ID, Z.val().Roll]);
                        break;
                    }
                } else {
                    this.I.push({severity:'info',summary:'Error de credenciales', detail:'Usuario y/o contraseña incorrectos'})
                }
            } else {
                this.I.push({severity:'info', summary:'Error de credenciales', detail:'Usuario y/o contraseña incorrectos'})
            }
        });
    }
    Recover(){
        firebase.database().ref('/Users/'+this.Usr).once('value').then((Z)=>{
            Z.val() ? this.Passy(this.Usr, Z.val().Mail) : console.log('Nope');
        })
    }
    Passy(Who:string, Where:string){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/Mail', JSON.stringify({"PRecovery":1, 'RecoverWho':Who, 'RecoverA':Where}),{headers:h}).map(R=>{
        }).subscribe();
    }
}