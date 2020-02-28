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
const Aroute: Routes =[
  {path: 'main', component: Main},
  {path: '', component:Login, children:[]}
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
