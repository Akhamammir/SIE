import { Component, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Gen.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Catalog{
    Roll= '';
    items: MenuItem[];
    selectedCot: any; User: any = [];
    G: Message []= []; I: MenuItem[]= []; Cots: any[]= []; Ori: any[]= []; USR= ''; F: string[]= []; Cols: any[];
    constructor(private H: Http, private R: Router, private c: ConfirmationService, private r: ActivatedRoute) {
        new Conns(H, R).Connect().then(() => {
            this.Cotter();
        }).catch(R => {
            this.Cotter();
        });
        this.USR = this.r.snapshot.paramMap.get('id');
        this.Roll = this.r.snapshot.paramMap.get('Roll');
        this.Cols = [
            { field: 'id', header: 'Editar' }, { field: 'id', header: 'Numero' }, { field: 'Nom', header: 'Nombre' },
            { field: 'Emp', header: 'Cliente' }, { field: 'dateG', header: 'Fecha' }, { field: 'Exe', header: 'Ejecutivo' }
        ];
        const a = new PDFLIB();
        this.items = [
            { label: 'Ver PDF', icon: 'pi pi-search', command: (event) => {
                firebase.database().ref('/Users').orderByChild('Name').equalTo(this.selectedCot.Seller).once('value', Z=>{
                    console.log(Z.val())
                    const U=Z.val()[Object.keys(Z.val())[0]]
                    this.User.push(U.Name);
                    this.User.push(U.Pos);
                    this.User.push(U.Mail);
                    this.User.push(U.Cel);
                }).then(() => {
                    a.Maker(this.selectedCot.XData1, this.User,
                        this.selectedCot.Content, this.selectedCot.Coin, this.selectedCot.Title, this.selectedCot.ID,
                        this.selectedCot.Nt ? this.selectedCot.Nt : [''], this.selectedCot.Terms, this.selectedCot.DateG);
                } );
                }
            },
            { label: 'Abrir en otra ventana', icon: 'fa fa-window-restore',
             command: (event) => window.open('http://35.227.119.63:4200/Edit/!%3F' + this.selectedCot.ID.toString(16) +
             '-' + this.USR + '/' + this.Roll,
             '_blank') }
        ];
    }
    Filter() {
        let Temp = this.Ori;
        this.F.forEach(I => {
            if (I.includes(':')) {
                console.log('Go');
                Temp = Temp.filter(S => S[I.split(':')[1]].toLowerCase().includes(I.split(':')[0].toLowerCase()) );
            } else {
                console.log('Go2');
                Temp = Temp.filter(S => S.Title.toLowerCase().includes(I.toLowerCase())
                 || JSON.stringify(S.Content).toLowerCase().includes(I.toLowerCase())
                  || S.Client.toLowerCase().includes(I.toLowerCase()) || S.DateG.toLowerCase().includes(I.toLowerCase())
                   || S.Seller.toLowerCase().includes(I.toLowerCase()) || (parseInt(S.id, null)).toString() == I
                    || S.Contact.toLowerCase().includes(I.toLowerCase()) || S.ID.toString().includes(I));
            }
        });
        if (this.F.length > 0) {
            console.log('Hi');
            this.Cots = Temp;
        } else {
            console.log('Hi2');
            this.Cots = this.Ori;
        }
    }
    Warn(id: number) {
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UNA COTIZACION VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: () => {
                firebase.database().ref('/Cots/' + id).remove().then(() => {
                    this.G.push({severity: 'success', summary: 'Eliminacion Completada', detail: 'Se elimino correctamente la cotizacion'});
                    firebase.database().ref('/SysLog/').push('Usuario: ' + this.USR + ' , Operacion: Elminacion Cotizacion - ' +
                    id + ' Hora:' + new Date().toISOString());
                    this.Cotter();
                }).catch(() => {
                    this.G.push({severity: 'error', summary: 'Elminacion no Completada',
                    detail: 'Hubo un Error en camino a la base de datos!'});
                });
            }
        });
    }
    async Process(A: any) {
        for(let I in A){
            this.Ori.unshift(A[I])
            this.Ori[0].ID = I;
            this.Ori[0].Numero = I;
            this.Ori[0].Nombre = this.Ori[0].Title;
            this.Ori[0].Fecha = this.Ori[0].DateG;
            this.Ori[0].Ejecutivo = this.Ori[0].Seller;
            this.Ori[0].Cliente = this.Ori[0].Client;
        }
        this.Cots = this.Ori;
    }
    Cotter() {
        firebase.database().ref('/Cots').orderByChild('DateG').once('value', Z => {
            this.Cots = []; this.Ori = [];
            this.Process(Z.val());
        });
    }
}
