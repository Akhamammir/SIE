import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
import { Cot } from '../Cotizations/Cots';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Tlist.html',
    styleUrls: ['./../../Frame.css'],
    styles: [`
    .Success {
        border-radius: 6px;
        background-color:#46EA7D;
        font-weight:bold;
        margin-right:5px;
    }
    .Info {
        border-radius: 6px;
        background-color:#3FA7D6;
        font-weight:bold;
        margin-right:5px;
    }
    .Error {
        border-radius: 6px;
        background-color:#FC4141;
        font-weight:bold;
        margin-right:5px;
    }
    `],
    providers: [ConfirmationService]
})
export class TCatalog{
    G:Message []=[];I:MenuItem[]=[];Cots:any[]=[];Ori:any[]=[];USR:string='';F:string[]=[];Cols:any[];
    Who:string=''; What:string=''; When:string=''; Detail:string=''; status:boolean=false; DateC:string='';
    display:boolean=false;Index:string='';Pointer:string='';Notes:any[]=[];CNote='';TNote='Info';
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        this.r.params.subscribe((P:Params)=>{
            this.USR = P['id']
            new Conns(H, R).Connect().then(()=>{
                this.Cotter();
            }).catch(R=>{
                this.Cotter();
            });
        })
        this.Cols = [
            { field: 'id', header: 'Ver' },{ field: 'title', header: 'Evento' },{ field: 'start', header: 'Fecha' },{ field: 'status', header: 'Status' },{ field: 'start', header: 'Tiempo Transcurrido' }
        ];
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            console.log(I)
            Temp= Temp.filter(S=>S.title.toLowerCase().includes(I.toLowerCase())||S.Description.toLowerCase().includes(I.toLowerCase())
            ||S.start.toLowerCase().includes(I.toLowerCase())||(S.status ? 'Completado':'En Proceso').toLowerCase().includes(I.toLowerCase()) )
        });
        this.F.length>0 ? this.Cots=Temp : this.Cots=this.Ori;
    }
    Warn(date:string){
        this.c.confirm({
            message: 'AVISO: SE ELIMINARA UN TICKET VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: ()=>{
                let Temp = this.Ori;
                Temp.splice(Temp.indexOf(Temp.find(S=>S.start==date)), 1);
                firebase.database().ref('/Events/'+ +this.USR).set(this.Ori)
            }
        });
    }
    async Process(A:any) {
        for(let I in A){
            this.Cots.unshift(A[I])
            this.Cots[0].id = I;
            this.Ori=this.Cots;
        }
    }
    Cotter(){
        console.log(this.USR);
        firebase.database().ref('/Events/'+this.USR).once('value',Z=>{
            this.Cots=[];this.Ori=[];
            //this.Process(Z.val());
            this.Ori=Z.val();
            this.Cots=this.Ori
        });
    }
    Day(D:string, d:string){
        let a =new Date(D)
        return Math.round(Math.abs((+new Date(D).setHours(0,0,0) - +new Date(d).setHours(0,0,0))/(1000 * 60 * 60 * 24)))
    }
    Show(Owner:number, title:string, start:string, Description:string, 
         status:boolean, statusdate:string, Notes:any[]) {
             console.log(Notes)
        firebase.database().ref('/Users/').orderByChild('ID').equalTo(+Owner).once('value',Z=>{
            this.Who= 'Encargo de: '+ Z.val()[Object.keys(Z.val())[0]].Name
            this.What=title;
            this.When= new Date(start).toLocaleString('en-US', 
             { hour: 'numeric', minute: 'numeric', hour12: true, timeZone:'UTC' })
            this.Detail = Description;
            this.status = status ? status : false;
            this.Notes = Notes ? Notes : [];
            this.DateC = 'Completado el: ' + new Date(statusdate).toLocaleDateString('es-ES') + ' a las, '+ new Date(statusdate).toLocaleString('en-US', 
            { hour: 'numeric', minute: 'numeric', hour12: true, timeZone:'UTC' })
            this.display = true;
            this.Index= start;
            this.Pointer= title.split(':')[0]
        })
        //e.jsEvent = Browser click event
        //e.view = Current view object
    }
    ProcessNote(){
        this.Notes.push({Note:this.CNote, Date:new Date().toISOString(), Type:this.TNote})
        this.CNote='';
        this.r.params.subscribe((P:Params)=>{
            firebase.database().ref('/Events/'+P['id']).orderByChild('start').equalTo(this.Index).once('value',Z=>{
                firebase.database().ref('/Events/'+P['id']+'/'+Object.keys(Z.val())[0]).update({statusnotes:this.Notes}).then(()=>{
                    firebase.database().ref('/Users/').orderByChild('Name').equalTo(this.Pointer).once('value',X=>{
                        firebase.database().ref('/Events/'+X.val()[Object.keys(X.val())[0]].ID).orderByChild('start').equalTo(this.Index).once('value',Y=>{
                            firebase.database().ref('/Events/'+X.val()[Object.keys(X.val())[0]].ID+'/'+Object.keys(Y.val())[0]).update({
                                  statusnotes:this.Notes}).then(()=>{
                                this.G.push({severity:'success', summary:'Exito', detail:'Nota registrada exitosamente'})
                            })
                        })
                    })
                }).catch(()=>{
                    this.G.push({severity:'error', summary:'Fracaso', detail:'No se pudo completar la operacion intentelo mas tarde :c'})
                })
            })
        })
        console.log(this.Notes)
    }
    Complete(){
        this.r.params.subscribe((P:Params)=>{
            firebase.database().ref('/Events/'+P['id']).orderByChild('start').equalTo(this.Index).once('value',Z=>{
                firebase.database().ref('/Events/'+P['id']+'/'+Object.keys(Z.val())[0]).update({status:true, statusdate:new Date().toISOString()}).then(()=>{
                    firebase.database().ref('/Users/').orderByChild('Name').equalTo(this.Pointer).once('value',X=>{
                        firebase.database().ref('/Events/'+X.val()[Object.keys(X.val())[0]].ID).orderByChild('start').equalTo(this.Index).once('value',Y=>{
                            firebase.database().ref('/Events/'+X.val()[Object.keys(X.val())[0]].ID+'/'+Object.keys(Y.val())[0]).update({status:true, statusdate:new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString() }).then(()=>{
                                this.G.push({severity:'success', summary:'Exito', detail:'Servicio completado exitosamente'})
                            })
                        })
                    })
                }).catch(()=>{
                    this.G.push({severity:'error', summary:'Fracaso', detail:'No se pudo completar la operacion intentelo ams tarde :c'})
                })
            })
        })
    }
}