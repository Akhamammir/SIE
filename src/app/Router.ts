import {Directive, ElementRef, Output, HostListener} from '@angular/core';
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {}
    @Output()
    public clickOutside = new EventEmitter();
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { RouterModule, Routes, Params, RoutesRecognized, NavigationStart } from '@angular/router';
import {Login} from './App/Login/Log';
import {Main} from './App/Dashboard/Main';
import { Http, Headers } from '@angular/http';
import {Input,OnInit,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import { Delving } from './App/Deliveries/Delving';
import { High } from './App/AltaAdmin/High';
import { Auth } from './App/Auth/Auth';
import { Cat } from './App/Categories/Cat';
import { DelvingCli } from './App/ClientDeliveries/DelvingCli';
import { Clnt } from './App/Clients/Clnt';
import { CompEco } from './App/CompEcosa/CompEco';
import { Comp } from './App/Compras/Comp';
import { Cots } from './App/Cotizations/Cots';
import { Links } from './App/Enlaces/Lnk';
import { Envios } from './App/Envios/Env';
import { EnviosEc } from './App/EnviosEcosa/EnvEc';
import { EnviosEco } from './App/EnviosEcosta/EnvEco';
import { Fact } from './App/Facturacion/Facting';
import { Fac } from './App/Facturas/Fact';
import { ComprasG } from './App/Kardex/CompG';
import { Catalog } from './App/ListCots/Gen';
import { FactalogComponent } from './App/ListFacts/GenF';
import { Pactalog } from './App/ListPO/GenP';
import { CatalogR } from './App/ListRelation/GenR';
import { CatalogRem } from './App/ListRem/GenRem';
import { Prods } from './App/Products/Prod';
import { Provs } from './App/Providers/Prov';
import { Remmits } from './App/Remmit/Remmit';
import { Rols } from './App/Roles/Roles';
import { Ticketeer } from './App/Ticketeer/Ticketeer';
import { TCatalog } from './App/Ticketlist/TList';
import { Ticketup } from './App/TicketUp/Ticketup';
import { Users } from './App/Users/Usr';
const Aroute: Routes =[
    {path: 'main', component: Main},
    {path: '', component: Login, children:[]},
    {path: 'altaadmin', component: High},
    {path: 'auth', component: Auth},
    {path: 'categories', component: Cat},
    {path: 'clientdeliveries', component: DelvingCli},
    {path: 'clients', component: Clnt},
    {path: 'compecosa', component: CompEco},
    {path: 'compras', component: Comp},
    {path: 'cotizations', component: Cots},
    {path: 'dashboard', component: Main},
    {path: 'deliveries', component: Delving},
    {path: 'enlaces', component: Links},
    {path: 'envios', component: Envios},
    {path: 'enviosecosa', component: EnviosEc},
    {path: 'enviosecosta', component: EnviosEco},
    {path: 'facturacion', component: Fact},
    {path: 'facturas',component: Fac},
    {path: 'kardex', component: ComprasG},
    {path: 'listcots', component: Catalog},
    {path: 'listfacts', component: FactalogComponent},
    {path: 'listpo', component: Pactalog},
    {path: 'listrelation', component: CatalogR},
    {path: 'listrem', component: CatalogRem},
    {path: 'login', component: Login},
    {path: 'products', component: Prods},
    {path: 'providers', component: Provs},
    {path: 'remmit', component: Remmits},
    {path: 'roles', component: Rols},
    {path: 'ticketeer', component: Ticketeer},
    {path: 'ticketlist', component: TCatalog},
    {path: 'ticketup', component: Ticketup},
    {path: 'users', component: Users},
];

@Component({
    encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './Frame.html',
  styleUrls: ['./Frame.css']
})
@NgModule({
  declarations:[Login, ClickOutsideDirective],
  imports:[
    RouterModule.forRoot(Aroute),
    RouterModule,
  ]
})
export class Routing {
    show:boolean=false;
    title = 'app works!';Where:string='';Roll='';
    USR:string;B: MenuItem[];e:HTMLElement;
    constructor(private H:Http, private R:Router){}
    ngOnInit() {
        this.e = document.getElementById('Menu');
        this.R.events.subscribe(P => {
            P instanceof NavigationStart ? (P.url=='/' || P.url.includes('FSH') ? this.e.style.display='none': this.e.style.display='block' ): null;
            P instanceof NavigationStart ? this.Where= P.url : null;
            P instanceof RoutesRecognized ? this.USR=P.state.root.firstChild.params['id']:null;
            P instanceof RoutesRecognized ? this.Roll=P.state.root.firstChild.params['Roll']:null;
            if(this.USR){this.USR.includes('!?') ? this.USR=this.USR.split('-')[1]: this.USR;}
            if(this.USR){this.USR.includes(',') ? this.USR=this.USR.split(',')[this.USR.split(',').length-1]: this.USR;}
            //console.log(this.Where=='/Auth/'+this.USR+'/222')
            P instanceof NavigationStart ? this.Menuer() : null;
        });
    }
    Cont(){
      this.show= (!this.show);
      this.show ? this.e.style.display='block': this.e.style.display='none' ;
    }
    Menuer(){
        let i:MenuItem[]=[];
            let h = new Headers();
            h.append('Content-Type', 'application/json');
            this.H.post('/api', JSON.stringify({"LnkLst":1}),{headers:h}).map(R=>{
                R.json().forEach(I=>{
                    console.log(I)
                    i.push({
                        label: I.Name,
                        icon: 'fa-globe',
                        command:()=>{
                            window.open(I.Link);
                        }
                    })
                });
            }).subscribe();
            this.B = !(this.Where.includes('/Auth'))&&!(this.Where.includes('/ComE')) ? [
            {label: 'Inicio', icon: 'fa fa-fw fa-home',command: ()=>{this.R.navigate(['main',this.USR,this.Roll]);}},
            {
                label: 'Administracion', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Usuarios', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Usr',this.USR,this.Roll]);}},
                    {label: 'Roles', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Roll',this.USR,this.Roll]);}},
                    {label: 'Proveedores', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Prov',this.USR,this.Roll])}},
                    {label: 'Clientes', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Clt',this.USR,this.Roll]);}},
                    {label: 'Categorias', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Cat',this.USR,this.Roll]);}},
                    {label: 'Productos', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Prod',this.USR,this.Roll]);}},
                    {label: 'Accesos', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.R.navigate(['Link',this.USR,this.Roll]);}}
                ]
            },
            {
                label: 'Produccion', icon: 'fa fa-fw fa-bars',
                items: [
                    {label: 'Cotizacion', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Cots',this.USR,this.Roll]);}},
                    {label: 'Ordenes de Facturacion', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Factalog',this.USR,this.Roll]);}},
                    //{label: 'Kardex', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['ComG',this.USR,this.Roll]);}}
                ]
            },{
                label: 'Compras', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Por comprar', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Com',this.USR,this.Roll]);}},
                    {label: 'Ordenes de Compra', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['POs',this.USR,this.Roll]);}},
                    {label: 'Altas en Admin', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['High',this.USR,this.Roll]);}},
                    {label: 'Facturacion', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Facting',this.USR,this.Roll]);}},
                    {label: 'Remisiones', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Remm',this.USR,this.Roll]);}},
                    {label: 'Lista de Remisiones', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Remms',this.USR,this.Roll]);}}
                    //{label: 'Por facturar', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Facting',this.USR,this.Roll]);}}
                ]
            },{
                label: 'Envios', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Envios Directos', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Env',this.USR,this.Roll]);}},
                    {label: 'Envios Ecosa', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['EnvEc',this.USR,this.Roll]);}},
                    {label: 'Envios Ecosta', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['EnvEco',this.USR,this.Roll]);}},
                    {label: 'Entregas Cliente', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['DelvingCli',this.USR,this.Roll]);}},
                    {label: 'Entregas Ecosta', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Delving',this.USR,this.Roll]);}},
                    {label: 'Relaciones de Envios', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Rels',this.USR,this.Roll]);}},
                ]
            },{
                label: 'Tickets', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Calendario', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['Ticket',this.USR,this.Roll]);}},
                    {label: 'Lista de Tickets', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['TicketL',this.USR,this.Roll]);}},
                    {label: 'Generar Ticket', icon: 'fa fa-fw fa-bars',  command: () => {this.R.navigate(['CreateT',this.USR,this.Roll]);}},
                ]
            },{
                label: 'Enlaces', icon: 'fa fa-fw fa-paint-brush',
                items: i
            },
            {label: 'Log out', icon: 'fa fa-fw fa-book', command:()=>{this.R.navigate(['/'])}}
        ] : [{label: 'Log out', icon: 'fa fa-fw fa-book', command:()=>{this.R.navigate(['/'])}}];
    }
    List(A:string){
        this.B.forEach(I=>{
            let e:HTMLElement = document.getElementById(I.label);
            I.label != A ? e.style.display='none' : null;            
        })
        let e:HTMLElement = document.getElementById(A);
        e.style.display=='block' ? e.style.display='none': e.style.display='block';
    }
}
