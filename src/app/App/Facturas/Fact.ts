import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {SelectItem, Message, MenuItem, ConfirmationService} from 'primeng/primeng';
import {Conns} from './../../Conections/Connection';
import * as firebase from "firebase";
import 'rxjs/add/operator/map';
import {Dict} from './../../PdfTools/ImgDict/ImgDict';
import {PDFLIB} from './../../PdfTools/PdfLib/PDFLib';
declare let pdfMake;
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Fact.html',
    styleUrls: ['./../../Frame.css'],
    providers: [ConfirmationService]
})
export class Fac{
    A:any[]=[];Goin:any[]=[];ID:string='';USR:string=''; User:string[]=[];Co:boolean;G:Message []=[];
    Coin:string='0';X:string[]=[];Client:string[]=[];DeliveryA:string;Atn:string;Exe:string;
    UTot:number=0;ITot:number=0;GdTot:number=0;
    constructor(private H:Http, private R:Router, private r: ActivatedRoute){
        new Conns(H, R).Connect().then(()=>{
            this.Create();
        }).catch(R=>{
            this.Create();
        });
    }
    Create(){
        let ID;
        this.r.params.subscribe((P:Params)=>{
            this.ID= P['id'].split(',')[0].slice(2,P['id'].split(',')[0].length);
            this.USR=P['id'].split(',')[2];
            ID = (parseInt(this.ID.split('-')[0])-1000);
            console.log(parseInt(this.ID.split('-')[0])-1000)
            firebase.database().ref('/Facts/'+this.ID).once('value',Z=>{
                console.log(Z.val())
                this.Co=Z.val().Coin;
                this.Coin=Z.val().TC;
                this.Atn=Z.val().Atn;
                Z.val().Content.forEach(I=>{
                    this.A.push(I)
                    this.UTot = +this.UTot + +I.UNet;
                    this.ITot = +this.ITot + +I.Ctot;
                    this.GdTot = +this.GdTot + +I.DeliveryCF;
                    I.Utilidad = I.UNet;
                });

            })
        });
    }
    Facts(x:string){
        let X;let D1;let Client=['','',''];let D2;
        let H = new Headers();
        H.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"Edited":parseInt(x.split('-')[0])-1000}),{headers:H}).map(R=>{
            console.log(parseInt(x.split('-')[0])-1000)
            D1=R.json()[0];
        }).subscribe(()=>{
            this.H.post('/api', JSON.stringify({"FactSel":1, ID:x}),{headers:H}).map(R=>{
                D2=R.json()[0];
            }).subscribe(()=>{
                let a= new PDFLIB();
                console.log(D1)
                console.log(D1.ChanTy)
                a.Facts(JSON.parse(D1.XData.split('||')[0]), D1.Exe,JSON.parse(D1.XData.split('||')[1]), JSON.parse(D2.body),
                 (D1.ChanTy ? D1.ChanTy:'1'), D1.Coin =='1' ? true :false, x , D1.Nom, '', D2.Dir, D2.RFC,
                  D2.CFDIUse, D2.MetPag, D2.ForPag ) != 'Failed!' ? console.log('Blup') :
                  this.G.push({severity:'Error', summary:'No se pudo generar el PDF',
                  detail:'Favor de verificar el llenado de campos, y bloqueadores de contenido'});
            });
        });
    }
}