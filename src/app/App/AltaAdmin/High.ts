import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import {Dict} from './../../PdfTools/ImgDict/ImgDict';
import {Hash} from './../../Auxiliaries/Models';
declare let pdfMake;
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './High.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class High{
    Ori:any[]=[];Gen:any[];Tbl:number;G:Message []=[];States:SelectItem[]=[];Dis=false;
    items:Array<{Nm:Array<{A:string}>}>=[];Koins:SelectItem[]=[];Send:any[];M:Hash={}
    Kolors:SelectItem[]=[{label:'Sin atender', value:0},{label:'En proceso', value:2},{label:'Completadas', value:1},{label:'Todas', value:-1}];
    Color:number;F:string[]=[];Provided:any[]=[]; activeIndex: number = 0;
    UniG:string[]=[];
    Delivered:string[]=['','','','','','',''];Ecosta:boolean=false;
    Items: MenuItem[] = [
            {label: 'Datos de Proveedor'},
            {label: 'Datos de Entrega'}
        ];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            console.log('Yo')
            this.Sends();
        }).catch(R=>{
            console.log(R)
            R == 'Conn Done' ? this.Sends() : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
    }
    ngOnInit(){
        this.Koins.push({label:'Pesos', value:0},{label:'Dolares', value:1})
    }
    Sends(){
        this.Ori=[];
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        firebase.database().ref('/POs').orderByChild('indexMonth').startAt(8).once('value',Z=>{
            let temp = Z.val();
            for (let a in Z.val()){
                this.M[temp[a].PO]=Z.val()[a];
                console.log(a,temp[a].Content )
                temp[a].Content.forEach((i, j)=>{
                    if (!temp[a].High || temp[a].Content.length != temp[a].High.length){
                        this.Ori.push(i);
                        this.Ori[this.Ori.indexOf(i)].High= '';
                        this.Ori[this.Ori.indexOf(i)].PO= Z.val()[a].PO;
                        this.Ori[this.Ori.indexOf(i)].DateG= Z.val()[a].DateG;
                        this.Ori[this.Ori.indexOf(i)].ID= +j;
                    }
                })
            }
            this.Gen=this.Ori.reverse();
        });
        /*this.H.post('/api', JSON.stringify({"EnvLst":1}),{headers:H}).map(R=>{
            R.json().forEach((I,J)=>{
                I.High = JSON.parse(I.High);
                this.UniG.push('')
                this.M[I.PO]=I.High;
                console.log(I)
                if((I.High.length==0 || I.High.includes(''))){
                    console.log(I.body)
                   JSON.parse(I.body).forEach((i,j)=>{
                       I.High.includes('') ? null : I.High.push('');
                       console.log(i);
                       console.log(j)
                       this.Ori.push(i);
                       this.Ori[this.Ori.indexOf(i)].High= I.High[i.ID];
                       this.Ori[this.Ori.indexOf(i)].PO= I.PO;
                       this.Ori[this.Ori.indexOf(i)].ID= +J+j;
                   });
                }
                console.log(this.M[I.PO])
             });
             this.Gen=this.Ori.reverse();
        }).subscribe();*/
    }
    DateR(D:string){
        let a =new Date(D);
        return Math.round(Math.abs((+new Date(D).setHours(0,0,0) - +new Date().setHours(0,0,0))/(1000 * 60 * 60 * 24)))
    }
    RowS(D: any, rowIndex: number){
        return D.Stat.Stat != 0 ? 'Yaay' : Math.abs(new Date().getDate() - new Date(D.Date).getDate()) > 1 ? 'Awww' : (new Date().getMonth() != new Date(D.Date).getMonth() ? 'Awww' : (new Date().getFullYear() != new Date(D.Date).getFullYear() ? 'Awww':'GoodJob'))
    }
    Nani(N){
        return (!isNaN(N)&&N!='')
    }
    Priced(E:Event,I:number){
        this.Gen[I].CFin= ((+this.Gen[I].CCompra * this.Gen[I].Cant) + +this.Gen[I].GdE)* (this.Gen[I].MonC? this.Gen[I].TdC : 1) + (this.Gen[I].CCompra*(this.Gen[I].Commit/100))
    }
    Modded(E:Event,A:string){
        window.open('/'+A,undefined,undefined,false)
    }
    Sender(){
        let pdf = pdfMake;
            let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            let D= new Date();
            let n=1;
            let body=[];
            body.push(
                [
                    {
                        text:'Cant.'
                    },{
                        text:'Num. de Parte'
                    },{
                        text:'Descripcion'
                    },{
                        text:'Proveedor'
                    },{
                        text:'Precio Unit.'
                    },{
                        text:'Precio Total'
                    }
                ]
            );
            this.Send.forEach(I=>{
                body.push(
                    [
                        {
                            text:I.Cant
                        },{
                            text:I.Desc
                        },{
                            text:I.Prov
                        },{
                            text:I.PReal
                        },{
                            text:I.CCompra
                        },{
                            text:I.CFin
                        }
                    ]
                ); 
            });
            let p = pdf.createPdf({
                pageMargins: [40, 40, 40, 80],
                info:{
                    title:'Relacion Envio de '+ new Date().getFullYear() + '-' + M[new Date().getMonth()] + '-' + new Date().getDate(),
                    author:'Ventas',
                    creator:'Ecosta',
                    producer:'SIE'
                },
                content:[
                    {
                        columns:[
                            {
                                image: Dict.ELogo,
                                width:210,//Base:83 Mult:8.3
                                margin:[0,25,0,0]
                            },{
                                image: Dict.HPLogo,
                                width:70,//Base: Mult:2
                                margin:[160,25,0,0]
                            }
                        ]
                    },{
                        table:{
                            widths:['auto','auto','*','*','auto','auto'],
                            body:body
                        }
                    }
                ]
            }).open()
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            Temp= Temp.filter(S=>S.Desc.toLowerCase().includes(I.toLowerCase())||JSON.stringify(S.Stat).toLowerCase().includes(I.toLowerCase())
            ||S.MID.toLowerCase().includes(I.toLowerCase())||S.Cli.toLowerCase().includes(I.toLowerCase())
            ||S.Unit.toLowerCase().includes(I.toLowerCase()));
        });
        this.F.length>0 ? this.Gen=Temp : this.Gen=this.Ori;
        /*this.F.length>0 ? this.Gen=this.Ori.filter(S=>S.Desc.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||JSON.stringify(S.Stat).toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.MID.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())||S.Cli.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())
        ||S.Unit.toLowerCase().includes(this.F[this.F.length-1].toLowerCase())) : this.Gen =this.Ori;*/
    }
    Colorer(){
        let Temp=[];
        console.log(this.Color)
            switch(this.Color){
                case 0 :
                    Temp = this.Ori.filter(S=>S.Stat.Stat == 0)
                    break;
                case 1 :
                    Temp = this.Ori.filter(S=>S.Stat.Stat > 5)
                    break;
                case 2 :
                    Temp = this.Ori.filter(S=>S.Stat.Stat > 0 && S.Stat.Stat <= 5)
                    break;
                default:
                    Temp= this.Ori;
            }
            this.Gen=Temp
        //this.Colors.length > 0 || this.Colors.length == 3? this.Gen=Temp : this.Gen= this.Ori.reverse();
    }
    Accepter(N:number, PO:string, High:string){
        console.log(N)
        console.log(this.Gen.find(S=>S.ID==N))
        console.log(this.Gen.find(S=>S.ID==N).PO)
        console.log(this.Gen.filter(S=>S.PO==this.Gen.find(S=>S.ID==N).PO))
        this.Gen.filter(S=>S.PO==this.Gen.find(S=>S.ID==N).PO).forEach((i,j)=>{
            this.M[i.PO][j] = i.High ==null ? '' : i.High
        });
        console.log(this.M[this.Gen.find(S=>S.ID==N).PO])
        let H = new Headers();
        H.append('Content-Type', 'application/json');
         this.H.post('/api', JSON.stringify({"EnvUpd":1, 'Field':1, 'Value':JSON.stringify(this.M[this.Gen.find(S=>S.ID==N).PO]), 'PO':this.Gen.find(S=>S.ID==N).PO}),{headers:H}).map(R=>{
             if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El usuario se modifico satisfactoriamente'});
                    //this.Sends();
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
         }).subscribe();
         firebase.database().ref('/POs/'+PO.split('PO-000')[1]+'/High/'+N).set({High})
    }
    Completer(OP:string){
        this.Gen.filter(S=>S.PO==OP).forEach((i,j)=>{
            this.M[OP][j] = this.UniG
        });
        let H = new Headers();
        H.append('Content-Type', 'application/json');
         this.H.post('/api', JSON.stringify({"EnvUpd":1, 'Field':1, 'Value':JSON.stringify(this.M[OP]), 'PO':OP}),{headers:H}).map(R=>{
             if(!R.json().DatabseError){
                if(R.json().affectedRows='1'){
                    this.G.push({severity:'success',summary:'Modificacion Completada', detail:'El usuario se modifico satisfactoriamente'});
                    //this.Sends();
                }
            } else {
                this.G.push({severity:'error',summary:'Error de Modificacion', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
         }).subscribe();
    }
}