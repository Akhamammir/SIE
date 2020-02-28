import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {Dict} from './../../PdfTools/ImgDict/ImgDict';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './CompG.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class ComprasG{
    Ori:any[]=[];Gen:any[];Tbl:number;G:Message []=[];States:SelectItem[]=[];Dis=false;
    items:Array<{Nm:Array<{A:string}>}>=[];Koins:SelectItem[]=[];Send:any[];Env
    Kolors:SelectItem[]=[{label:'Comprados', value:0},{label:'Enviados', value:1},{label:'Entregados', value:2},{label:'Alta en Admin', value:3},{label:'Facturados', value:4}];
    Color:number;Colors:number[]=[];F:string[]=[];Provided:any[]=[]; activeIndex: number = 0;
    Delivered:string[]=['','','','','','',''];Ecosta:boolean=false;Cols:any[];
    Items: MenuItem[] = [
            {label: 'Datos de Proveedor'},
            {label: 'Datos de Entrega'}
        ];
    constructor(private H:Http, private R:Router, private c:ConfirmationService, private r:ActivatedRoute){}
    ngOnInit(){
        console.log(this.States[0])
        this.Koins.push({label:'Pesos', value:0},{label:'Dolares', value:1})
        this.Tbl=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let H = new Headers();let E:any[]=[];let e={Guide:'[]',PO:'',body:null, Delv:'[]', Fact:'[]', High:'[]'};let K=0;
        H.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"EnvLst":1}),{headers:H}).map(R=>{
            R.json().forEach(I=>{
                E.push(I)
            })
        }).subscribe(()=>{
            this.H.post('/api', JSON.stringify({"FactLst":1}),{headers:H}).map(R=>{
                R.json().forEach(I=>{
                    I.Approved = I.Approved==1 ? true:false;
                    JSON.parse(I.body).forEach((i,j)=>{
                        if(i.PO){
                            e=E.find(S=>S.PO.toString() === i.PO.toString())
                            let a:string
                            let b=JSON.parse(e.body);
                            K=b.indexOf(b.find(T=>T.Unit==i.Unit))
                            console.log(i,K,JSON.parse(e.Fact)[K])
                            console.log(K)
                            console.log(JSON.parse(e.Fact)[K])
                        }
                        if(I.Approved){
                            this.Ori.push(i)
                            this.Ori[this.Ori.indexOf(i)].Approved= I.Approved;
                            this.Ori[this.Ori.indexOf(i)].Unit= this.Ori[this.Ori.indexOf(i)].Unit ? this.Ori[this.Ori.indexOf(i)].Unit : 'N/A'
                            this.Ori[this.Ori.indexOf(i)].Desc= this.Ori[this.Ori.indexOf(i)].Desc ? this.Ori[this.Ori.indexOf(i)].Desc : 'N/A'
                            this.Ori[this.Ori.indexOf(i)].Cli= this.Ori[this.Ori.indexOf(i)].Cli ? this.Ori[this.Ori.indexOf(i)].Cli : 'N/A'
                            this.Ori[this.Ori.indexOf(i)].Mon=I.Coin
                            this.Ori[this.Ori.indexOf(i)].MonC = this.Ori[this.Ori.indexOf(i)].MonC ? this.Ori[this.Ori.indexOf(i)].MonC : 0;
                            this.Ori[this.Ori.indexOf(i)].Date=I.DateG
                            this.Ori[this.Ori.indexOf(i)].ID=I.id + '-' + this.Ori[this.Ori.indexOf(i)].ID.toString()
                            this.Ori[this.Ori.indexOf(i)].MID=I.id;
                            this.Ori[this.Ori.indexOf(i)].Cli=I.Cli;
                            this.Ori[this.Ori.indexOf(i)].TdE = this.Ori[this.Ori.indexOf(i)].TdE ? this.Ori[this.Ori.indexOf(i)].TdE : '';
                            this.Ori[this.Ori.indexOf(i)].Pedido = this.Ori[this.Ori.indexOf(i)].Pedido ? this.Ori[this.Ori.indexOf(i)].Pedido : '';
                            //console.log(this.Ori[this.Ori.indexOf(i)].Stat.Stat, this.Ori[this.Ori.indexOf(i)].Desc)
                            this.Ori[this.Ori.indexOf(i)].CCompra= this.Ori[this.Ori.indexOf(i)].CCompra ? this.Ori[this.Ori.indexOf(i)].CCompra : 0;
                            this.Ori[this.Ori.indexOf(i)].PReal= this.Ori[this.Ori.indexOf(i)].PReal ? this.Ori[this.Ori.indexOf(i)].PReal : '';
                            this.Ori[this.Ori.indexOf(i)].Complete= this.Ori[this.Ori.indexOf(i)].Complete ? this.Ori[this.Ori.indexOf(i)].Complete : 0;
                            this.Ori[this.Ori.indexOf(i)].Com= this.Ori[this.Ori.indexOf(i)].Com ? this.Ori[this.Ori.indexOf(i)].Com : '';
                            this.Ori[this.Ori.indexOf(i)].TdC= this.Ori[this.Ori.indexOf(i)].TdC ? this.Ori[this.Ori.indexOf(i)].TdC : 1;
                            this.Ori[this.Ori.indexOf(i)].GdE= this.Ori[this.Ori.indexOf(i)].GdE ? this.Ori[this.Ori.indexOf(i)].GdE : 0;
                            this.Ori[this.Ori.indexOf(i)].CFin= this.Ori[this.Ori.indexOf(i)].CFin ? this.Ori[this.Ori.indexOf(i)].CFin : 0;
                            this.Ori[this.Ori.indexOf(i)].Commit= this.Ori[this.Ori.indexOf(i)].Commit ? this.Ori[this.Ori.indexOf(i)].Commit : 0;
                            this.Ori[this.Ori.indexOf(i)].Complete= this.Ori[this.Ori.indexOf(i)].Complete ? this.Ori[this.Ori.indexOf(i)].Complete : 'No Atendida';
                            this.Ori[this.Ori.indexOf(i)].Bought= i.PO ? true : false;
                            this.Ori[this.Ori.indexOf(i)].Sent= JSON.parse(e.Guide)[K] ? true : false;
                            this.Ori[this.Ori.indexOf(i)].Delivered= JSON.parse(e.Delv)[K] ? true : false;
                            this.Ori[this.Ori.indexOf(i)].Highed= JSON.parse(e.High)[K] ? true : false;
                            this.Ori[this.Ori.indexOf(i)].Facted= JSON.parse(e.Fact)[K] ? true : false;
                            this.items.push({Nm:[]})
                        }
                    });
                 });
                this.Gen=this.Ori.reverse();
                //this.Colorer();
            }).subscribe();
        })
        this.Cols = [
            { field: 'MID', header: 'O. de F.' },
            { field: 'Cli', header: 'Cliente' },
            { field: 'Cant', header: 'Cant' },
            { field: 'Unit', header: 'No. de Parte.' },
            { field: 'Desc', header: 'Descripcion' },
            { field: 'Prov', header: 'Provedor S.' },
            { field: 'CInicial', header: 'C. Vend' },
            { field: 'Mon', header: 'Moneda' },
            { field: 'Comm', header: 'Comentarios V.' },
            { field: 'CCompra', header: 'Costo Compra' },
            { field: 'PReal', header: 'Prov. Real' },
            { field: 'MonC', header: 'Moneda C.' },
            { field: 'TdC', header: 'T. de C.' },
            { field: 'GdE', header: 'Gastos de Envio' },
            { field: 'TdE', header: 'T. de Entrega' },
            { field: 'Commit', header: 'Comision' },
            { field: 'CFin', header: 'Importe' },
            { field: 'CFin', header: 'Subtotal' },
            { field: 'Pedido', header: 'No. Pedido' },
            { field: 'Com', header: 'Comentario C.' },
            { field: 'Date', header: 'Fecha' },
            { field: 'Date', header: 'Tiempo Trans' },
            { field: 'Bought', header: 'Compra' },
            { field: 'Sent', header: 'Envio' },
            { field: 'Highed', header: 'Alta' },
            { field: 'Delivered', header: 'Entrega' },
            { field: 'Facted', header: 'Facturacion' },
            { field: 'PO', header: 'Acciones' },
        ];
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
    Set(E:Event, i:number){
        console.log(this.Gen[i].Stat.stats)
        this.Gen[i].Complete = this.Gen[i].Stat.stats[0].value;
        this.onBasicUpload(E,i)
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
        let Temp:any[]=[];
        Temp=this.Ori;
        console.log(this.Colors)
        if (this.Colors.length == 0){
            this.Gen=Temp;
            return;
        } else {
            this.Colors.forEach(I=>{
                console.log('I shouldnt be here')
                switch(I){
                    case 0 :
                    Temp = Temp.filter(S=>S.Bought == true)
                    break;
                case 1 :
                    Temp = Temp.filter(S=>S.Sent == true)
                    break;
                case 2 :
                    Temp = Temp.filter(S=>S.Delivered == true)
                    break;
                case 3 :
                    Temp = Temp.filter(S=>S.Highed == true)
                    break;
                case 4 :
                    Temp = Temp.filter(S=>S.Facted == true)
                    break;
                }
            })
            this.Gen=Temp;
        }
    }
    onBasicUpload(E, i:number, A?:string){
        console.log(E.files)
        let a = this.Gen[i].ID;
        console.log(a);
        A==undefined ? null : this.Gen[i][A].Nm[this.Gen[i][A].Kount]=E.files[0].name.slice(E.files[0].name.lastIndexOf('.'),E.files[0].name.length);
        A==undefined ? null : this.Gen[i][A].Kount=this.Gen[i][A].Kount+1;
        this.Gen[i].ID= this.Gen[i].ID.split('-')[2]
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        console.log(this.Gen[i]);
        let b:any[];let c:number;let d;
        this.H.post('/api', JSON.stringify({"FactSel":1,'ID':a.split('-')[0]+'-'+a.split('-')[1]}),{headers:H}).map(R=>{
             b =JSON.parse(R.json()[0].body);
             console.log(R.json()[0])
             c=R.json()[0].stat;
             d=R.json()[0].id;
         }).subscribe(()=>{
            console.log(b)
            console.log(this.Gen[i].Stat)
            b[b.indexOf(b.find(I=>I.ID==this.Gen[i].ID))] = this.Gen[i]
            console.log(b)
            this.H.post('/api', JSON.stringify({"FactUpBod":1, 'Bod':JSON.stringify(b), 'ID':a.split('-')[0]+'-'+a.split('-')[1]}),{headers:H}).map(R=>{
                console.log(R.json());
            }).subscribe(()=>{
                this.Gen[i].ID= a;
                console.log(c)
                if(c < this.Gen[i].Stat.Stat){
                    this.H.post('/api', JSON.stringify({"FactUpStat":1, 'Stat':this.Gen[i].Stat.Stat, 'ID':d}),{headers:H}).map(R=>{
                        console.log(R.json())
                    }).subscribe();
                }
            })
         });
        this.G.push({severity:'success',summary:A != undefined ? 'Se subio correctamente la imagen':'Producto Comprado exitosamente', detail:'Sin errores en el servidor'});
        setTimeout(()=>{
            this.G=[];
        }, 1700)
    }
    OCer(OP:string){
        let b;
        console.log(OP)
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"EnvSel":1, 'PO':OP}),{headers:H}).map(R=>{
            console.log(JSON.parse(R.json()[0].body))
            b=R.json()[0];
        }).subscribe(()=>{
            console.log(b)
            let a = new PDFLIB().Builder(OP, JSON.parse(b.SendA), JSON.parse(b.prov), JSON.parse(b.body), b.Type)
        })
    }
}