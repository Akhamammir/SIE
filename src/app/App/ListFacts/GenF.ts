import { Component, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './GenF.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class FactalogComponent {
    G: Message []= []; I: MenuItem[]= []; Cots: any[]= []; Ori: any[]= []; USR= ''; F: string[]= [];
    A: any[]= []; Co: boolean; Coin= '0'; Atn: string; Client: string[]= []; Color: number; Canceller= '';
    Accept= 'Entiendo y acepto la cancelacion de la factura'; Why= ''; Hist= []; Roll= '';
    X: string[]= []; User: string[]= []; Exe: string; Cols: any[]; PDFName= ''; W= window;
    display= false; Delete= ''; display2= false;
    Kolors: SelectItem[]= [{label: 'No Facturadas', value: 0}, {label: 'Facturadas', value: 1}, {label: 'Todas', value: -1}];
    constructor(private H: Http, private R: Router, private c: ConfirmationService, private r: ActivatedRoute) {
        new Conns(H, R).Connect().then(() => {
            this.Cotter();
        }).catch(Res => {
            console.log(Res);
            Res === 'Conn Done' ? this.Cotter() : this.G.push({severity: 'Error', summary: 'Error de conexion',
             detail: 'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
        this.r.params.subscribe((P: Params) => {
            this.USR = P['id'];
            this.Roll = P['Roll'];
        });
        this.Cols = [
            { field: 'ID', header: 'Numero' }, { field: 'Alta', header: 'Alta Completa'},
            { field: 'Fact', header: 'Factura' }, { field: 'Client', header: 'Cliente' },
            { field: 'Title', header: 'Nombre' }, { field: 'Seller', header: 'Ejecutivo'}, { field: 'DateG', header: 'Fecha' }
        ];
    }
    Filter() {
        let Temp = this.Ori;
        Temp.forEach(I=>{
          if(JSON.stringify(I.Content) == undefined){
            console.log(JSON.stringify(I.Content), '::', I);
          }
        })
        this.F.forEach(I => {
            if (I.includes(':')) {
                console.log('Go');
                Temp = Temp.filter(S => S[I.split(':')[1]].toLowerCase().includes(I.split(':')[0].toLowerCase()) );
            } else {
                Temp = Temp.filter(S => S.Title.toLowerCase().includes(I.toLowerCase())
                 || JSON.stringify(S.Content).toLowerCase().includes(I.toLowerCase())
                  || S.Client.toLowerCase().includes(I.toLowerCase()) || S.DateG.toLowerCase().includes(I.toLowerCase())
                   || S.Seller.toLowerCase().includes(I.toLowerCase())
                    || S.Directed.toLowerCase().includes(I.toLowerCase()) || S.ID.toString().includes(I));
            }
        });
        if (this.F.length > 0) {
            console.log('Hi');
            this.Cots = Temp;
        } else {
            console.log('Hi2');
            this.Cots = this.Ori;
        }
        if (this.Color === 0 || this.Color === 1) {
            this.Colorer();
        }
    }
    async Process(A: any) {
        Object.keys(A).forEach(a => {
            this.Ori.unshift(A[a]);
            // this.Ori[0].Approved == true || 1 ? true: false;
            this.Ori[0].Seller = this.Ori[0].Seller ? this.Ori[0].Seller : 'N/A';
            this.Ori[0].Client = this.Ori[0].Client ? this.Ori[0].Client : 'N/A';
            this.Ori[0].Title = this.Ori[0].Title ? this.Ori[0].Title : 'N/A';
            this.Ori[0].Directed = this.Ori[0].Directed ? this.Ori[0].Directed : 'N/A';
            this.Ori[0].ID = this.Ori[0].ID ? this.Ori[0].ID : console.log(a, this.Ori[0]);
            this.Ori[0].Fact = this.Ori[0].Fact ? this.Ori[0].Fact : '-';
            this.Ori[0].Fecha = this.Ori[0].DateG;
            this.Ori[0].Ejecutivo = this.Ori[0].Seller;
            this.Ori[0].Nombre = this.Ori[0].Title;
            this.Ori[0].Cliente = this.Ori[0].Client;
            this.Ori[0].Numero = this.Ori[0].ID;
            this.Ori[0].Factura = this.Ori[0].Fact;
        });
        /*for (let a in A){
            this.Cots.unshift(A[a])
            this.Cots[0].Approved == true || 1 ? true: false;
            this.Cots[0].Client ? null : this.Cots[0].Client='N/A';
            this.Cots[0].Title ? null : this.Cots[0].Title='N/A';
            this.Cots[0].Directed ? null : this.Cots[0].Directed='N/A';
            this.Cots[0].ID ? null : this.Cots[0].ID='N/A';
            this.Cots[0].Fact ? null : this.Cots[0].Fact='-';
            if (this.Cots[0].Cancel) {
                v
            }
        }*/
        this.Cots = this.Ori.sort((a, b) => {
            return new Date(b.DateG).valueOf() - new Date(a.DateG).valueOf();
        });
    }
    Cotter() {
        firebase.database().ref('/Facts').once('value', Z => {
            console.log(Z.val());
            this.Process(Z.val());
        });
    }
    Day(D: string, I: string) {
        const a = new Date(D);
        return Math.round(Math.abs((+new Date(D).setHours(0, 0, 0) - +new Date().setHours(0, 0, 0)) / (1000 * 60 * 60 * 24)));
    }
    Warn(id: string) {
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UNA ORDEN DE FACTURACION, VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: () => {
                if (this.Roll == '000') {
                    firebase.database().ref('/Facts/' + id).remove().then(() => {
                        this.G.push({severity: 'success', summary: 'Modificacion Completada', detail: 'La orden se elimino correctamente'});
                        firebase.database().ref('/SysLog/')
                        .push('Usuario: ' + this.USR + ' , Operacion: Elminacion Factura - ' + id + ' Hora:' + new Date().toISOString());
                    }).catch(() => {
                        this.G.push({severity: 'error', summary: 'Error de Modificacion',
                         detail: 'Estabamos en camino a la base de datos y ocurrio un error!'});
                    });
                } else {
                    this.G.push({severity: 'error', summary: 'Error de Permisos', detail: 'No tienes los permisos para borrar facturas!'});
                }
            }
        });
    }
    Namer(ID, Fact) {
        this.PDFName = 'F' + ID + Fact;
        console.log(this.PDFName);
    }
    REg(ID) {
        firebase.database().ref('/Facts/' + ID).update({FactFile: this.PDFName});
    }
    Cancel(ID) {
        console.log(ID);
        this.Delete = ID;
        this.display = true;
    }
    DeleteFact() {
        firebase.database().ref('/Facts/' + this.Delete + '/Fact').remove();
        firebase.database().ref('/Facts/' + this.Delete + '/FactFile').remove();
        firebase.database().ref('/Facts/' + this.Delete + '/Cancel').once('value', Z => {
            const b = Z.val() ?  Object.keys(Z.val()).length : 0;
            firebase.database().ref('/Facts/' + this.Delete + '/Cancel').update(
                {[b]: { Message: this.Why, Date: new Date().toDateString() }}
            );
            this.display = false;
            this.Why = ''; this.Canceller = '';
        });
    }
    ShowHist(Cancels) {
        this.Hist = Cancels;
        this.display2 = true;
    }
    Facts(x: string) {
        let D1; let D2;
        firebase.database().ref('/Cots/' + x.split('-')[0]).once('value', Z => {
            D1 = Z.val();
        }).then(() => {
            firebase.database().ref('/Facts/' + x).once('value', Z => {
                D2 = Z.val();
                const a = new PDFLIB();
                a.Facts(D1.XData1, D1.Seller, D1.XData2, D2.Content, (D1.ChangeTy ? D1.ChangeTy : '1') ,
                 D1.Coin == '1' ? true : false, x , D1.Title, '', D2.Directed, D2.RFC,
                 D2.CFDI, D2.PayMet, D2.PayFor ) !== 'Failed!' ? console.log('Blup') :
                  this.G.push({severity: 'Error', summary: 'No se pudo generar el PDF',
                  detail: 'Favor de verificar el llenado de campos, y bloqueadores de contenido'});
            });
        });
    }
    Colorer() {
        switch (this.Color) {
            case 0:
            console.log(this.F.length);
                this.Cots = this.F.length > 0 ? this.Cots.filter(S => S.Fact == '-') : this.Ori.filter(S => S.Fact == '-');
            break;
            case 1:
            console.log(this.F.length);
            this.Cots = this.F.length > 0 ? this.Cots.filter(S => S.Fact != '-') : this.Ori.filter(S => S.Fact != '-');
            break;
            default:
                this.Cots = this.Ori;
                this.Filter();
            break;
        }
    }
}
