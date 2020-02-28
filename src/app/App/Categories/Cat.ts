import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Cat.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Cats{
    G:Message []=[];I:MenuItem[]=[];Dis:boolean=false;
    Cats:any[]=[];F:string;E:string;Ori:any[]=[]; exists:boolean=true;ID:string;Usr:string='';
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        this.Categorizer();
    }
    Categorizer(){
        this.F='';
        this.Ori=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                this.Ori.push(I);
            });
        }).subscribe();
        this.Cats=this.Ori;
    }
    Adder(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatIns":1, "Name":this.F}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La categoria se agrego satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();
    }
    Substracter(id:string){
        console.log(id)
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"CatDel":1, "ID":id}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'La categoria se elimino satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();
    }
    Editer(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"CatUpd":1, "Name":this.E, "ID":this.ID}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La Categoria se modifico satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe()
        this.Dis=false;
    }
    Shower(id:string,Nm:string){
        this.Dis=true;
        this.E=Nm;
        this.ID=id;
    }
    Filter(){
        this.Cats = this.Ori.filter(I => I.Name.includes(this.F));
        this.exists = this.Cats.length > 0 ? true : false;
    }
}