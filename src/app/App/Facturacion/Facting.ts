import { Component,NgModule, ViewEncapsulation} from '@angular/core';
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
    templateUrl: './Facting.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Fact{
    G:Message []=[];I:MenuItem[]=[];Cots:any[]=[];Ori:any[]=[];USR:string='';F:string[]=[];
    A:any[]=[];Co:boolean;Coin:string='0';Atn:string;Client:string[]=[];Color:number;
    X:string[]=[];User:string[]=[];Exe:string;Cols:any[];Roll='0';
    Kolors:SelectItem[]=[]
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Cotter()
        }).catch(R=>{
            console.log(R)
            R == 'Conn Done' ? this.Cotter() : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
        this.r.params.subscribe((P:Params)=>{
            this.USR = P['id']
            this.Roll = P['Roll']
            this.Kolors = this.Roll=='154' ? [{label:'No aprobadas', value:0},{label:'Aprobadas', value:1}]: [];
        });
        this.Cols = [
            { field: 'id', header: 'Editar' },{ field: 'id', header: 'Numero' },{ field: 'Maker', header: 'Ejecutivo'},
            { field: 'Name', header: 'Nombre' },{ field: 'Cli', header: 'Cliente' },{ field: 'DateG', header: 'Fecha' },
            { field: 'DateG', header: 'Dias Transcurridos' }
        ];
        if(this.Roll == '000'){
            this.Cols.push({ field: 'Fact', header: 'Fact'},{ field: 'Alta', header: 'Alta Completa'} )
        } else {
            this.Roll == '154' ? this.Cols.push({ field: 'Fact', header: 'Fact'}) : (this.Roll == '145'? { field: 'Alta', header: 'Alta Completa'} :null )
        }
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            console.log(I)
            Temp=Temp.filter(S=>S.Title.toLowerCase().includes(I.toLowerCase())||JSON.stringify(S.Content).toLowerCase().includes(I.toLowerCase())
            ||S.Client.toLowerCase().includes(I.toLowerCase())||S.DateG.toLowerCase().includes(I.toLowerCase())||S.Seller.toLowerCase().includes(I.toLowerCase())
            ||S.Directed.toLowerCase().includes(I.toLowerCase()) ||S.ID.toString().includes(I));
        });
        this.F.length>0 ? this.Cots=Temp : this.Cots=this.Ori;
    }
    async Process(A:any) {
        for (let a in A){
            if(((this.Roll == '154'||this.Roll == '000')&&!A[a].Fact)||((this.Roll == '145'||this.Roll == '000')&&!A[a].Alta==true)){
                this.Cots.unshift(A[a])
                this.Cots[0].Client ? null : this.Cots[0].Client='N/A';
                this.Cots[0].Title ? null : this.Cots[0].Title='N/A';
                this.Cots[0].Directed ? null : this.Cots[0].Directed='N/A';
                this.Cots[0].ID ? null : this.Cots[0].ID='N/A';
                this.Cots[0].Fact ? null : this.Cots[0].Fact='';
                this.Cots[0].Alta ? null : this.Cots[0].Alta=false;
            }
        }
        this.Ori=this.Cots.sort((a, b)=>{
            return new Date(b.DateG).valueOf() - new Date(a.DateG).valueOf()
        });
    }
    Cotter(){
        let T = {};
        this.Cots=[];this.Ori=[]
        firebase.database().ref('/Facts').orderByChild('Fact').once('value',Z=>{
            console.log(Z.val())
            this.Process(Z.val());
        })
    }
    Day(D:string,I:string){
        let a =new Date(D)
        return Math.round(Math.abs((+new Date(D).setHours(0,0,0) - +new Date().setHours(0,0,0))/(1000 * 60 * 60 * 24)))
    }
    Altered(a:string,b:string){
        firebase.database().ref('/Facts/'+a).update({
            Fact:b
        }).then().catch(()=>{
            this.Cotter()
            this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
        });
    }
    Altered2(a:string, b:boolean){
        console.log(b)
        firebase.database().ref('/Facts/'+a).update({
            Alta:b
        }).then().catch(()=>{
            this.Cotter()
            this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
        });
    }
    Warn(id:string){
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UNA ORDEN DE FACTURACION, VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: ()=>{
                if(this.USR=='1'||this.USR=='2'||this.USR=='3'||this.USR=='6'){
                    firebase.database().ref('/Facts/'+id).remove().then(()=>{
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La orden se elimino correctamente'});
                        firebase.database().ref('/SysLog/').push('Usuario: '+ this.USR+ ' , Operacion: Elminacion Factura - ' + id +' Hora:' + new Date().toISOString())
                    }).catch(()=>{
                        this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    });
                } else {
                    this.G.push({severity:'error',summary:'Error de Permisos',detail:'No tienes los permisos para borrar facturas!'});
                }
            }
        });
    }
    Colorer(){
        //this.Color == 1 ? []:[];
    }
    Facts(x:string){
        let X;let D1;let Client=['','',''];let D2;
        firebase.database().ref('/Cots/'+x.split('-')[0]).once('value',Z=>{
            console.log(Z.val())
            D1=Z.val();
            console.log(D1)
        }).then(()=>{
            firebase.database().ref('/Facts/'+x).once('value',Z=>{
                D2=Z.val();
                let a= new PDFLIB();
                console.log(D1)
                a.Facts(D1.XData1, D1.Seller, D1.XData2, D2.Content, (D1.ChangeTy ? D1.ChangeTy:'1'),
                 D1.Coin =='1' ? true :false, x , D1.Title, '', D2.Directed, D2.RFC,
                 D2.CFDIUse, D2.MetPag, D2.ForPag ) != 'Failed!' ? console.log('Blup') :
                 this.G.push({severity:'Error', summary:'No se pudo generar el PDF',
                  detail:'Favor de verificar el llenado de campos, y bloqueadores de contenido'});
            });
        });
    }
}