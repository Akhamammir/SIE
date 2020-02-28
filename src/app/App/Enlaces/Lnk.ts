import { Component,NgModule, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Lnk.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Links{
    G:Message []=[];I:MenuItem[]=[];Dis:boolean=false;ED:boolean=false;
    Cats:any[]=[];F:string;E:string;Ori:any[]=[]; exists:boolean=true;ID:string;Usr:string='';D:string='';
    @Output() A:EventEmitter<string> = new EventEmitter<string>();
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        this.Categorizer();
    }
    Categorizer(){
        this.F='';
        this.Ori=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"LnkLst":1}),{headers:h}).map(R=>{
            R.json().forEach(I=>{
                console.log(I)
                this.Ori.push(I);
            });
        }).subscribe();
        this.Cats=this.Ori;
    }
    Adder(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"LnkIns":1, "Name":this.E, 'Lnk':this.D}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Adicion Completada', detail:'El enlace se agrego satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();this.D='';
        this.A.emit('Linked');
    }
    Substracter(id:string){
        console.log(id)
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"LnkDel":1, "ID":id}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Eliminacion Completada', detail:'La categoria se elimino satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Eliminacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe();
        this.A.emit('Linked');
    }
    Editer(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api',JSON.stringify({"LnkUpd":1, "Name":this.E, 'Lnk':this.D ,"ID":this.ID}), {headers:h}).map(R=>{
            if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.Categorizer();
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'La Categoria se modifico satisfactoriamente'});
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        }).subscribe()
        this.Dis=false;this.D='';this.ED=false;
        this.A.emit('Linked');
    }
    Shower(id?:string,Nm?:string){
        this.Dis=true;
        this.E = Nm ?  Nm: '';
        this.ID= id ? id : '';
        this.F = '';
        this.ED=true;
    }
    Filter(){
        this.Cats = this.Ori.filter(I => I.Name.includes(this.F));
        this.exists = this.Cats.length > 0 ? true : false;
    }
}