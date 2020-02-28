import { Component,NgModule, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService, DataTableModule,SharedModule} from 'primeng/primeng';
import * as firebase from "firebase";
import {Conns} from './../../Conections/Connection';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Usr.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Users{
    I:MenuItem[]=[];
    Bloods:SelectItem[]=[];G:Message []=[];Emp:any[]=[];States:SelectItem[]=[];
    BloodType:string;Nm:string="";Ap:string="";Am:string="";P:string="";Dp:string="";Dir:string="";
    Cel:string="";TelA:string="";NSS:string="";RFC:string="";FIn:Date;Br:Date;Cm:boolean= false;
    Pass:string="";E:boolean;ID:string="";RPass:string;Mail:string;IDK:number=0;ABook:string[]=[];
    Imger:string="";dis:boolean=true;Img:string="1";ena:boolean=true;USR:string='';Col:string='';CP:string='';Estado:string='';
    constructor(private H:Http, private R:Router, private C:ConfirmationService, private r:ActivatedRoute){
        this.Imger="http://35.196.68.244:4200/nope.png";
        new Conns(H, R).Connect().then(()=>{
            this.Tabler();
        }).catch(R=>{
            this.Tabler();
        });
        this.Bloods.push({label: 'O-', value: 'O-'}, {label: 'O+', value:'O+'},{label: 'A+', value:'A+'}, {label: 'A-', value:'A-'}, {label: 'B-', value:'B-'}, {label: 'B+', value:'B+'}, {label: 'AB-', value:'AB-'}, {label: 'AB+', value:'AB+'});
        this.States.push({label:'Aguascalientes', value:'Aguascalientes'}, {label:'Baja California', value:'Baja California'}, {label:'Baja California Sur', value: 'Baja California Sur'}, {label:'Campeche', value:'Campeche'}, {label:'Chiapas', value:'Chiapas'}, {label:'Chihuahua', value:'Chihuahua'}, {label:'CDMX', value:'CDMX'}, {label:'Coahuila', value:'Coahuila'}, {label:'Colima', value:'Colima'}, {label:'Durango', value:'Durango'}, {label:'Estado de Mexico', value:'Estado de Mexico'}, {label:'Guanajuato', value:'Guanajuato'}, {label: 'Guerrero', value:'Guerrero'}, {label:'Hidalgo', value:'Hidalgo'}, {label:'Jalisco', value:'Jalisco'}, {label:'Michoacan', value:'Michoacan'}, {label:'Morelos', value:'Morelos'}, {label:'Nayarit', value:'Nayarit'}, {label:'Nuevo Leon', value:'Nuevo Leon'}, {label:'Oaxaca', value:'Oaxaca'}, {label:'Puebla', value:'Puebla'}, {label:'Queretaro', value:'Queretaro'}, {label: 'Quintana Roo', value:'Quintana Roo'}, {label:'San Luis Potosi', value:'San Luis Potosi'}, {label:'Sinaloa', value:'Sinaloa'}, {label:'Sonora', value:'Sonora'}, {label:'Tabasco', value:'Tabasco'}, {label:'Tamaulipas', value:'Tamaulipas'}, {label:'Tlaxcala', value:'Tlaxcala'}, {label:'Veracruz', value:'Veracruz'}, {label:'Yucatan', value:'Yucatan'}, {label:'Zacatecas', value:'Zacatecas'});
    }
    Tabler(){
        firebase.database().ref('/Users').orderByChild('ID').startAt(2).on('value',Z=>{
            console.log(Z.val())
            this.Emp=[];this.IDK=1;
            for(let I in Z.val()){
                console.log(Z.val()[I])
                this.IDK++;
                this.Emp.push(Z.val()[I])
            }
            this.IDK++;
            console.log(this.IDK)
        })
    }
    onSelect(e){
        if(this.Nm.length>3&&this.Ap.length>3){
            this.Img=this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length);
        } else {
            this.G.push({severity:'warn',summary:'Ingrese el nombre y apellido!', detail:'Se necesita esa informacion!'});
        }
    }
    onUpload(e){
        this.G.push({severity:'success',summary:'Se subio correctamente la imagen', detail:'Sin errores en el servidor'});
        this.Imger=this.Imger.slice(0,-8)+this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length)+".jpg".toLowerCase();
    }
    onError(e){
        this.G.push({severity:'error',summary:'Error en servidor', detail:'Verifica conexion o contacta al administrador'});
    }
    Upper(){
        if(this.Nm.length>3&&this.Ap.length>3){
            this.dis=false;
        }
        if(this.Nm.length>3&&this.Ap.length>3&&this.Am.length>3&&this.P.length>3&&this.Pass.length>5){
            this.ena=false;
        } else {
            this.ena=true;
        }
    }
    notFound(){
        this.Imger="http://35.227.119.63:4200/nope.png";
    }
    EditEmp(E){
        console.log(JSON.stringify(E));
        this.E=true;
        let e=E.Name.split(" ");this.ena=false;this.Mail=E.Mail
        this.Nm=e[0].replace('_',' '); this.Ap=e[1]; this.Am=e[2]; this.P=E.Pos; this.Dp=E.Depto; this.Dir=E.Dir; this.Cel= E.Cel; this.TelA = E.TelA; this.NSS= E.NSS; this.RFC = E.RFC; this.BloodType = E.Blood; this.ID=E.ID;
        this.FIn = new Date(E.DateIn); this.Br=new Date(E.Birth); this.Pass="@#No Data%"; this.RPass=E.Pswd;this.Col=E.Col; this.Estado=E.Estado;this.CP=E.CP;
        //this.Imger=this.Imger.slice(0,-8)+this.Nm.slice(0,3)+this.Ap.slice(-3,this.Ap.length)+".jpg".toLowerCase();
    }
    ElimEmp(E){
        let e=E.Name.split(" ");
        console.log('/Users/'+(e[0].slice(0,1)+e[1]).toLowerCase())
        this.C.confirm({
            message: 'Desea Eliminar al empleado?',
            accept: ()=>{
                firebase.database().ref('/Users/'+(e[0].slice(0,1)+e[1]).toLowerCase()).remove()
            }
        });
    }
    Blowfish(A:string){
        //let a = cryptojs.
    }
    Registerer(){
        let ID;
        this.r.params.subscribe((P:Params)=>{
            ID= P['id'];
            ID==this.ID||ID==7||ID==1||ID==3 ?
                    firebase.database().ref('/Users/'+(this.Nm.slice(0,1)+this.Ap).toLowerCase()).set({
                        Birth:this.Br.toDateString(), Blood:this.BloodType, CP:this.CP, Cel:this.Cel, Col:this.Col, DateIn:this.FIn.toDateString(),
                        Depto:this.Dp, Dir:this.Dir, Estado:this.Estado, ID:this.E? parseInt(this.ID) : +this.IDK, Mail: this.E ? this.Mail : this.Nm.slice(0,1)+this.Ap +'@ecosta.com.mx', NSS:this.NSS,
                        Name:this.Nm.replace(' ','_')+' '+this.Ap+' '+this.Am, Pos:this.P, Pswd: this.Pass=="@#No Data%" ? this.RPass : this.Pass,
                        RFC:this.RFC, TelA:this.TelA, ABook:this.ABook, Roll:111
                    }).then(()=>{
                        this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El usuario se modifico satisfactoriamente'});
                        this.Tabler();
                        this.Nm=""; this.Ap=""; this.Am=""; this.P=""; this.Dp=""; this.Dir=""; this.Cel= ""; this.TelA = ""; this.NSS=""; this.RFC =""; this.BloodType = ""; 
                        this.ID=""; this.Pass=""; this.Br=null; this.FIn= null;this.Estado=''; this.CP='';
                    }).catch(()=>{
                        this.G.push({severity:'error',summary:'Errosr de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                    }) : this.G.push({severity:'error',summary:'Error de Registro', detail:'Por favor NO ALTERES DATOS QUE NO SON DE TU USUARIO. Este incidente sera reportado a gerencia. Gracias c:'});
        });
    }
}