import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Prod.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Prods{
    G:Message []=[];I:MenuItem[]=[];USR:string='';
    Cat:SelectItem[]=[];Prod:any[]=[];Pop:boolean=false;Cate:string='';Pno:string='';DesC:string='';
    DesL:string='';ena=true;Ed:boolean=false;ID:string;DesH:string='';CaH:string='';
    F:string[]=[];Ori:any[]=[];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Cat.push({label:I.Name, value:I.Name});
            });
        }).subscribe();
        new Conns(H, R).Connect().then(()=>{
            this.Producer();
        }).catch(R=>{
            this.Producer();
        });
        this.Producer();
    }
    DelProd(ID){
        this.c.confirm({
            message: 'Desea eliminar este producto?',
            accept: ()=>{
                console.log('sup')
                let H = new Headers();
                H.append('Content-Type', 'application/json');
                this.H.post('/api', JSON.stringify({"ProdDel":1, "ID":ID}), {headers:H}).map(R=>{
                    console.log(R.json())
                    if(!R.json().DatabseError){
                        if(R.json().affectedRows='1'){
                            this.Producer();
                            this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'El provedor se elimino satisfactoriamente'});
                        }
                    } else {
                        this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    }
                }).subscribe();
            }
        })
    }
    Edit(P){
        this.Pno=P.PartNo;this.DesC=P.ShortD;this.DesL=P.LongD;this.Cate=P.Cat;this.ID=P.id;this.Ed=true;
        this.DesH=P.DesH;this.CaH=P.CaH;
        console.log(P.id)
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            Temp= Temp.filter(S=>S.PartNo.toLowerCase().includes(I.toLowerCase())||S.LongD.toLowerCase().includes(I.toLowerCase())
        ||S.ShortD.toLowerCase().includes(I.toLowerCase()));
        });
        this.F.length>0 ? this.Prod=Temp : this.Prod=this.Ori;
        /*this.F.length>0 ? this.Prod=this.Ori.filter(S=>S.PartNo.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||S.LongD.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.ShortD.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())) : this.Prod =this.Ori;*/
    }
    Producer(){
        this.Prod=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ProdLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Ori.push(I)
                console.log(I)
            });
        }).subscribe();
        this.Prod=this.Ori;
    }
    Cats(){
        this.Pop=true;
    }
    Adder(){
        this.Ori=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        if(this.Ed){
            this.H.post('/api', JSON.stringify({"ProdUpd":1,"Part":this.Pno,"Short":this.DesC, "Long":this.DesL, "Cat":this.Cate, 'CaH':this.CaH, 'DesH':this.DesH, "ID":this.ID}),{headers:h}).map(R=>{
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Producer();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El Producto se Modifico satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        } else {
            this.H.post('/api', JSON.stringify({"ProdIns":1,"Part":this.Pno,"Short":this.DesC, "Long":this.DesL, "Cat":this.Cate, 'CaH':this.CaH, 'DesH':this.DesH,}),{headers:h}).map(R=>{
                if(!R.json().DatabseError){
                    if(R.json().affectedRows='1'){
                        this.Producer();
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El Producto se agrego satisfactoriamente'});
                    }
                } else {
                    this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                }
            }).subscribe();
        }
        this.Ed=false; this.Pno='';this.DesC='';this.DesL='';this.Cate='';this.DesH='';this.CaH='';
    }
    Upper(){
        if(this.Pno.length>3&&this.DesC.length>1&&this.DesL.length>1&&this.Cate.length>1){
            this.ena=false;
        } else {
            this.ena=true;
        }
    }
}