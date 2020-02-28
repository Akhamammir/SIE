import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import {Conns} from '../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './CompEco.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class ComprasEco{
    Ori:any[]=[];Gen:any[];Tbl:number;G:Message []=[];States:SelectItem[]=[];Dis=false;T;b;
    items:Array<{Nm:Array<{A:string}>}>=[];Koins:SelectItem[]=[];Send:any[];P2:any[]=[];
    Kolors:SelectItem[]=[{label:'Sin atender', value:0},{label:'En proceso', value:2},{label:'Completadas', value:1},{label:'Todas', value:-1}];
    Color:number;F:string[]=[];Provided:any[]=[]; activeIndex: number = 0;PP:any[]=[];Majora:number;
    Delivered:string[]=['','','','','','',''];Ecosta:boolean=false;Pl:SelectItem[]=[];PL:any;
    Cl:SelectItem[]=[];Cc:SelectItem[]=[];Clnt:any;Cnt:any;
    Items: MenuItem[] = [
            {label: 'Datos de Proveedor'},
            {label: 'Datos de Entrega'}
        ];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){
        this.Koins.push({label:'Pesos', value:0},{label:'Dolares', value:1})
        new Conns(H, R).Connect().then(()=>{
            this.Compser();
        }).catch(R=>{
            console.log(R)
            R == 'Conn Done' ? this.Compser() : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
    }
    async Process(A:any) {
        for(let I in A){
            A[I].Content.forEach((i,j)=>{
                if(!(i.Unit=='SERVICIO ECO') && !i.Comp){
                    i.Approved= A[I].Approved; i.Unit = i.Unit ? i.Unit : 'No Input'; i.Desc = i.Desc ? i.Desc : 'No Input';
                    i.Cli = A[I].Client ? A[I].Client : 'No Input'; i.Date=A[I].DateG; i.MonC = A[I].Coin; i.PReal='';
                    i.MID=A[I].ID; i.TdE=''; i.Pedido=''; i.CCompra=0; i.Com=''; i.TdC=0; i.GdE=0; i.Commit=0;
                    i.ID=A[I].ID+ '-'+j; i.CFin=0;
                    this.Gen.unshift(i)
                }
            });
            this.Ori=this.Gen;
        }
    }
    Compser(){
        this.Ori=[];
        firebase.database().ref('/POs').orderByChild('indexMonth').startAt(8).once('value',Z=>{
            this.Gen=[];this.Ori=[];
            this.Process(Z.val());
        })
        firebase.database().ref('/Proveedores').once('value',Z=>{
            this.PP=[];
            console.log('Hi')
            for(let I in Z.val()){
                this.PP.unshift(Z.val()[I])
                this.PP[0].Alias=I;
            }
            console.log(this.PP)
        });
    }
    DateR(D:string){
        let a =new Date(D);
        return Math.round(Math.abs((+new Date(D).setHours(0,0,0) - +new Date().setHours(0,0,0))/(1000 * 60 * 60 * 24)))
    }
    RowS(D: any, rowIndex: number){
        return D.Stat != 0 ? 'Yaay' : Math.abs(new Date().getDate() - new Date(D.Date).getDate()) > 1 ? 'Awww' : (new Date().getMonth() != new Date(D.Date).getMonth() ? 'Awww' : (new Date().getFullYear() != new Date(D.Date).getFullYear() ? 'Awww':'GoodJob'))
    }
    Nani(N){
        return (!isNaN(N)&&N!='')
    }
    Priced(E:Event,I:number){
        this.Gen[I].CFin= ((+this.Gen[I].CCompra * this.Gen[I].Cant)) + (this.Gen[I].CCompra*(this.Gen[I].Commit/100))
        this.Gen[I].CFin += +this.Gen[I].GdE
    }
    Modded(E:Event,A:string){
        window.open('/'+A,undefined,undefined,false)
    }
    Filter(){
        let Temp = this.Ori;
        this.F.forEach(I=>{
            Temp= Temp.filter(S=>S.Desc.toLowerCase().includes(I.toLowerCase())||JSON.stringify(S.Stat).toLowerCase().includes(I.toLowerCase())
            ||S.MID.toLowerCase().includes(I.toLowerCase())||S.Cli.toLowerCase().includes(I.toLowerCase())
            ||S.Unit.toLowerCase().includes(I.toLowerCase()));
        });
        this.F.length>0 ? this.Gen=Temp : this.Gen=this.Ori;
    }
    Greet(){
        alert('QUE PEDOOOOOOO')
    }
    Sel(){
        console.log(this.Clnt)
        this.Provided[5]=this.Clnt.value.I.Nam;
        this.Provided[6]=this.Clnt.value.I.Cel;
        this.Provided[7]=this.Clnt.value.I.Mail;
        console.log(this.Provided[6])
    }
    Set2(){
        console.log(this.PL)
        this.Delivered[1]=this.PL[1][0];
        this.Delivered[2]=this.PL[0][0] + '. CP. '+ this.PL[0][3];
        this.Delivered[3]=this.PL[0][1];
        this.Delivered[4]=this.PL[0][4];
        this.Delivered[5]=this.PL[0][2];
        this.Delivered[6]=this.PL[2];
        this.Delivered[7]=this.PL[1][1];
    }
    Provides(Who:string){
        this.Provided=[];
        try{
            console.log(Who)
            firebase.database().ref('/Proveedores/'+Who).once('value',Z=>{
                if(Z.val()){
                    if(Z.val().Delv){
                        Z.val().Delv.forEach(I=>{
                            this.Cl.push({label:I.Nam, value:{I}})
                        })
                        this.Provided.push(Z.val().Razon)
                        this.Provided.push(Z.val().Dir)
                        this.Provided.push(Z.val().Col)
                        this.Provided.push(Z.val().Ciudad)
                        this.Provided.push(Z.val().Estado)
                        this.Provided.push(" ")
                        this.Provided.push(" ")
                        this.Provided.push(" ")
                        this.Clnt=this.Cl[0];
                        firebase.database().ref('/Clientes/'+this.Send[0].Cli).once('value',Z=>{
                            console.log(Z.val())
                            if(Z.val()){
                                Z.val().Dirs.forEach(I=>{
                                    console.log(I)
                                    this.Pl.push({label:I.Add[0],value:[I.Add,I.Resp, Z.val().Tel]})
                                });
                            } else {
                                return this.G.push({severity:'error',summary:'El cliente no cuenta con direcciones!',detail:'Regsitrar en el catalogo de clientes las direcciones de entrega por favor!'});
                            }
                        }).then(()=>{
                            this.PL=this.Pl[0].value;
                            this.Set2();
                        })
                        this.Sel();
                    } else {
                        return this.G.push({severity:'error',summary:'El proovedor no cuenta con Contactos',detail:'Regsitrar en el catalogo de proovedores los contactos de entrega por favor!'});
                    }
                } else {
                    return this.G.push({severity:'error',summary:'El proovedor no existe!',detail:'Regsitrar en el catalogo de proveedores al proveedor por favor!'})
                }
            }).then(()=>{
                this.Dis=true;
            });
        }catch(ER){
            this.G.push({severity:'error',summary:'Error de Compra', detail:'Error General reporte el siguiente error:' + ER});
        }
    }
    OPer(E:Event, IDM, OP:OverlayPanel){
        this.Majora=IDM;
        OP.show(E)
    }
    Arr(A, V:string){
        console.log(this.PP)
        let P2=A.filter(I => I.Alias.toLowerCase().includes(V.toLowerCase()))
        this.P2=P2.slice(0,7)
    }
    One(IDM, OP:OverlayPanel, C:string){
        OP.hide();
        this.Gen[IDM].PReal=C;
        console.log(this.Gen[IDM])
    }
    Build(N?:number){
        let Send = this.Send;
        let OP;let D = new Date();let n;
        firebase.database().ref('POsCount').once('value',Z=>{
            OP='PO-000'+Z.val();
            n=Z.val();
        }).then(()=>{
            let a = new PDFLIB().Builder(OP, this.Delivered, this.Provided, this.Send, N);
            if (a=='Success!'){
                firebase.database().ref('POs/'+n).set({
                    ChangeTy:Send[0].TdC, Coin:Send[0].MonC, Commission: Send[0].Commit, Content:this.Send, DateG:new Date().toDateString(),
                    PO:OP, Prov: this.Provided, SendA:this.Delivered, Type:(N ? N:null), indexMonth:new Date().getMonth()
                }).then(()=>{
                    n++;
                    firebase.database().ref('POsCount').set(n).then(()=>{
                        this.Go(OP)
                    })
                    this.G.push({severity:'error',summary:'Exito!', detail:'El registro esta listo!'});
                }).catch(()=>{
                    this.G.push({severity:'error',summary:'Error de Registro', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                })
            } else {
                this.G.push({severity:'error',summary:'Error de Compra', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
            }
        });
        this.Dis=false;
        this.activeIndex=0;
    }
    async Go(OP){
        this.Send.forEach((I,i)=>{
            console.log(this.Ori.indexOf(this.Ori.find(I=>I.ID==this.Send[i].ID)))
            this.onBasicUpload(Event, I.ID, undefined ,OP);
        });
    }
    async onBasicUpload(E, i:string, A?:string, O?:string){
        try{
            console.log(i);
            let b:any[];let c:number;let d;
            firebase.database().ref('/Facts/'+i.split('-')[0]+'-'+i.split('-')[1]).once('value',Z=>{
                console.log(Z.val())
                d=Z.val().ID;
            }).then(()=>{
                firebase.database().ref('/Facts/'+i.split('-')[0]+'-'+i.split('-')[1]+'/Content/'+i.split('-')[2]).once('value',Z=>{
                    console.log(Z.val())
                })
                firebase.database().ref('/Facts/'+i.split('-')[0]+'-'+i.split('-')[1]+'/Content/'+i.split('-')[2]).update({
                    PO:O
                }).then(()=>{
                    this.G.push({severity:'success',summary:'Compra Completada', detail:'El producto se compro satisfactoriamente'});
                    this.Compser()
                }).catch(()=>{
                    this.G.push({severity:'error',summary:'Error de Compra', detail:'Estabamos en camino a la base de datos y ocurrio un error!'});
                });
            });
        this.G.push({severity:'success',summary:A != undefined ? 'Se subio correctamente la imagen':'Producto Comprado exitosamente', detail:'Sin errores en el servidor'});
        setTimeout(()=>{
            this.G=[];
        }, 1700)
        } catch(E){
            this.G.push({severity:'error',summary:'Error de Compra', detail:'Error General reporte el siguiente error:' + E});
        }        
    }
    Modifyer(N:number,n?:number){
        switch(n){
            case 1:
                this.Ori.splice(N, 0, this.Gen[N]);
                this.Gen = this.Ori;
            break;
            default:
                this.Ori.splice(N, 0, this.Gen[N]);
                this.Gen = this.Ori;
            break;
        }
        console.log(N)
        console.log(JSON.stringify(this.Gen[N]))
    }
}