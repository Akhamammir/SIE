import { Component, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './GenP.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Pactalog{
    G:Message []=[];I:MenuItem[]=[];Cots:any[]=[];Ori:any[]=[];USR:string='';F:string[]=[];
    A:any[]=[];Co:boolean;Coin:string='0';Atn:string;Client:string[]=[];Color:number=3;
    X:string[]=[];User:string[]=[];Exe:string;Cols:any[];
    Kolors:SelectItem[]=[{label:'Sin comision', value:0},{label:'Con Comision', value:1},{label:'Todas', value:3}];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Cotter();
        }).catch( Res => {
            console.log(Res)
            Res == 'Conn Done' ? this.Cotter() : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
        this.r.params.subscribe((P:Params)=>{
            this.USR = P['id']
        });
        this.Cols = [
            { field: 'id', header: 'Editar' },{ field: 'id', header: 'Numero' },{ field: 'Maker', header: 'Ejecutivo'},
            { field: 'Name', header: 'Nombre' },{ field: 'Cli', header: 'Cliente' },{ field: 'DateG', header: 'Fecha' },
            { field: 'DateG', header: 'Dias Transcurridos' },{ field: 'Approved', header: 'Aprobado'}
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
                Temp = Temp.filter(S => S.Prov[0].toLowerCase().includes(I.toLowerCase())
                 || JSON.stringify(S.Content).toLowerCase().includes(I.toLowerCase())
                  || S.SendA[0].toLowerCase().includes(I.toLowerCase()) || S.DateG.toLowerCase().includes(I.toLowerCase())
                   || S.PO.toLowerCase().includes(I.toLowerCase()));
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
    Colorer() {
        let Temp = this.Ori;
        this.Cots=[]
        this.Color != 3 ? Temp.forEach(I=>{
            I.Commission == 0 ? (this.Color ==0 ? this.Cots.push(I) : null) : (this.Color ==1 ? this.Cots.push(I) : null)
        }) : this.Cots=this.Ori;
        console.log(this.Ori);
        
    }
    async Process(A:any) {
        for (let a in A){
            this.Ori.unshift(A[a])
            this.Ori[0].Prov ? (this.Ori[0].Prov ? this.Ori[0].Prov.forEach(i=>{
                i == undefined ? i='N/A' : null;
            }) : null) : this.Ori[0].Prov = ['No hay informacion'];
            this.Ori[0].SendA ? (this.Ori[0].SendA ? this.Ori[0].SendA.forEach(i=>{
                i == undefined ? i='N/A' : null;
            }) : null) : this.Ori[0].SendA = ['No hay informacion'];
            this.Ori[0].OC = this.Ori[0].PO;
            this.Ori[0].Proveedor = this.Ori[0].Prov[0];
            this.Ori[0]['Entrega En'] = this.Ori[0].SendA[0];
            this.Ori[0].Fecha = this.Ori[0].DateG;
        }
        this.Cots = this.Ori;
    }
    Cotter() {
        firebase.database().ref('/POs').orderByChild('PO').once('value', Z => {
            console.log(Z.val())
            this.Process(Z.val());
        })
    }
    Day(D:string,I:string){
        let a =new Date(D)
        return Math.round(Math.abs((+new Date(D).setHours(0,0,0) - +new Date().setHours(0,0,0))/(1000 * 60 * 60 * 24)))
    }
    Warn(id:string, PO){
        console.log(id)
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UNA ORDEN DE COMPRA, VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: ()=>{
                if(this.USR=='1'||this.USR=='2'||this.USR=='3'||this.USR=='6'||this.USR=='13'){
                    firebase.database().ref('/POs/'+PO.split('PO-000')[1]).remove().then(()=>{
                        this.Cots[id].Content.forEach(i=>{
                            let ID = i.ID.split('')
                            let Where = ID.pop();
                            ID.pop()
                            firebase.database().ref('/Facts/'+ID.join('')+'/Content/'+Where+'/PO').remove();
                            console.log(Where, ID.join(''))
                        })
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La orden se elimino correctamente'});
                        firebase.database().ref('/SysLog/').push('Usuario: '+ this.USR+ ' , Operacion: Elminacion OC - ' + id +' Hora:' + new Date().toISOString())
                    }).catch(()=>{
                        this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    });
                } else {
                    this.G.push({severity:'error',summary:'Error de Permisos',detail:'No tienes los permisos para borrar facturas!'});
                }
            }
        });
    }
    POs(PO, Prov, Delv, Cont, N, Date){
        let a = new PDFLIB().Builder(PO, Delv, Prov, Cont, N, Date);
    }
}