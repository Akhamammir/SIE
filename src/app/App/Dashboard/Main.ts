import { Component,NgModule } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import { Router, Params, ActivatedRoute} from '@angular/router';
import {Message} from 'primeng/primeng';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
import * as firebase from "firebase";
import {Conns} from './../../Conections/Connection';
@Component({
    selector: 'app-root',
    templateUrl: './Main.html',
    styleUrls: ['./../../Frame.css'],
    styles: [`
        .LabelExe {
            font-weight:bold;
            width:30rem;
        }
        .Label {
            font-weight:bold;
        }
        .LabelClick {
            font-weight:bold;
            cursor: pointer;
        }
        .LabelClick:hover {
            background-color: #E0E0E0 !important;
        }
        .util {
            background-color: #1CA979 !important;
            color: #ffffff !important;
            cursor: pointer;
        }
        .util:hover {
            background-color: #45B891 !important;
        }
        .fact {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
            cursor: pointer;
        }
        .fact:hover {
            background-color: #52B7BF !important;
        }
        .firststage {
            background-color: #A31621 !important;
            color: #ffffff !important;
            font-weight: bold;
        }
        .secondstage {
            background-color: #F6511D !important;
            color: #ffffff !important;
            font-weight: bold;
        }
        .thirdstage {
            background-color: #F5F749 !important;
            font-weight: bold;
        }
        .fourthstage {
            background-color: #97CC04 !important;
            font-weight: bold;
        }
        .fifthstage {
            background-color: #3898F7 !important;
            color: #ffffff !important;
            font-weight: bold;
        }
    `
    ]
})
export class Main{
    bus=[];
    colu = [
        { field: 'ID', header: 'Ver Documento.' },
        { field: 'ID', header: 'O. de F.' },
        { field: 'Facted', header: 'Factura' },
        { field: 'Date', header: 'Fecha' },
        { field: 'Cli', header: 'Cliente' },
        { field: 'FactP', header: 'Monto Pesos' },
        { field: 'FactD', header: 'Monto Dolares' },
        { field: 'Util', header: 'Utilidad' },
        { field: 'Exe', header: 'Vendedor' },
    ]
    cols = [
        { field: 'Exe', header: 'Ejecutivo' },
        { field: 'Quote', header: 'Quota' },
        { field: 'Util', header: 'Utilidad' },
        { field: 'Comp', header: '%' },
        { field: 'FactP', header: 'Facturado Pesos' },
        { field: 'FactD', header: 'Facturado Dolares' },
        { field: 'CotP', header: 'Cotizado Pesos' },
        { field: 'CotD', header: 'Cotizado Dolares' }
    ];
    cols2 = [
        { field: 'Cant', header: 'Cantidad Total' },
        { field: 'Total', header: 'Total' },
        { field: 'PC', header: 'Por Comprar' },
        { field: 'MPC', header: 'Monto Pendiente' },
    ];
    cols3 = [
        { field: 'Cant', header: 'Cantidad Total' },
        { field: 'Total', header: 'Total' },
        { field: 'PC', header: 'Por Facturar' },
        { field: 'MPC', header: 'Monto Pendiente' },
    ];
    comps = [
        {field: ' ', header:'Ver O. de F.'},
        {field: 'Of', header:'O. de F.'},
        {field: 'dateF', header:'Fecha de F.'},
        {field: 'Oc', header:'O. de C.'},
        {field: 'dateC', header:'Fecha de C.'},
        {field: 'Unit', header:'Unit'},
        {field: 'Desc', header:'Desc'},
        {field: 'Cli', header:'Cliente'},
        {field: 'MountP', header:'Monto Pesos'},
        {field: 'MountD', header:'Monto Dolares'},
        {field: 'Time', header:'Tiempo Transcurrido'},
    ];
    types = [
        {label: 'Global', value: 0},
        {label: 'Enero', value: 1},
        {label: 'Febrero', value: 2},
        {label: 'Marzo', value: 3},
        {label: 'Abril', value: 4},
        {label: 'Mayo', value: 5},
        {label: 'Junio', value: 6},
        {label: 'Julio', value: 7},
        {label: 'Agosto', value: 8},
        {label: 'Sept.', value: 9},
        {label: 'Octubre', value: 10},
        {label: 'Nov.', value: 11},
        {label: 'Dic.', value: 12},
    ];
    years = [
        {label: '2018', value: '2018'},
        {label: '2019', value: '2019'},
        {label: '2020', value: '2020'},
    ]; G:Message []=[];
    Monthly=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    I:MenuItem[]=[];ID:string;sels=[[],[],[],[],[],[],[],[],[],[],[],[],[]]; serves=[[],[],[],[],[],[],[],[],[],[],[],[],[]]; 
    totals={sellstotal:{P:0,D:0}, servetotal:0, sellsfact:0, servefact:0};
    tables={};Path:MenuItem[]=[];home: MenuItem;Tables=[];Prev=[];Buys=[{Cant:0,Mount:0,PC:0,MPC:0,Total:0}];Facts=[{Cant:0,Mount:0,PC:0,MPC:0,Total:0}];
    data = {sales:{labels:[],datasets:[]},serves:{labels:[],datasets:[]}};data2 = {};data3 = {};Month=[0,0];Year='2019';
    State={main:true, sell:false, cli:false, buy:false, facts:false, Po:false};Buyed=[]
    constructor(private H:Http, private R:Router, private r:ActivatedRoute){}
    ngOnInit() {
        new Conns(this.H, this.R).Connect().then(()=>{
            console.log('Yo')
            this.setup('2019');
        }).catch(R=>{
            console.log(R)
            R == 'Conn Done' ? this.setup('2019') : this.G.push({severity:'Error', summary:'Error de conexion', detail:'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
    }
    Push(Name, Value, _Array:string) {
        this[_Array][0].push({Exe:Name.Name, Quote:50000 * (new Date().getMonth()+1),
         Util:Value.Totales[Name.Name], Comp:(Value.Totales[Name.Name] > 50000 * (new Date().getMonth()+1)? 1 : Value.Totales[Name.Name]/(50000 * (new Date().getMonth()+1))),
         FactP:Value.Facturas[Name.Name].P,FactD:Value.Facturas[Name.Name].D, CotP:Value.Cots[Name.Name].P, CotD:Value.Cots[Name.Name].D,
           Eff:((Value.Facturas[Name.Name].P/Value.Cots[Name.Name].P) + (Value.Facturas[Name.Name].D/Value.Cots[Name.Name].D))/2 });
        for (let a=1; a<13;a++){
            try{
                this[_Array][a].push({Exe:Name.Name, Quote:50000,
                    Util:Value.Mensuales[a].Utils[Name.Name], Comp:(Value.Mensuales[a].Utils[Name.Name] > 50000 ? 1 : Value.Mensuales[a].Utils[Name.Name]/50000),
                     FactP:Value.Mensuales[a].Facturaciones[Name.Name].P, FactD:Value.Mensuales[a].Facturaciones[Name.Name].D, CotP:Value.Mensuales[a].Cotizaciones[Name.Name].P, CotD:Value.Mensuales[a].Cotizaciones[Name.Name].D,
                      Eff:((Value.Mensuales[a].Facturaciones[Name.Name].P/Value.Mensuales[a].Cotizaciones[Name.Name].P)+(Value.Mensuales[a].Facturaciones[Name.Name].D/Value.Mensuales[a].Cotizaciones[Name.Name].D)/2 ) });
            } catch (E){}
        }
        //_Array=='sels' ? this.totals.sellstotal+= +Value.Totales[Name.Name] : this.totals.servetotal+= +Value.Totales[Name.Name]
        _Array=='sels' ? this.totals.sellsfact+= +Value.Facturas[Name.Name] : this.totals.servefact+= +Value.Facturas[Name.Name]
    }
    setup(Year: string) {
        this.sels=[[],[],[],[],[],[],[],[],[],[],[],[],[]];
        this.serves=[[],[],[],[],[],[],[],[],[],[],[],[],[]];
        let Names, Values;
        this.home= {icon:'fa fa-home',command:(event)=>{
            for (let a in this.State){
                this.State[a]=false;
            }
            this.State.main=true;
        }}
        this.data.sales = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                /*{
                    label: 'Don quijote',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor:'rgba(159,211,86,0)',
                    borderColor:'#F6511D'
                },
                {
                    label: 'Sancho Panza',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor:'rgba(245,60,60,0)',
                    borderColor:'#3A1772'
                },
                {
                    label: 'Dulcinea',
                    data: [65, 48, 80, 19, 56, 27, 40],
                    backgroundColor:'rgba(245,60,60,0)',
                    borderColor:'#2E86AB'
                }*/
            ]
        }
        firebase.database().ref('/Users').once('value', Z => {
            Names = Z.val();
        }).then(() => {
            firebase.database().ref('Indicadores/' + Year).once('value', Z => {
                this.Buys[0].MPC = Z.val().Totales['Comprados']
                this.Buys[0].Cant = Z.val().Totales['CompradosObjetos']
                this.Buys[0].PC = Z.val().Totales['NoComprados']
                this.Buys[0].Total = Z.val().Totales['TComprados']
                this.Facts[0].Cant = this.Buys[0].Cant
                this.Facts[0].Total = this.Buys[0].Total;
                this.Facts[0].PC = this.Buys[0].Cant;
                this.Facts[0].MPC = this.Buys[0].Total;
                this.totals.sellstotal={D:Z.val().FacturadoD, P:Z.val().FacturadoP}
                for (let a in Names) {
                    Names[a].Depto=='Ventas'||Names[a].Depto=='Gerencia' ? this.Push(Names[a], Z.val(), 'sels') : Names[a].Depto=='Area de Servicio' ? this.Push(Names[a], Z.val(), 'serves'): null;
                }
                console.log(this.sels)
            }).then(()=>{
                this.data2 = {
                    labels: ['Completados','No completados'],
                    datasets: [
                        {
                            data: [Math.floor(((this.Buys[0].Cant- this.Buys[0].PC) / this.Buys[0].Cant)*100), (Math.floor((this.Buys[0].PC / this.Buys[0].Cant)*100))],
                            backgroundColor: [
                                "#9FD356",
                                "#F53D3D"
                            ],
                            hoverBackgroundColor: [
                                "#A7D765",
                                "#F54E4E"
                            ]
                        }
                    ]
                }
                this.data3 = {
                    labels: ['Completados','No completados'],
                    datasets: [
                        {
                            data: [0, 100],
                            backgroundColor: [
                                "#9FD356",
                                "#F53D3D"
                            ],
                            hoverBackgroundColor: [
                                "#A7D765",
                                "#F54E4E"
                            ]
                        }
                    ]
                }
            })
        })
    }
    Go(Path, Who?, When?) {
        this.State.main = false;
        switch(Path){
            case 'Facts':
            this.Tables=[]
            this.Path=[{label:'Facturas del vendedor'}]
                firebase.database().ref('/Facts').orderByChild('Seller').equalTo(Who).once('value', Z => {
                    Object.keys(Z.val()).forEach(I => {
                        let N = 0, n = 0;
                        if (Z.val()[I].indexYear == this.Year) {
                            Z.val()[I].Content.forEach(i => {
                                n += isNaN(i.Ctot) ? 0 : +i.UNet;
                                N += isNaN(i.Ctot) ? 0 : +i.Ctot;
                            });
                            this.Tables.push({Exe:Z.val()[I].Seller, Cli:Z.val()[I].Client, Date:Z.val()[I].DateG,
                                FactP: Z.val()[I].Coin == 1 ? 0 : N, FactD: Z.val()[I].Coin == 1 ? N : 0, ID:Z.val()[I].ID,
                                Facted:'',Util:n, Koin:Z.val()[I].ChangeTy})
                        }
                    });
                    this.Prev = this.Tables;
                });
                this.State.sell = true;
            break;
            case 'Filtered':
            this.Path=[{label:'Facturas del vendedor',
            command:(event)=>{this.Tables=this.Prev; this.Path=[{label:'Facturas del vendedor'}]}},
            {label:'Facturas del vendedor a cliente'}]
                this.Tables= this.Tables.filter(S=>S.Cli == Who)
            break;
            case 'Monthly':
            this.Tables=[]
            firebase.database().ref('/Facts').orderByChild('Seller').equalTo(Who).once('value', Z=>{
                Object.keys(Z.val()).forEach(I => {
                    let N = 0, n = 0;
                    if (Z.val()[I].indexYear == this.Year) {
                        Z.val()[I].Content.forEach(i => {
                            n += isNaN(i.Ctot) ? 0 : +i.UNet;
                            N += isNaN(i.Ctot) ? 0 : +i.Ctot;
                        });
                        Z.val()[I].DateG.includes(this.Monthly[When-1]) ? this.Tables.push({Exe:Z.val()[I].Seller, Cli:Z.val()[I].Client, Date:Z.val()[I].DateG, FactP: Z.val()[I].Coin == 1 ? 0 : N, FactD: Z.val()[I].Coin == 1 ? N : 0, ID:Z.val()[I].ID, Facted:'',Util:n, Koin:Z.val()[I].ChangeTy}): null;
                    }
                });
                this.Prev = this.Tables;
            });
            this.State.sell = true;
            break;
            case 'POs':
            this.Tables=[]
                firebase.database().ref('/POs').once('value', Z=>{
                    let Temp=Z.val();
                    for (let a in Z.val()){
                        Temp[a].Content.forEach(I=>{
                            this.Tables.push({Of:I.MID, dateF:I.Date, Oc:Temp[a].PO, dateC:Temp[a].DateG,
                                 Unit:I.Unit, Desc:I.Desc, Cli:I.Cli, MountP:(I.MonC ? 0 : I.CFin), 
                                 MountD:(I.MonC ?  I.CFin :0), 
                                 Time:Math.round(Math.abs((+new Date(I.Date).setHours(0,0,0) - +new Date(Temp[a].DateG).setHours(0,0,0))/(1000 * 60 * 60 * 24))) })
                        })
                    }
                }).then(()=>{
                    this.State.Po= true;
                })
            break;
            case 'NoPOs':
            this.Tables=[]
                firebase.database().ref('/Facts').orderByChild('Content/0/PO').equalTo(null).once('value', Z=>{
                    let Temp=Z.val();
                    console.log('Hi',Temp)
                    for (let a in Z.val()){
                        Temp[a].Content.forEach(I=>{
                            this.Tables.push({Of:Temp[a].ID, dateF:Temp[a].DateG, Oc:'-', dateC:'-',
                                 Unit:I.Unit, Desc:I.Desc, Cli:I.Cli, MountP:'-', 
                                 MountD:'-', 
                                 Time:Math.round(Math.abs((+new Date(Temp[a].DateG).setHours(0,0,0) - +new Date().setHours(0,0,0))/(1000 * 60 * 60 * 24))) })
                        })
                    }
                }).then(()=>{
                    this.State.Po= true;
                })
            break;
        }
    }
    Summer(Who, What){
        let Util=0;
        switch(What){
            case 'Util':
                Who.forEach(I=>{
                    Util+=I.Util;
                });
            break;
            case 'FactP':
                Who.forEach(I=>{
                    Util+= +I.FactP;
                });
            break;
            case 'FactD':
                Who.forEach(I=>{
                    Util+= +I.FactD;
                });
            break;
            case 'FactG':
                Who.forEach(I=>{
                    Util+= +I.Fact;
                });
            break;
        }
        return Util
    }
    Painter(Perc:number){
        let a='';
        switch (Math.floor(Perc/25)) {
            case 0:
                a= 'firststage';
            break;
            case 1:
                a= 'secondstage';
            break;
            case 2:
                a= 'thirdstage';
            break;
            case 3:
                a= 'fourthstage';
            break;
            case 4:
                a= 'fifthstage';
            break;
        }
        return a;
    }
    FactsPDF(x:string){
        let X;let D1;let Client=['','',''];let D2;
        firebase.database().ref('/Cots/'+x.split('-')[0]).once('value',Z=>{
            console.log(Z.val())
            D1=Z.val();
            console.log(D1)
        }).then(()=>{
            firebase.database().ref('/Facts/'+x).once('value',Z=>{
                D2=Z.val();
                let a= new PDFLIB();
                console.log(D1)
                a.Facts(D1.XData1, D1.Seller, D1.XData2, D2.Content, (D1.ChangeTy ? D1.ChangeTy:'1') ,
                D1.Coin =='1' ? true :false, x , D1.Title, '', D2.Directed, D2.RFC,
                  D2.CFDIUse, D2.MetPag, D2.ForPag ) != 'Failed!' ? 
                  console.log('Blup') : this.G.push({severity:'Error', summary:'No se pudo generar el PDF',
                   detail:'Favor de verificar el llenado de campos, y bloqueadores de contenido'});
            });
        });
    }
}