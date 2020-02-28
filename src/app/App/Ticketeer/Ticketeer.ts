import { Component, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http } from '@angular/http';
import { Message, ConfirmationService} from 'primeng/primeng';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Ticketeer.html',
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
export class Ticketeer{
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Events();
        }).catch(R=>{
            this.Events();
        });
    }
    events: any[]=[];header: any;display: boolean = false;Who:string='';When:any={Hour:'', Day:'', Weekday:'', Year:'', Month:''};What:string='';
    Detail:string='';Index:string='';G: Message[] = [];Pointer:string;status:boolean;DateC:string='';
    Notes:any[]=[];CNote='';TNote='Info';
    Events(){
        this.r.params.subscribe((P:Params)=>{
            firebase.database().ref('/Events/'+P['id']).once('value', Z=>{
                if (Z.val() != null){
                    Z.val().forEach(I=>{
                        this.events.push(I)
                    })
                }
            })
        })
    }
    ngOnInit() {
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }
    handleEventClick(e) {
        firebase.database().ref('/Users/').orderByChild('ID').equalTo(+e.calEvent.Owner).once('value',Z=>{
            this.Who=Z.val()[Object.keys(Z.val())[0]].Name
            this.What=e.calEvent.title;
            this.When= { Hour:new Date(e.calEvent.start['_i']).toLocaleString('en-US', 
             { hour: 'numeric', minute: 'numeric', hour12: true, timeZone:'UTC' }),
            Day: new Date(e.calEvent.start['_i']).toLocaleDateString('es-ES', {day: 'numeric'}),
            Weekday: new Date(e.calEvent.start['_i']).toLocaleDateString('es-ES', {weekday: 'long'}),
            Month: new Date(e.calEvent.start['_i']).toLocaleDateString('es-ES', {month: 'long'}),
            Year: new Date(e.calEvent.start['_i']).toLocaleDateString('es-ES', {year: 'numeric'}),}
            this.Detail = e.calEvent.Description;
            this.status = e.calEvent.status ? e.calEvent.status : false;
            this.Notes = e.calEvent.statusnotes ? e.calEvent.statusnotes : [];
            this.DateC = 'Completado el: ' + new Date(e.calEvent.statusdate).toLocaleDateString('es-ES') + ' a las, '+ new Date(e.calEvent.statusdate).toLocaleString('en-US', 
            { hour: 'numeric', minute: 'numeric', hour12: true, timeZone:'UTC' })
            this.display = true;
            this.Index= e.calEvent.start['_i'];
            this.Pointer= e.calEvent.title.split(':')[0]
        })
        console.log(e)
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
                            firebase.database().ref('/Events/'+X.val()[Object.keys(X.val())[0]].ID+'/'+Object.keys(Y.val())[0]).update({status:true,
                                 statusdate:new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
                                  statusnotes:(this.Notes.length ==0 ? null : this.Notes) }).then(()=>{
                                this.G.push({severity:'success', summary:'Exito', detail:'Servicio completado exitosamente'})
                            })
                        })
                    })
                }).catch(()=>{
                    this.G.push({severity:'error', summary:'Fracaso', detail:'No se pudo completar la operacion intentelo mas tarde :c'})
                })
            })
        })
    }
}