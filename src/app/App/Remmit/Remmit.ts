import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import {Conns} from '../../Conections/Connection';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Remmit.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Remmits{
    Ori: any[]= []; Gen: any[]; Tbl: number; G: Message []= []; States: SelectItem[]= []; Dis= false; T; b;
    items: Array<{Nm: Array<{A: string}>}>= []; Koins: SelectItem[]= []; Send: any[]; P2: any[]= [];
    Color: number; F: string[]= []; Provided: any[]= []; activeIndex = 0; PP: any[]= []; Majora: number;
    Delivered: string[]= ['', '', '', '', '', '', '']; Ecosta= false; Pl: SelectItem[]= []; PL: any; Roll= '';
    Cl: SelectItem[]= []; Cc: SelectItem[]= []; Clnt: any; Cnt: any; AddUPrice= ''; AddCant= ''; AddDesc= ''; AddSerial= ''; CommRem= '';
    AddUnit= ''; AddCli= '';
    Items: MenuItem[] = [
            {label: 'Datos de Proveedor'},
            {label: 'Datos de Entrega'}
        ];
    constructor(private H: Http, private R: Router, private c: ConfirmationService, private r: ActivatedRoute) {
        this.Roll = this.r.snapshot.paramMap.get('Roll');
        this.Koins.push({label: 'Pesos', value: 0}, {label: 'Dolares', value: 1});
        new Conns(H, R).Connect().then(() => {
            this.Compser();
        }).catch(Res => {
            console.log(Res);
            Res == 'Conn Done' ? this.Compser() : this.G.push({severity: 'Error', summary: 'Error de conexion',
            detail: 'No se pudo Conectar base de datos favor de verificar la conexion a internet!'});
        });
        console.log(this.Roll)
    }
    async Process(A: any) {
        for(let I in A){
            A[I].Content.forEach((i,j)=>{
                if(!(i.Unit=='SERVICIO ECO')) {
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
    Compser() {
        this.Ori = [];
        firebase.database().ref('/Facts').orderByChild('indexMonth').startAt(8).once('value', Z => {
            this.Gen = []; this.Ori = [];
            this.Process(Z.val());
        });
        firebase.database().ref('/Proveedores').once('value', Z => {
            this.PP = [];
            console.log('Hi');
            for(let I in Z.val()){
                this.PP.unshift(Z.val()[I])
                this.PP[0].Alias=I;
                this.PP[0].Serial='';
            }
            console.log(this.PP);
        });
    }
    DateR(D: string) {
        const a = new Date(D);
        return Math.round(Math.abs((+new Date(D).setHours(0, 0, 0) - +new Date().setHours(0, 0, 0)) / (1000 * 60 * 60 * 24)));
    }
    RowS(D: any, rowIndex: number) {
        return D.Stat != 0 ? 'Yaay' : Math.abs(new Date().getDate() - new Date(D.Date).getDate()) > 1 ? 'Awww' :
        (new Date().getMonth() != new Date(D.Date).getMonth() ? 'Awww' :
        (new Date().getFullYear() != new Date(D.Date).getFullYear() ? 'Awww' : 'GoodJob'));
    }
    Nani(N) {
        return (!isNaN(N) && N != '');
    }
    Modded(E: Event, A: string) {
        window.open('/' + A, undefined, undefined, false);
    }
    Filter() {
        let Temp = this.Ori;
        this.F.forEach(I => {
            Temp = Temp.filter(S => S.Desc.toLowerCase().includes(I.toLowerCase()) ||
            JSON.stringify(S.Stat).toLowerCase().includes(I.toLowerCase())
            || S.MID.toLowerCase().includes(I.toLowerCase()) || S.Cli.toLowerCase().includes(I.toLowerCase())
            || S.Unit.toLowerCase().includes(I.toLowerCase()));
        });
        this.F.length > 0 ? this.Gen = Temp : this.Gen = this.Ori;
    }
    Arr(A, V: string) {
        console.log(this.PP);
        const P2 = A.filter(I => I.Alias.toLowerCase().includes(V.toLowerCase()));
        this.P2 = P2.slice(0, 7);
    }
    One(IDM, OP: OverlayPanel, C: string) {
        OP.hide();
        this.Gen[IDM].PReal = C;
        console.log(this.Gen[IDM]);
    }
    Adder() {
        console.log(this.Send);
        this.Ori.unshift({Approved: 0, C: this.Ori[0].C, CCompra: 0, CFact: 0, CFin: 0, CInicial: +this.AddUPrice,
         Cant: this.AddCant, Cli: this.AddCli, Com: '', Comm: '', CommCot: '', Commit: 0, Complex: false,
          Ctot: (+this.AddUPrice * +this.AddCant), Date: new Date().toDateString(), Dcto: 0, DeliveryC: 0, DeliveryCF: 0,
           DeliveryT: 'Inmediato', Desc: this.AddDesc, Fin: 0, GdE: 0, ID: '0-0-0', Koin: 'Pesos', MID: '0-0', MonC: false, PReal: 'None',
            Pedido: 'none', Prov: 'None', Stat: 0, TC: 1, TdC: 1, TdE: '', UNet: 0, Unit: this.AddUnit, Utilidad: 0});
    }
    async Go() {
        firebase.database().ref('/RemCount/').once('value', Z => {
            let No = Z.val();
            console.log(this.Send[0]);
            const a = new PDFLIB().Rem(this.Send, this.Send[0].Cli, No, this.CommRem);
            if (a != 'Error') {
                firebase.database().ref('/Rems/' + No).set({
                    RNo: Z.val(), Client: this.Send[0].Cli, Content: this.Send,
                    SecC: a, dateG: new Date().toDateString()
                }).then(() => {
                    this.Send.forEach(I => {
                        if (I.MID != '0-0') {
                            firebase.database().ref('/Facts/' + I.MID + '/Content/' + I.ID.split('-')[2]).update({Rem: No});
                        }
                    });
                    No++;
                    firebase.database().ref('/RemCount/').set(No);
                });
            } else {
                this.G.push({severity: 'error', summary: 'Error de Remision', detail: 'Error General reporte el error:'});
            }
        });
    }
    Modifyer(N: number, n?: number) {
        switch (n) {
            case 1:
                this.Ori.splice(N, 0, this.Gen[N]);
                this.Gen = this.Ori;
            break;
            default:
                this.Ori.splice(N, 0, this.Gen[N]);
                this.Gen = this.Ori;
            break;
        }
        console.log(N);
        console.log(JSON.stringify(this.Gen[N]));
    }
}
