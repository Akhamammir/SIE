import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './GenR.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class CatalogR{
    G:Message []=[];I:MenuItem[]=[];Cots:any[]=[];Ori:any[]=[];USR:string='';F:string[]=[];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        this.Cotter();
        this.r.params.subscribe((P:Params)=>{
            this.USR = P['id']
        })
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            console.log(I)
            Temp= Temp.filter(S=>S.Nom.toLowerCase().includes(I.toLowerCase())||JSON.stringify(S.Cont).toLowerCase().includes(I.toLowerCase())
            ||S.Emp.toLowerCase().includes(I.toLowerCase())||S.dateG.toLowerCase().includes(I.toLowerCase())||S.Contact.toLowerCase().includes(I.toLowerCase())
            ||(parseInt(S.id)+1000).toString()==I|| S.Exe.toLowerCase().includes(I.toLowerCase()))
        });
        this.F.length>0 ? this.Cots=Temp : this.Cots=this.Ori;
        /*this.F.length>0 ? this.Cots=this.Ori.filter(S=>S.Nom.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||JSON.stringify(S.Cont).toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.Emp.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||S.dateG.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||S.Contact.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||(parseInt(S.id)+1000).toString()==this.F[this.F.length-1]|| S.Exe.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())) : this.Cots =this.Ori;*/
    }
    Deletdis(id:number){
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CotsDel":1, "ID":id}),{headers:H}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.G.push({severity:'success',summary:'Cotizacion eliminada', detail:'Eliminado con exito'});
                    this.Cotter();
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();
    }
    Warn(id:number){
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UNA COTIZACION VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: ()=>{
                this.Deletdis(id)
            }
        });
    }
    Cotter(){
        this.Cots=[];
        let H = new Headers();
        H.append('Content-Type', 'application/json');
         this.H.post('/api', JSON.stringify({"RelLst":1}),{headers:H}).map(R=>{
             R.json().forEach(I=>{
                 console.log(I)
                 this.Ori.push(I)
             });
             this.Cots=this.Ori.reverse();
        }).subscribe();
    }
    View(N:number){
        let a= new PDFLIB();
        a.Sends(JSON.parse(this.Ori[N-1].body), this.Ori[N-1].id, this.Ori[N-1].Fecha)
    }
}