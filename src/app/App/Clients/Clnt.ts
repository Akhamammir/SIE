import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService, OverlayPanel} from 'primeng/primeng';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Clnt.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Clnt{
    I:MenuItem[]=[];Pro:any[]=[];States:SelectItem[]=[];Cont:string[]=[];G:Message []=[];B:Array<{ID:number, Nom:'', Cargo:string,Tel:Array<{ID:number,Tel:string, T:string}>, Mail:Array<{ID:number,Mail:string,T:string}>}>=[];Cels:Array<{ID:number,Cel:string[]}>=[];Mails:string[]=[];
    Nm:string='';Dir:string='';Ra:string='';C:string='';Estado:string='';ID:string;CP:string='';RFC:string='';ena:boolean=true;Conts:string; Edit:boolean=false;USR:string='';Tel:string='';
    D:Array<{Bank:string, Succ:string, Dir:string, Acc:string, Clab:string, Ref:string, K:boolean, ID:number}>=[];Col:string='';
    E:Array<{Resp:string[], Add:string[], ID:number}>=[];
    F:string[]=[];Ori:any[]=[];
    P2:any[]=[];Uno:Boolean=true;One:SelectItem[]=[];Two:SelectItem[]=[];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Tabler();
        }).catch(R=>{
            this.Tabler();
        });
    }
    ngOnInit(){
        this.B.push({ID:this.B.length, Nom:'', Cargo:'', Tel:[{ID:0,Tel:'', T:'2'}], Mail:[{ID:0,Mail:'',T:'1'}]});
        this.D.push({Bank:'', Succ:'', Dir:'', Acc:'',Clab:'',Ref:'',K:false, ID:0});
        this.E.push({Resp:['',''], Add:['','','','',''], ID:0});
        this.Cont.push('');
        this.Mails.push('');
        this.Cels.push({ID:this.Cels.length, Cel:['']});
        this.States.push({label:'Aguascalientes', value:'Aguascalientes'}, {label:'Baja California', value:'Baja California'}, {label:'Baja California Sur', value: 'Baja California Sur'}, {label:'Campeche', value:'Campeche'}, {label:'Chiapas', value:'Chiapas'}, {label:'Chihuahua', value:'Chihuahua'}, {label:'CDMX', value:'CDMX'}, {label:'Coahuila', value:'Coahuila'}, {label:'Colima', value:'Colima'}, {label:'Durango', value:'Durango'}, {label:'Estado de Mexico', value:'Estado de Mexico'}, {label:'Guanajuato', value:'Guanajuato'}, {label: 'Guerrero', value:'Guerrero'}, {label:'Hidalgo', value:'Hidalgo'}, {label:'Jalisco', value:'Jalisco'}, {label:'Michoacan', value:'Michoacan'}, {label:'Morelos', value:'Morelos'}, {label:'Nayarit', value:'Nayarit'}, {label:'Nuevo Leon', value:'Nuevo Leon'}, {label:'Oaxaca', value:'Oaxaca'}, {label:'Puebla', value:'Puebla'}, {label:'Queretaro', value:'Queretaro'}, {label: 'Quintana Roo', value:'Quintana Roo'}, {label:'San Luis Potosi', value:'San Luis Potosi'}, {label:'Sinaloa', value:'Sinaloa'}, {label:'Sonora', value:'Sonora'}, {label:'Tabasco', value:'Tabasco'}, {label:'Tamaulipas', value:'Tamaulipas'}, {label:'Tlaxcala', value:'Tlaxcala'}, {label:'Veracruz', value:'Veracruz'}, {label:'Yucatan', value:'Yucatan'}, {label:'Zacatecas', value:'Zacatecas'});
        this.One.push({label:'Trabajo', value:'1'},{label:'Movil', value:'2'},{label:'Oficina', value:'3'},{label:'Otro', value:'4'})
        this.Two.push({label:'Correo', value:'1'},{label:'Skype', value:'2'});
    }
    Tabler(){
        firebase.database().ref('/Clientes').on('value',Z=>{
            this.Ori=[];this.Pro=[];
            console.log(Z.val())
            for(let I in Z.val()){
                console.log(Z.val()[I])
                this.Ori.push(Z.val()[I])
                let ID=this.Ori.length-1;
                this.Ori[ID].Alias = I;
                this.Ori[ID].Tel = this.Ori[ID].Tel ? this.Ori[ID].Tel : 'N/A';
                this.Ori[ID].RFC = this.Ori[ID].RFC ? this.Ori[ID].RFC : 'N/A';
                this.Ori[ID].RFC = this.Ori[ID].RFC ? this.Ori[ID].RFC : 'N/A';
                this.Ori[ID].Alias = this.Ori[ID].Alias ? this.Ori[ID].Alias : 'N/A';
                this.Ori[ID].Razon = this.Ori[ID].Razon ? this.Ori[ID].Razon : 'N/A';
            }
            this.Pro=this.Ori;
        });
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            Temp= Temp.filter(S=>S.Alias.toLowerCase().includes(I.toLowerCase())||S.Razon.toLowerCase().includes(I.toLowerCase())
        ||S.Tel.toLowerCase().includes(I.toLowerCase())||JSON.stringify(S.Contactos).toLowerCase().includes(I.toLowerCase())
        ||S.RFC.toLowerCase().includes(I.toLowerCase()));
        });
        this.F.length>0 ? this.Pro=Temp : this.Pro=this.Ori;
        /*this.F.length>0 ? this.Pro=this.Ori.filter(S=>S.Alias.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||S.Razon.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.Tel.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||JSON.stringify(S.Contactos).toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.RFC.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())) : this.Pro =this.Ori;*/
    }
    Registerer(){
        firebase.database().ref('/Clientes/'+this.Nm).set({
            Bank:this.D, CP:this.CP, Ciudad:this.C, Col:this.Col, Contactos:this.B, Dir:this.Dir, Estado:this.Estado,
            RFC:this.RFC, Razon:this.Ra, Dirs:this.E, Tel:this.Tel
        })
        this.Dir='';this.Nm='';this.C='';this.Estado='';this.RFC='';this.CP='';this.Ra='';this.Col='';this.Tel='';
        this.D=[{Bank:'', Succ:'', Dir:'',Acc:'',Clab:'',Ref:'',K:false, ID:0}];
        this.B=[{ID:0, Nom:'', Cargo:'', Tel:[{ID:0,Tel:'', T:'1'}], Mail:[{ID:0,Mail:'', T:'1'}]}];
        this.E=[{Resp:['',''], Add:['','','','',''], ID:0}]
    }
    Shower(A, O:OverlayPanel, E:Event, a:string){
        this.Uno = a == 'A' ? true : false;
        this.P2=JSON.parse(A);
        O.target = E.srcElement
        O.show(E);
    }
    Elimthis(ID:number, N:number, F?:string, A?:any[], id?:number){
        N == 1 ? A.splice(ID,1) : this.B[ID][F].splice(id,1);
    }
    Processor(A:any[],Field){
        let a:string ='';
        console.log(A)
        A.forEach(I=>{
            Field == 'Tel' ? (a =a+ this.One[parseInt(I.T)-1].label+': '+ I[Field] +'\n') : (a= this.Two[parseInt(I.T)-1].label + ': '+a+I[Field] +'\n')
        });
        return a
    }
    Upper(){
        if(this.Cont.length>0&&this.Nm.length>1&&this.Dir.length>10&&this.Ra.length>5&&this.C.length>3&&this.CP.length>4&&this.RFC.length>0&&this.Estado.length>0){
            this.ena=false;
        }
    }
    EditPro(P){
        this.Nm=P.Alias; this.Ra=P.Razon; this.C=P.Ciudad; this.Dir=P.Dir;this.Col=P.Col
        this.Estado=P.Estado;this.CP=P.CP;this.RFC=P.RFC; this.Tel=P.Tel;
        P.Contactos=='null'|| P.Contactos==null || P.Contactos==undefined || P.Contactos=='undefined' ? this.B=[{ID:0, Nom:'', Cargo:'', Tel:[{ID:0,Tel:'', T:'1'}], Mail:[{ID:0,Mail:'', T:'1'}]}] : this.B=P.Contactos; this.ena=false;
        P.Bank=='null'|| P.Bank==null || P.Bank==undefined || P.Bank=='undefined' ? this.D=[{Bank:'', Succ:'', Dir:'',Acc:'',Clab:'',Ref:'',K:false, ID:0}] : this.D=P.Bank;
        P.Dirs=='null'|| P.Dirs==null || P.Dirs==undefined || P.Dirs=='undefined' ? this.E=[{Resp:['',''], Add:['','','','',''], ID:0}] :this.E=P.Dirs;
    }
    ElimPro(P){
        this.c.confirm({
            message: 'Desea Eliminar al provedor?',
            accept: ()=>{
                firebase.database().ref('/Clientes/'+P.Alias).remove();
            }
        });
    }
}