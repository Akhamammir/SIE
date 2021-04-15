import { Component,HostListener, ViewEncapsulation, ApplicationRef} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Cots.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Cots{
    G:Message []=[];ID:string;User:string[]=[];N:number;T:string='';E:string='';At:string='';Dir:string='';Tel:string='';Fx:string='';Em:string='';
    B:Array<{Nom:string,ID:number, SubT:number, SubU:number, D:Array<{Cant:number,Unit:string,Desc:string,Prov:string,CInicial:number,CFact:number,Dcto:number,Utilidad:number,Ctot:number,DeliveryC:number,DeliveryCF:number,DeliveryT:string, CommCot:string, Comm:string, UNet:number, Koin:string, TC:number, Fin:number, ID:number,Complex:boolean,C:Array<{PartN:string,Des:string,Cto:number,TC:number,Fin:number}>}>}>=[];
    X:Array<{Ro:string,fill:string}>=[];value:boolean=false;selectedValue: string='pesos';Coin:string='';USR:string='';TcS:string='';
    Cm:boolean=false;P:any[]=[];PP:any[]=[];P2:any[]=[];Cl:SelectItem[]=[];Cc:SelectItem[]=[];Clnt:any;Cnt:any;Co:boolean=false;
    Majora:number;Minora:number;Field:string;Con=console;BODY:any[];FF:string;Nt:string[]=[];Tc:string='';
    Fact:boolean=true;GO:Boolean=false;Gen:any[];Client:string[]=['','',''];Atn:string='';DeliveryA:string='';
    CDate:Date;items: MenuItem[];Calc:boolean;Mail:boolean=false;Dest:string[]=[];Hids:string[]=[];Cops:string[]=[];MBody:string;
    KOIN:SelectItem[]=[{label:'Pesos', value:'Pesos'},{label:'Dolares', value:'Dolares'}];RFC='';
    IDM:number=0; IDm:number=0; Majoras:number; Datum:any;ABook:string[]=[];FABook:string[]=[]; 
    PayFor:SelectItem[]=[]; PayMet:SelectItem[]=[]; Cfdi:SelectItem[]=[];DelAdds:SelectItem[]=[];
    DelResp:SelectItem[]=[];
    CFDIUse='';MetPag='';ForPag='';Picked=false;
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r: ActivatedRoute, private ARef:ApplicationRef){
        this.B.push({Nom:'',ID:0, SubT:0, SubU:0, D:[{Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,CFact:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:null,DeliveryCF:null,DeliveryT:'', Comm:'', UNet:0, CommCot:'', Koin:'Pesos', TC:1, Fin:0, ID:0,Complex:false,C:[{PartN:'',Des:'',Cto:0,TC:1,Fin:0}] }] });
        this.X.push({Ro:'Empresa',fill:''},{Ro:'Atencion',fill:''},{Ro:'Direccion',fill:''},{Ro:'Telefono',fill:''},{Ro:'E-Mail',fill:''},)
        this.Client=['','',''];
        new Conns(H, R).Connect().then(()=>{
            this.setup();
        }).catch(R=>{
            R == 'Conn Done' ? this.setup() : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
        this.Tc='\n-Tiempo de Entrega: Mostrado en el cuadro de la cotización (Días Hábiles)\n-Pago: 30 días de Crédito\n-Aplican Restricciones\n-Precios Sujetos a cambio sin previo aviso'
    }
    setup() {
        firebase.database().ref('/Proveedores').on('value', Z => {
            this.Simplea(Z.val(), 'Proveedores')
        });
        this.PayFor = [{label:'PUE', value:'PUE'}, {label:'PPD', value:'PPD'}];
        this.Cfdi = [{label:'G01 Adquisicion de Merc.', value:'G01 Adquisicion de Merc.'},
        {label:'G02 Devoluciones, descuentos, etc.', value:'G02 Devoluciones, descuentos, etc.'},
        {label:'G03 Gastos en General', value:'G03 Gastos en General'},
        {label:'I02 Mobiliario y Equipo de Oficina', value:'I02 Mobiliario y Equipo de Oficina'},
        {label:'I04 Equipo de Computo y Acc.', value:'I04 Equipo de Computo y Acc.'},
        {label:'P01 Por Definir', value:'P01 Por Definir'},];
        this.PayMet = [{label:'01 Efectivo', value:'01 Efectivo'},
        {label:'02 Cheque Nominativo', value:'02 Cheque Nominativo'},
         {label:'03 Trans. Electronica', value:'03 Trans. Electronica'},
         {label:'04 Tarjeta de credito', value:'04 Tarjeta de credito'},
         {label:'05 Monedero Elec.', value:'05 Monedero Elec.'},
         {label:'06 Dinero Elec.', value:'06 Dinero Elec.'},
         {label:'08 Vales de Despensa', value:'08 Vales de Despensa'},
         {label:'12 Dacion en Pago', value:'12 Dacion en Pago'},
         {label:'13 Pago x subrogacion', value:'13 Pago x subrogacion'},
         {label:'14 Pago x consignacion', value:'14 Pago x consignacion'},
         {label:'15 Consignacion', value:'15 Consignacion'},
         {label:'17 Compensacion', value:'17 Compensacion'},
         {label:'23 Novacion', value:'23 Novacion'}, {label:'24 Confusion', value:'24 Confusion'},
         {label:'25 Remision de Deuda', value:'25 Remision de Deuda'},
         {label:'26 Prescripcion o Caducidad', value:'26 Prescripcion o Caducidad'},
         {label:'27 A satisfaccion de acreedor', value:'27 A satisfaccion de acreedor'},
         {label:'28 Tarjeta de Debito', value:'28 Tarjeta de Debito'},
         {label:'29 Tarjeta de Servicios', value:'29 Tarjeta de Servicios'},
         {label:'30 Aplicacion de Anticipos', value:'30 Aplicacion de Anticipos'},
         {label:'31 Intermediario de Pagos', value:'31 Intermediario de Pagos'},
          {label:'99 Por Definir', value:'99 Por Definir'}];
        this.P = [{ShortD:'',PartNo:'SERVICIO ECO'}]
        /*firebase.database().ref('/Productos').on('value',Z=>{
            this.Simplea(Z.val(), 'Productos')
        })*/
        firebase.database().ref('/Clientes').on('value', Z => {
            this.Clis(Z.val());
        });
        this.r.params.subscribe((P:Params)=>{
            this.ID = P['id'];
            if(this.ID.includes('!?')) {
                this.Fact = false;
                let ID:string[]=[];
                ID=this.ID.split('-');
                ID[0]=this.ID.slice(2,ID[0].length);
                this.ID=ID[1];
                firebase.database().ref('/Cots/'+ID[0]).once('value',Z=>{
                    this.X[1].fill = Z.val().Contact;
                    this.Co = Z.val().Coin == 0 ? false :true;
                    this.T = Z.val().Title;
                    this.Coin = Z.val().ChangeTy;
                    this.Clnt = Z.val().Client;
                    this.Datum = Z.val().DateG;
                    this.B = Z.val().Content;
                    this.B.forEach(I => {
                        I.D.forEach(J => {
                            J.Dcto == undefined || J.Dcto == null ? J.Dcto = 0 : null;
                        });
                    });
                    this.Tc = Z.val().Terms;
                    this.N = parseInt(ID[0], null);
                    this.Nt = Z.val().Notes ? Z.val().Notes : [];
                    this.X = Z.val().XData1;
                    this.Client = Z.val().XData2;
                }).then(()=>{
                    this.Styler('CotL', 'T');
                    this.Styler('Coin', 'Coin');
                    setTimeout(() => {
                        this.B.forEach((I,J) => {
                            I.D.forEach(i => {
                                this.Styler('Cant-' + J + '-' + i.ID, 'B', J, i.ID, 'Cant');
                                this.Styler('CInicial-' + J + '-' + i.ID, 'B', J, i.ID, 'CInicial');
                                this.Styler('Dcto-' + J + '-' + i.ID, 'B', J, i.ID, 'Dcto');
                                this.Styler('Utilidad-' + J + '-' + i.ID, 'B', J, i.ID, 'Utilidad');
                                this.Styler('DeliveryC-' + J + '-' + i.ID, 'B', J, i.ID, 'DeliveryC');
                            })
                        })
                    }, 100)
                })
            } else {
                firebase.database().ref('/CotID/').on('value', Z => {
                    this.N = +Z.val() + 1;
                });
            }
            firebase.database().ref('/Users').orderByChild('ID').equalTo(parseInt(this.ID, null)).once('value', Z => {
                const U = Z.val()[Object.keys(Z.val())[0]];
                this.User.push(U.Name);
                this.User.push(U.Pos);
                this.User.push(U.Mail);
                this.User.push(U.Cel);
            }).then(() => {
                this.FABook = this.ABook;
            });
        });
    }
    async Simplea(A:any, Arr:string) {
        this[Arr] = [];
        Object.keys(A).forEach(I => {
            A[I].Alias = I;
            this[Arr].push(A[I]);
        });
    }
    async Clis(A:any) {
        this.Cl = [];
        Object.keys(A).forEach(I => {
            this.Cl.push({label:I, value:{name:I,cont:A[I].Contactos,tel:A[I].Tel,dir:A[I].Dir, RFC:A[I].RFC, Ciudad:A[I].Ciudad, Dirs:A[I].Dirs}});
        });
    }
    ngOnInit() {
        this.items = [
            {label: 'View', icon: 'fa-search', command: (event) => console.log(Math.floor(Math.random()*10)+1)},
            {label: 'Delete', icon: 'fa-close', command: (event) => console.log('-3-')}
        ];
        this.CDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0);
    }
    Upper(IDM, IDm){
        let Envios = +(this.B[IDM].D[IDm].DeliveryC * this.B[IDM].D[IDm].Cant);
        let CostoD = +(this.B[IDM].D[IDm].CInicial - (this.B[IDM].D[IDm].CInicial * (+this.B[IDM].D[IDm].Dcto/100)))
        let Util =  (this.B[IDM].D[IDm].Utilidad/100)
        let Cant= this.B[IDM].D[IDm].Cant;
        this.B[IDM].D[IDm].Ctot = ((CostoD*(1.00+Util))* Cant) + Envios;
        this.B[IDM].D[IDm].Unit == 'SERVICIO ECO' ? this.B[IDM].D[IDm].Ctot = this.B[IDM].D[IDm].CInicial * this.B[IDM].D[IDm].Cant : null;
        this.B[IDM].SubT=0;
        this.B[IDM].D.forEach(I=>{
            this.B[IDM].SubT+= +I.Ctot;
        })
        console.log(this.B[IDM].D[IDm].Ctot, 'REsult', this.B[IDM].SubT);
    }
    Nani(N) {
        return (!isNaN(+N)&&N!='')
    }
    OPer(E:Event, IDM, IDm, OP:OverlayPanel, Arr:any[], F:string, FF:string, i?:number){
        this.Majora=IDM; this.Minora=IDm;
        !isNaN(i)  ? this.Majoras=i : null;
        this.P2=Arr.slice(0,7);
        this.Field=F;
        this.FF=FF;
        OP.show(E)
    }
    Arr(A, V:string, F:string){
        let P2=A.filter(I => I[F].toLowerCase().includes(V.toLowerCase()))
        this.P2=P2.slice(0,7)
    }
    One(IDM, IDm, F:string, OP:OverlayPanel, C:string){
        console.log(F)
        OP.hide();
        switch(F){
            case 'Prov':
                this.B[IDM].D[IDm][F]=C;
            break;
            case '':
                console.log('0110100001101001')
                this.B[IDM].D[IDm].C[this.Majoras].Des =this.P.find(I=>C==I[this.Field])['ShortD']
                this.B[IDM].D[IDm].C[this.Majoras].PartN =this.P.find(I=>C==I[this.Field])['PartNo']
                this.P.find(I=>C==I[this.Field])[this.P.find(I=>C==I[this.Field])['ShortD']];
            break;
            default: 
                this.B[IDM].D[IDm].Unit = this.P.find(I=>C==I[this.Field])['PartNo']
                this.B[IDM].D[IDm].Desc = this.P.find(I=>C==I[this.Field])['ShortD']
            break;
        }
    }
    ABookOP(OP:OverlayPanel, E:Event){
        OP.show(E)
    }
    Sel(){
        this.Cc=[];
        console.log(this.Clnt);
        console.log(this.Client)
        this.Clnt.cont.forEach(I=>{
            this.Cc.push({label:I.Nom,value:{Atn:I.Nom,Mail:I.Mail[0].Mail}})
            console.log(I.Mail)
        });
        this.Clnt.Dirs.forEach(i=>{
            this.DelAdds.push({label:i.Add[0]+', '+i.Add[2], value:i.Add[0]+', '+i.Add[1]+
            ', Col. '+ i.Add[2]+', C.P: ' + i.Add[3]});
            this.DelResp.push({label:i.Resp[0], value:i.Resp[0]})
        });
        this.X[0].fill=this.Clnt.name
        this.X[2].fill = this.Clnt.dir;
        this.X[3].fill=this.Clnt.tel;
        this.Cnt=this.Cc[0].value;
        this.Client[0]=this.Clnt.Ciudad;
        this.Client[1]=this.Clnt.RFC;
        this.RFC=this.Clnt.RFC;
        this.Picked=true;
        this.Client[2]=this.Clnt.Cond;
        console.log(this.Client)
        this.Set();
    }
    Set(){
        this.X[1].fill=this.Cnt.Atn;
        this.X[4].fill=this.Cnt.Mail;
    }
    Killer(A:number, B?:number, C?:number){
        console.log(C)
        if (B!=undefined && C==undefined) {
            console.log(B)
            if(this.B[A].D.length>1){
                console.log(this.B[A].D.find(I=>I.ID==B))
                this.B[A].D.splice(this.B[A].D.indexOf(this.B[A].D.find(I=>I.ID==B)),1)
            } else {
                this.G.push({severity:'error',summary:'Accion no permitida', detail:'Debe tener minimo una linea por grupo'})
            }
        } else if(C==undefined){
            if(this.B.length>1){
                console.log(A-1)
                console.log(this.B.find(I=>I.ID==A))
                this.B.splice(A,1)
            } else {
                this.G.push({severity:'error',summary:'Accion no permitida', detail:'Debe tener minimo un grupo'})
            }
        }
        if(C!=undefined){
            this.B[A].D[B].C.splice(C,1);
        }
        this.B.forEach((I,i)=>{
            I.ID = i
            I.D.forEach((J,j)=>{
                J.ID = j
            });
        });
        console.log(A)
    }
    Prodder(ID:number){
        this.B[ID].D.push({Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,CFact:null,Dcto:null,Utilidad:null,
         Ctot:null,DeliveryC:null,DeliveryCF:null,DeliveryT:'', CommCot:'', Comm:'', UNet:0, Koin:'Pesos', TC:1, Fin:0,
          ID:this.B[ID].D.length-1,Complex:false,C:[{PartN:'',Des:'',Cto:0,TC:1,Fin:0}]});
        this.B[ID].D= this.B[ID].D.slice();
        this.B.forEach((I,i)=>{
            I.ID = i
            I.D.forEach((J,j)=>{
                J.ID = j
            });
        });
    }
    Modder(){
        this.B.push({Nom:'',ID:this.B[this.B.length-1].ID+1, SubT: 0, SubU:0, D:[{Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,CFact:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:null,DeliveryCF:null,DeliveryT:'', CommCot:'', Comm:'', UNet:0,Koin:'Pesos', TC:1, Fin:0, ID:0,Complex:false,C:[{PartN:'',Des:'',Cto:0,TC:1,Fin:0}]}]});
    }
    Warn(){
        this.c.confirm({
            message: 'AVISO: SE GENERARA UNA NUEVA ORDEN DE FACTURACION VERIFIQUE QUE SEA LA OPCION DESEADA',
            accept: ()=>{
                this.Facts()
            }
        });
    }
    Coiner(){
        console.log(1)
        this.Co ? this.Coin=this.TcS : this.Coin='1'
    }
    Runner(){
        this.B[this.IDM].D[this.IDm].CInicial = 0;
        this.B[this.IDM].D[this.IDm].C.forEach((I)=>{
            this.B[this.IDM].D[this.IDm].CInicial = this.B[this.IDM].D[this.IDm].CInicial +I.Fin
        });
        this.Upper(this.IDM, this.IDm)
    }
    OPCtrl(IDM, IDm, B:OverlayPanel, E:Event){
        this.IDM=IDM; this.IDm=IDm;
        B.show(E);
    }
    Builder() {
        this.GO =! this.GO;
        console.log(this.GO);
        this.B.forEach(I => {
            I.D.forEach(i => {
                i.CFact = i.CInicial - (i.CInicial * +(i.Dcto/100));
                i.Fin = i.Koin == 'Dolares'? i.CFact * i.TC : i.CFact;
                i.UNet = (this.Co ? i.Ctot * +this.Coin : i.Ctot) - (i.Cant * i.Fin)
            });
        });
        this.B.forEach(I=>{
            I.D.forEach(i=>{
                i.UNet = (this.Co ? i.Ctot * +this.Coin : i.Ctot) - (i.Cant * i.Fin);
            });
        });
    }
    Copier(Target:string, Val:number) {
        this.B.forEach(I => {
            I.D.forEach(i => {
                i.TC = i.Prov == Target ? Val : i.TC;
            });
        });
    }
    Joy(){console.log('Holy Moly I live!!!')}
    async TickingClok(N:number){
        setTimeout(()=>{
            this.G=[];
        },N);
    }
    Maker(A:string){
        let H = new Headers();
        console.log(this.Client)
        H.append('Content-Type', 'application/json');
        let a=new PDFLIB();
        let N:number = this.N;
        this.X = JSON.parse(JSON.stringify(this.X).replace('undefined', "''"))
        this.Client = JSON.parse(JSON.stringify(this.Client).replace('undefined', "''"))
        switch(A){
            case 'Store!':
            this.r.params.subscribe((P:Params)=>{
                firebase.database().ref('/CotID/').once('value',Z=>{
                    N= +Z.val();
                }).then(()=>{
                    (P['id'].includes('!?')) ? N=this.N : N++;
                    firebase.database().ref('/Cots/'+N).set({
                        ChangeTy:this.Coin, Client:this.X[0].fill, Coin:this.Co, Contact:this.X[1].fill, Content:JSON.parse(JSON.stringify(this.B).replace('undefined', "''")),
                        DateG:new Date().toDateString(), Seller: this.User[0], Terms: this.Tc, Title: this.T, Notes:this.Nt,
                        XData1:this.X, XData2: this.Client, indexMonth:new Date().getMonth(), indexYear:new Date().getFullYear()
                    }).then(()=>{
                        this.r.params.subscribe((P:Params)=>{
                            if(P['id'].includes('!?')){
                                this.Datum= new Date()
                            } else {
                                this.R.navigate(['Edit','!?'+(N)+'-'+this.ID,111])
                            }
                        })
                    })
                })
            })
            break;
            case 'Show!':
                this.r.params.subscribe((P:Params)=>{
                    a.Maker(this.X,this.User,this.B,this.Co,this.T, this.N, this.Nt, this.Tc, this.CDate.toDateString(), (P['id'].includes('!?') ? this.Datum : undefined));
                })
            break;
            case 'Show Alt!':
                this.r.params.subscribe((P:Params)=>{
                    a.Alt(this.X,this.User,this.B,this.Co,this.T, this.N, this.Nt, this.Tc, this.CDate.toDateString(), (P['id'].includes('!?') ? this.Datum : undefined));
                })
            break;
            case 'Copy!':
                firebase.database().ref('/CotID/').once('value',Z=>{
                    this.N = +Z.val();
                    this.N++;
                    console.log(this.N)
                }).then(()=>{
                    console.log('Yo')
                    firebase.database().ref('/Cots/'+this.N).set({
                        ChangeTy:this.Coin, Client:this.X[0].fill, Coin:this.Co, Contact:this.X[1].fill, Content:this.B,
                        DateG:new Date().toDateString(), Seller: this.User[0], Terms: this.Tc, Title: this.T, Notes:this.Nt,
                        XData1:this.X, XData2: this.Client, indexMonth:new Date().getMonth(), indexYear:new Date().getFullYear()
                    }).then(()=>{
                        console.log('To')
                        alert('Cotizacion registrada exitosamente')
                        this.R.navigate(['Edit','!?'+(this.N)+'-'+this.ID,111])
                    })
                })
            break;
        }
    }
    K(){
        return this.T.length
    }
    End(A:number, B:number){
        this.B[A].D[B].Fin = this.B[A].D[B].Koin == 'Dolares'? this.B[A].D[B].CFact * this.B[A].D[B].TC : this.B[A].D[B].CFact;
        this.B[A].D[B].Unit =='SERVICIO ECO' ? this.B[A].D[B].Fin = this.B[A].D[B].CInicial * this.B[A].D[B].Cant : null;
    }
    Uti(A:number, B:number){
        this.B[A].D[B].UNet = (this.Co ? this.B[A].D[B].Ctot * +this.Coin : this.B[A].D[B].Ctot) - (this.B[A].D[B].Cant * this.B[A].D[B].Fin)
        this.B[A].D[B].Unit =='SERVICIO ECO' ? this.B[A].D[B].UNet = this.B[A].D[B].Koin == 'Dolares'? (this.B[A].D[B].CInicial * this.B[A].D[B].Cant) * this.B[A].D[B].TC : (this.B[A].D[B].CInicial * this.B[A].D[B].Cant) : null;
        this.B[A].SubU=0;
        this.B[A].SubT=0;
        this.B[A].D.forEach(I=>{
            console.log(I.Utilidad)
            this.B[A].SubU += (I.CInicial * (I.Utilidad/100)) * I.Cant;
            this.B[A].SubT += +I.Ctot;
        })
        console.log('Util', this.B[A].SubU)
    }
    Facts(A?:string){
        const a = new PDFLIB();
        const D = new Date();
        this.B.forEach((I,i) => {
            I.D.forEach((J,j) => {
                this.End(i,j);this.Uti(i,j);
            });
        });
        this.Gen.forEach(I => {
            I.UNet = I.Unit.includes('SERVICIO ECO') ? (I.CInicial * I.Cant) * +this.Coin : (this.Co ? I.Ctot * +this.Coin : I.Ctot) - (I.Cant * I.Fin);
        });
        let b;let Q= this.N +'-';
        firebase.database().ref('/Facts/').orderByChild('ID').
        startAt(Q).endAt(Q+'uf8ff').once('value', Z => {
            try {
                console.log(this.N, Z.val(), Object.keys(Z.val())[Object.keys(Z.val()).length-1]);
                b = Z.val()[Object.keys(Z.val())[Object.keys(Z.val()).length-1]].ID.split('-')[1];
                if (b== undefined){
                    b=0;
                } else {
                    b=parseInt(b)+1;
                }
            } catch(E) {
                b = 0;
            }
        }).then(() => {
            console.log(this.DeliveryA)
            if(A==undefined && !(a.Facts(this.X, this.User, this.Client, this.Gen, this.Coin, this.Co, this.N +'-'+ b,
            this.T, this.DeliveryA, this.Atn, this.RFC, this.CFDIUse, this.MetPag, this.ForPag) == 'Failed!')) {
                firebase.database().ref('/Facts/' + this.N + '-' + b).set({
                    Approved:0, Atn:(this.Atn.length > 0 ? this.Atn : ' '), ChangeTy:this.Coin, Client:this.X[0].fill,
                    Content:this.Gen, DateG: new Date().toDateString(), Directed:this.X[1].fill, Seller:this.User[0], ID:this.N + '-' + b,
                    Title:this.T, Coin:this.Co, indexMonth:new Date().getMonth(), RFC: this.RFC, CFDI:this.CFDIUse, PayMet: this.MetPag,
                    PayFor:this.ForPag, indexYear:new Date().getFullYear()
                });
            } else if(!(a.Facts(this.X, this.User, this.Client, this.Gen, this.Coin, this.Co, this.N +'-'+ b, this.T,
            this.DeliveryA, this.Atn, this.RFC, this.CFDIUse, this.MetPag, this.ForPag) == 'Failed!')) {
            } else {
                this.G.push({severity:'Error', summary:'No se pudo generar el PDF',
                detail:'Favor de verificar el llenado de campos, y bloqueadores de contenido'})
            }
        });
    }
    Modifyer(N:number,M?:number,n?:number){
        switch(n){
            case 0:
            this.B.splice(N + 1, 0, JSON.parse(JSON.stringify(this.B[N])) );
            break;
            case 1:
            this.B.splice(N + 1, 0, {Nom:'', SubT:0, SubU:0, ID:0,D:[{Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,
            CFact:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:0,DeliveryCF:0,DeliveryT:'',
            Comm:'', UNet:0, CommCot:'', Koin:'Pesos', TC:1, Fin:0, ID:0,Complex:false,C:[{PartN:'',Des:'',Cto:0,TC:1,Fin:0}] }] });
            break;
            case 2:
            let a = JSON.stringify(this.B[M].D);
                this.B[M].D.splice(N+1, 0, JSON.parse(a)[N]);
            break;
            default:
                this.B[M].D.splice(N+1, 0, {Cant:null,Unit:'',Desc:'',Prov:'',CInicial:null,CFact:null,Dcto:null,Utilidad:null,Ctot:null,DeliveryC:0,DeliveryCF:0,DeliveryT:'', Comm:'', UNet:0, CommCot:'', Koin:'Pesos', TC:1, Fin:0, ID:0,Complex:false,C:[{PartN:'',Des:'',Cto:0,TC:1,Fin:0}] });
            break;
        }
        this.B.forEach((I,i)=>{
            I.ID = i;
            I.D.forEach((J,j)=>{
                J.ID = j
            });
        });
    }
    Mailer() {
        console.log(this.User)
        let H = new Headers(), a;
        H.append('Content-Type', 'application/json');
        this.r.params.subscribe((P:Params)=>{
            a = new PDFLIB().Generate(this.X,this.User,this.B,this.Co,this.T, this.N, this.Nt, this.Tc, this.CDate.toDateString(), (P['id'].includes('!?') ? this.Datum : undefined));
            a.getBase64(data=>{
                //alert(data)
                console.log(this.MBody)
this.H.post('/Mail', JSON.stringify({"From":this.User[0]+' <'+ this.User[2]+'>', Subject:this.T, To:this.Dest, 'Cc':this.Cops, 'Cco':this.Hids, 'Text':this.MBody, 'Who':this.User[0], 'pdfdata':data}),{headers:H}).map(R=>{
                    console.log(R)
                }).subscribe();
            })
        })
        this.Mail=false;
    }
    Styler(What, who, J?,ID?, Field?) {
        console.log('Value of J', J);
        if(J==undefined){
            document.getElementById(What).style.backgroundColor = this[who].length == 0 ?  "#fe9920" : "#f2f3f4";
            console.log('This');
        } else {
            console.log('result', this[who][J].D[ID][Field].length == 0 ?  '#fe0909' : "#f2f3f4", What, this[who][J].D[ID][Field]);
            document.getElementById(What).style.backgroundColor = this[who][J].D[ID][Field].length == 0 ?  "#fe9920" : "#f2f3f4";
        }
    }
    blur(event: any) {
        const triggerEvent = document.createEvent('Event');
        triggerEvent.initEvent('keydown', true, true);
        (<any>triggerEvent).which = (<any>triggerEvent).keyCode = 13;
        event.target.dispatchEvent(triggerEvent);
      }
}
