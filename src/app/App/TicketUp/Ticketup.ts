import { Component, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import {SelectItem} from 'primeng/api';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Ticketup.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Ticketup{
    Map=[];Aide={Gerencia:0, Ventas:1, 'Area de Servicio':2, Administracion:3};Repeat:boolean=false;Several:boolean=false;
    Kind=[];kind:any;Often:number;Long:number;Who:string;Desc:string='';Sdate:Date=new Date();Edate:Date=new Date();
    Full:boolean=false;typingTimer; doneTypingInterval = 650;Clients=[]; Add:boolean[]=[false, false];
    CliN:string='';CBook:any[];ConN:string='';EqT:string='';Brand:string='';Accy:string[]=[];Descr:string;
    STypeOther:string='';SN:string='';PN:string='';EqD:string='';SType:string='Reparacion';Obs:string;
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Events();
        }).catch(R=>{
            this.Events();
        });
        this.Kind = [
            {
                label:'Actividades',
                items:[
                    {label: 'Limpieza de carro', value: {what:'Limpieza de carro',color:'#46EA7D'}},
                    {label: 'Comprar Despensa', value: {what:'Comprar Despensa', color:'#46EA7D'}},
                ]
            },{
                label:'Servicios',
                items:[
                    {label: 'Entrega de equipo', value: {what:'Entrega de equipo', color:'#FFC563'}},
                    {label: 'Servicio en Sitio', value: {what:'Cita con Cliente', color:'#FFC563'}},
                    {label: 'Recepcion de equipo', value: {what:'Recepcion de equipo', color:'#FFC563'}},
                    {label: 'Medicion de consignas', value: {what:'Medicion de consignas', color:'#FFC563'}},
                ]
            },{
                label:'Recordatorios',
                items:[
                    {label: 'Comprar Insumos de evento', value: {what:'Comprar Insumos de evento', color:'#3FA7D6'}},
                    {label: 'Entregar documento', value: {what:'entregar Documento', color:'#3FA7D6'}},
                    {label: 'Solicitar servicio', value: {what:'Solicitar Servicio', color:'#3FA7D6'}},
                ]
            },{
                label:'Procesos',
                items:[
                    {label: 'Realizar Compra', value: {what:'Realizar Compra', color:'#FC4141'}},
                    {label: 'Realizar entrega', value: {what:'Realizar entrega', color:'#FC4141'}},
                    {label: 'Atender a Cliente', value: {what:'Atender a Cliente', color:'#FC4141'}},
                ]
            },{
                label:'Clientes',
                items:[
                    {label: 'Visita a Cliente', value: {what:'Visita a Cliente', color:'#FFC563'}},
                    {label: 'Entrega de Cotizacion', value: {what:'Entrega de Cotizacion', color:'#FFC563'}},
                    {label: 'Llamar', value: {what:'Llamar',color:'#FFC563'}},
                ]
            },{
                label:'Proyectos',
                items:[
                    {label: 'Entrega de Licitacion', value: {what:'Entrega de licitacion', color:'#FC4141'}},
                    {label: 'Realizar Memoria Tecnica', value: {what:'Realizar Memoria Tecnica', color:'#FC4141'}},
                    {label: 'Entrega de proyecto', value: {what:'Entrega de Proyecto', color:'#FC4141'}},
                    {label: 'Visita para Evaluacion', value: {what:'Visita Para evaluacion', color:'#FC4141'}},
                ]
            },{
                label:'Facturas',
                items:[
                    {label: 'Realizar Factura', value: {what:'Realizar Factura', color:'#FC4141'}},
                    {label: 'Refacturar', value: {what:'Refacturar', color:'#FC4141'}},
                ]
            },{
                label:'Compras',
                items:[
                    {label: 'Backorder', value: {what:'Backorder', color:'#3FA7D6'}},
                    {label: 'Pago a Proveedor', value: {what:'Pago a Proveedor', color:'#3FA7D6'}},
                ]
            },{
                label:'Pagos',
                items:[
                    {label: 'Pago de Cliente', value: {what:'Pago de Cliente', color:'#46EA7D'}},
                ]
            },{
                label:'Entregas',
                items:[
                    {label: 'Evento', value: {what:'Evento', color:'#3FA7D6'}},
                ]
            },
        ]
    }
    Events(){
        firebase.database().ref('/Users').orderByChild('ID').startAt(2).once('value', Z=>{
            console.log(Z.val())
            let z = Z.val();
            this.Map=[{label:'Gerencia', items:[]}, {label:'Ventas', items:[]}, {label:'Area de Servicio', items:[]}, {label:'Administracion', items:[]}]
            for (let a in Z.val()){
                this.Map[this.Aide[z[a].Depto]].items.push({label:z[a].Name.replace('_', ' '), value:z[a].Name.replace('_', ' ')})
            }
        })
    }
    types: SelectItem[];Type: number;
    ngOnInit() {
        this.types = [
            {label: 'Interno', value: 1},
            {label: 'Externo', value: 0},
        ];
    }
    KeyUp(OP:OverlayPanel, E:Event, What:string, Where:number){
        if (this.typingTimer) clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout((()=>{
            console.log('Search')
            firebase.database().ref('/'+What).orderByChild('Name').startAt(this.CliN).endAt(this.CliN+'\uf8ff').once('value', Z=>{
                for (let a in Z.val()){
                    this.Clients.push(Z.val()[a])
                }
                OP.show(E)
            }).then(()=>{
                console.log(this.Clients)
                if (this.Clients.length == 0){
                    this.Add[Where]=true;
                } else {
                    this.Add[Where]=false;
                }
            })
        }), this.doneTypingInterval);
    }
    KeyDown(){
        if (this.typingTimer) clearTimeout(this.typingTimer);
        this.Clients=[];
    }
    Up(Where:string){
        firebase.database().ref('/'+Where).push({Name:this.CliN})
    }
    Test(){
        console.log(this.SType);
        firebase.database().ref('/BitacoraServicios').orderByChild('ID').once('value', Z=>{
            console.log(Z.val()[0].ID)
            firebase.database().ref('/BitacoraServicios').push({Name:this.CliN, Cont:this.ConN, EqT:this.EqT, Brand: this.Brand,
                EqD:this.EqD, SNo: this.SN, PNo: this.PN, Obs:this.Obs, Desc:this.Descr, SType:this.SType, Accy: this.Accy, ID:Z.val()[0].ID++ })
        })
    }
    Ticket(){
        this.r.params.subscribe((P:Params)=>{
            let event;let id:number;
            firebase.database().ref('/Users').orderByChild('Name').equalTo( this.Who).once('value',Z=>{
                event = {
                    start:new Date(this.Sdate + " +00:00").toISOString(),
                    title: Z.val()[Object.keys(Z.val())[0]].Name + ': ' + this.kind.what,
                    allDay:this.Full,
                    color:this.kind.color,
                    textColor:'#232323',
                    Description:this.Desc,
                    Owner:P['id']
                };
                id=Z.val()[Object.keys(Z.val())[0]].ID;
                this.Several ? event.end = new Date(this.Edate).toISOString(): null;
            }).then(()=>{
                let date = new Date(this.Sdate + "+00:00"); let Aide = []
                let date2= this.Several ? new Date(this.Edate + "+00:00"): null;
                if(this.Repeat){
                    while(this.Long > 0){
                        Aide.push(JSON.parse(JSON.stringify(event)))
                        date.setDate(date.getDate()+ +this.Often)
                        event.start = date.toISOString();
                        if (this.Several){
                            date2.setDate(date2.getDate()+ +this.Often)
                            event.end = date2.toISOString();
                        }
                        this.Long-=this.Often;
                    }
                    firebase.database().ref('/Users').orderByChild('Name').equalTo(this.Who).once('value',Z=>{
                        firebase.database().ref('/Events/'+Z.val()[Object.keys(Z.val())[0]].ID).once('value', Z=>{
                            let a = Z.val() == null ? [] : Z.val();
                            a.push(event)
                            firebase.database().ref('/Events/'+P['id']).set(a)
                        })
                    })
                    firebase.database().ref('/Events/'+P['id']).once('value', Z=>{
                        let a = Z.val() == null ? [] : Z.val();
                        Array.prototype.push.apply(a, Aide)
                        firebase.database().ref('/Events/'+P['id']).set(a)
                    })
                } else {
                    firebase.database().ref('/Events/'+P['id']).once('value', Z=>{
                        let a = Z.val() == null ? [] : Z.val();
                        a.push(event)
                        firebase.database().ref('/Events/'+P['id']).set(a)
                    }).then(()=>{
                        firebase.database().ref('/Events/'+id).once('value', Z=>{
                            console.log('Yo');
                            
                            let a = Z.val() == null ? [] : Z.val();
                            a.push(event)
                            firebase.database().ref('/Events/'+id).set(a)
                        })
                    })
                }
                this.Repeat=false;this.Several=false;this.Full=false;this.kind=null;this.Often=null;this.Long=null;this.Who=null;
                this.Desc='';this.Sdate=new Date();this.Edate=new Date();
            })
        })
    }
}