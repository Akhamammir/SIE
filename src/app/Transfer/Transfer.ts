import { Component,NgModule, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ConfirmationService} from 'primeng/primeng';
import * as firebase from "firebase";
import 'firebase/firestore';
import {Hash} from '../Auxiliaries/Models';
import 'rxjs/add/operator/map';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Transfer.html',
    styleUrls: ['./../Frame.css'],
    providers: [ConfirmationService]
})
export class Trans{
    Emp:any[]=[];Dis=false;Conf:string='';Cf:string;
    constructor(private H:Http, private R:Router, private C:ConfirmationService, private r:ActivatedRoute){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ConfigLst":1}),{headers:h}).map(R=>{
        console.log(R.json()[0])
            firebase.initializeApp(JSON.parse(R.json()[0].Config));
        }).subscribe();
    }
    
    One(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"UsrLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                firebase.database().ref('Users/' + I.Usr).set({
                    Pswd: I.Pswd, Birth:I.Birth, Blood:I.Blod, CP:I.CP, Cel:I.Cel, Col:I.Col,
                    Commie:I.Commie, DateIn:I.DateIn, Depto:I.Dept, Dir:I.Dir, NSS:I.NSS,Name:I.Name,
                    Pos:I.Position, RFC:I.RFC, TelA:I.TelA, Estado:I.estado, ID: I.id, Mail:I.mail.toString().toLowerCase() +'@ecosta.com.mx'
                });
            });
        });
    }
    Two(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ProLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                firebase.database().ref('Proveedores/' + I.Alias).set({
                    Razon: I.Razon, Bank:JSON.parse(I.Bank), CP:I.CP, Ciudad:I.Ciudad, Col:I.Colonia,
                    Contactos:JSON.parse(I.Contactos), Delv:JSON.parse(I.Delv), Dir:I.Direccion, Estado:I.Estado,
                    RFC:I.RFC, Weba:(I.Weba.length>0? I.Weba : 'N/A'), Webp:(I.Webp.length>0? I.Webp : 'N/A'), Webu:(I.Webu.length>0? I.Webu : 'N/A')
                });
            });
        });
    }
    Three(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CliLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            let a:string 
            this.Emp.forEach(I=>{
                a= I.Alias.replace(/\./g,'')
                firebase.database().ref('Clientes/' + a).set({
                    Razon: I.Razon, Bank:JSON.parse(I.Bank), CP:I.CP, Ciudad:I.Ciudad, Col:I.Colonia,
                    Contactos:JSON.parse(I.Contactos), Dir:I.Direccion, Estado:I.Estado,
                    RFC:I.RFC, Dirs:JSON.parse(I.Dirs)
                });
            });
        });
    }
    Four(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ProdLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            let a:string 
            this.Emp.forEach(I=>{
                a= I.PartNo.replace(/\.|\#/g,'')
                firebase.database().ref('Productos/' + a).set({
                    CaH:I.CaH, Cat: I.Cat, DesH:I.DesH, LongD:I.LongD, ShortD:I.ShortD
                });
            });
        });
    }
    Five(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CatLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                firebase.database().ref('Categorias/').set({
                    Name: I.Name
                });
            });
        });
    }
    Six(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"RolLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                firebase.database().ref('Roles/' + I.Name).set({
                    Permits:JSON.parse(I.permits)
                });
            });
        });
    }
    Seven(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"CotLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
                console.log(JSON.parse(I.Cont))
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                let a = JSON.parse(I.Cont)
                a.forEach((K,L)=>{
                    K.D.forEach((i,j)=>{
                        delete i['_$visited']
                        I['Dcto']=0;
                    })
                })
                firebase.database().ref('Cots/' + +I.id + 1000).set({
                    ChangeTy:I.ChanTy, Coin:I.Coin, Content:a,Contact:I.Contact,Client:I.Emp,
                    Seller:I.Exe, Title:I.Nom, Notes:JSON.parse(I.Notes), Terms: I.Terms, XData1:JSON.parse(I.XData.split('||')[0]),
                    XData2:JSON.parse(I.XData.split('||')[1]), DateG: new Date(I.dateG).toDateString()
                });
            });
        });
    }
    Eight(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"FactLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                let a = JSON.parse(I.body)
                a.forEach((I,J)=>{
                    delete I['_$visited']
                })
                firebase.database().ref('Facts/' + I.id).set({
                    ChangeTy:I.TC, Coin:I.Coin, Content:a,Atn:I.Atn,Client:I.Cli,
                    Seller:I.Maker, Title:I.Name, Directed:I.Dir, Approved:I.Approved,
                     DateG: new Date(I.DateG).toDateString(), ID:I.id
                });
            });
        });
    }
    Nine(){
        this.Emp=[];
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"EnvLst":1}),{headers:h}).map(R=>{
            console.log(R);
            R.json().forEach(I => {
                this.Emp.push(I)
                console.log(I)
            });
        }).subscribe(()=>{
            this.Emp.forEach(I=>{
                let a = JSON.parse(I.body)
                a.forEach((I,J)=>{
                    delete I['_$visited']
                })
                firebase.database().ref('POs/' + I.id).set({
                    ChangeTy:I.TC, Coin:I.Moneda, Content:a, Commission:I.Com, Delv:JSON.parse(I.Delv),
                    Fact:JSON.parse(I.Fact), Guide:JSON.parse(I.Guide), High:JSON.parse(I.High), 
                    PO: I.PO, Prov:JSON.parse(I.prov), SendA:JSON.parse(I.SendA), Type: I.Type,
                    DateG: new Date(I.DateG).toDateString()
                });
            });
        });
    }
    Verify(Who:string){
        console.log('Here')
        let h = new Headers();
        this.H.post('/Mail', JSON.stringify({"EnvLst":1}),{headers:h}).subscribe()
        //mfvc2007
    }
    Change(){
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ConfUp":1, "Config":this.Conf}),{headers:h}).map(R=>{}).subscribe(()=>{
            this.Dis=false;
        })
    }
    Sum() {
        const D = new Date().getFullYear();
        let S:number=0; const M:Hash = {};
        firebase.database().ref('/Users').once('value', Z => {
            for (let a in Z.val()) {
                M[Z.val()[a].Name]=0;
            }
        });
        let Sum:number = 0, Items:number=0, ItemsND:number=0, Tot:number=0;
        let FactP:number=0, FactD:number=0;
        firebase.database().ref('/Facts').orderByChild('indexYear').equalTo(D).once('value',Z => {
            console.log(Z.val());
            for (let a in Z.val()) {
                Z.val()[a].Content.forEach(I=>{
                    isNaN(I.UNet) ? console.log(I, a):M[Z.val()[a].Seller] +=I.UNet;
                    Z.val()[a].Coin == 1 ? (!isNaN(I.Ctot) ? FactD += I.Ctot : null) : (!isNaN(I.Ctot) ? FactP += I.Ctot:null)
                    S+=parseFloat(I.UNet)
                    !I.Unit.includes('SERVICIO ECO') ? Items++: null;
                    !I.Unit.includes('SERVICIO ECO') ? Tot+=I.Ctot: null;
                    if(I.PO != undefined && !isNaN(I.Ctot) && !I.Unit.includes('SERVICIO ECO')){
                        ItemsND++;
                        Sum += +I.Ctot;
                    }
                })
            }
        }).then(() => {
            firebase.database().ref('Indicadores/' + D + '/Total').set(S);
            firebase.database().ref('Indicadores/' + D + '/FacturadoP').set(FactP);
            firebase.database().ref('Indicadores/' + D + '/FacturadoD').set(FactD);
            for (let a in M) {
                firebase.database().ref('Indicadores/' + D + '/Totales/'+a).set(M[a])
            }
            firebase.database().ref('Indicadores/' + D + '/Totales/Comprados').set(Sum);
            firebase.database().ref('Indicadores/' + D + '/Totales/TComprados').set(Tot);
            firebase.database().ref('Indicadores/' + D + '/Totales/CompradosObjetos').set(Items);
            firebase.database().ref('Indicadores/' + D + '/Totales/NoComprados').set(ItemsND);
        });
    }
    Sum2() {
        const D = new Date().getFullYear();
        let S:number=0; const M:Hash = {};
        firebase.database().ref('/Users').once('value',Z=>{
            for (let a in Z.val()) {
                M[Z.val()[a].Name]={P:0,D:0};
            }
            console.log(M)
        }).then(()=>{
            firebase.database().ref('/Facts').orderByChild('indexYear').equalTo(D).once('value',Z=>{
                for (let a in Z.val()) {
                    Z.val()[a].Content.forEach(I=>{
                        Z.val()[a].Coin == 1 ? M[Z.val()[a].Seller].D+= I.Ctot : M[Z.val()[a].Seller].P+=I.Ctot
                    })
                }
                console.log(S,M)
            }).then(()=>{
                for (let a in M) {
                    firebase.database().ref('Indicadores/' + D + '/Facturas/'+a).set(M[a])
                }
            });
        })
    }
    Sum3(){
        const D = new Date().getFullYear();
        let S:number=0; const M:Hash= {};
        firebase.database().ref('/Users').once('value',Z=>{
            for (let a in Z.val()) {
                M[Z.val()[a].Name]={P:0,D:0};
            }
        })
        firebase.database().ref('/Cots').orderByChild('indexYear').equalTo(D).once('value',Z=>{
            for (let a in Z.val()) {
                Z.val()[a].Content.forEach(I=>{
                    I.D.forEach(i=>{
                        isNaN(i.Ctot) || isNaN(Z.val()[a].Coin) || isNaN(Z.val()[a].ChangeTy)? console.log(I, a):(Z.val()[a].Coin == 1 ? M[Z.val()[a].Seller].D+= i.Ctot : M[Z.val()[a].Seller].P+= i.Ctot );
                    })
                })
            }
            console.log(S,M)
        }).then(()=>{
            for (let a in M) {
                console.log(M[a])
                firebase.database().ref('Indicadores/' + D + '/Cots/'+a).set(M[a])
            }
        });
    }
    Month(month) {
        const D = new Date().getFullYear();
        const M:Hash= {};
        firebase.database().ref('/Users').once('value',Z=>{
            for (let a in Z.val()) {
                M[Z.val()[a].Name]={P:0, D:0};
            }
        });
        firebase.database().ref('/Facts').orderByChild('indexMonth').equalTo(month).once('value',Z=>{
            for (let a in Z.val()){
                if(Z.val()[a].indexYear===D) {
                    Z.val()[a].Content.forEach(I=>{
                        Z.val()[a].Coin == 1 ? M[Z.val()[a].Seller].D+= I.Ctot : M[Z.val()[a].Seller].P+=I.Ctot
                    });
                }
            }
            console.log(M);
        }).then(() => {
            for (let a in M){
                firebase.database().ref('Indicadores/' + D + '/Mensuales/'+(month+1)+'/Facturaciones/'+a).set(M[a])
            }
        });
    }
    Month2(month) {
        const D = new Date().getFullYear();
        const M:Hash= {};
        firebase.database().ref('/Users').once('value',Z=>{
            for (let a in Z.val()) {
                M[Z.val()[a].Name]={P:0,D:0};
            }
        })
        firebase.database().ref('/Cots').orderByChild('indexMonth').equalTo(month).once('value',Z=>{
            for (let a in Z.val()) {
                if(Z.val()[a].indexYear===D) {
                    Z.val()[a].Content.forEach(I=>{
                        I.D.forEach(i=>{
                            (isNaN(i.Ctot) )? console.log(I, a): ((Z.val()[a].Coin == 1 || Z.val()[a].Coin == true) ? M[Z.val()[a].Seller].D+=i.Ctot : M[Z.val()[a].Seller].P+= i.Ctot );
                        });
                    });
                }
            }
            console.log(M);
        }).then(()=>{
            for (let a in M){
                firebase.database().ref('Indicadores/' + D + '/Mensuales/'+(month+1)+'/Cotizaciones/'+a).set(M[a])
            }
        });
    }
    Month3(month) {
        const D = new Date().getFullYear();
        const M:Hash= {};
        firebase.database().ref('/Users').once('value',Z=>{
            for (let a in Z.val()) {
                M[Z.val()[a].Name]=0;
            }
        })
        firebase.database().ref('/Facts').orderByChild('indexMonth').equalTo(month).once('value',Z=>{
            for (let a in Z.val()){
                if(Z.val()[a].indexYear===D) {
                    Z.val()[a].Content.forEach(I=>{
                        isNaN(I.UNet) ? console.log(I, a) : M[Z.val()[a].Seller] +=I.UNet;
                    });
                }
            }
            console.log(M);
        }).then(()=>{
            for (let a in M){
                firebase.database().ref('Indicadores/' + D + '/Mensuales/'+(month+1)+'/Utils/'+a).set(M[a])
            }
        });
    }
    Events(){
        let events = [
            {
                "title": "All Day Event",
                "start": "2018-06-01"
            },
            {
                "title": "Long Event",
                "start": "2018-06-07",
                "end": "2018-06-10"
            },
            {
                "title": "Repeating Event",
                "start": "2018-06-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2018-06-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2018-06-11",
                "end": "2018-06-13"
            }
        ];
        firebase.database().ref('Events/1').set(events)
    }
    Adjust(){
        firebase.database().ref('/Facts').once('value', Z=>{
            for (let a in Z.val()) {
                if (JSON.stringify(Z.val()[a].Content)== undefined){
                    console.log(JSON.stringify(Z.val()[a].Content), Z.val()[a].ID)
                }
            }
            console.log('Done')
        })
    }
    Analyze(){
        firebase.database().ref('/Cots').once('value',Z=>{
            for (let a in Z.val()) {
                //console.log(new Date(Z.val()[a].DateG).getMonth())
                firebase.database().ref('/Cots/'+a).update({indexMonth:new Date(Z.val()[a].DateG).getMonth()})
            }
        })
    }
    AnalyzeFacts(){
        firebase.database().ref('/Facts').once('value',Z=>{
            for (let a in Z.val()) {
                firebase.database().ref('/Facts/'+a).update({indexMonth:new Date(Z.val()[a].DateG).getMonth()})
            }
        })
    }
    AnalyzePOs(){
        firebase.database().ref('/POs').once('value',Z=>{
            for (let a in Z.val()) {
                console.log(a, Z.val()[a].DateG)
                if(Z.val()[a].DateG == 'Invalid Date'){}else{ firebase.database().ref('/POs/'+a).update({indexYear:(new Date(Z.val()[a].DateG).getFullYear())})}
            }
        })
    }
    RemovePOS(){
        firebase.database().ref('/Facts').once('value',Z=>{
            for (let a in Z.val()) {
                if (Z.val()[a].indexMonth < 10 && Z.val()[a].indexYear == '2018') {
                    Z.val()[a].Content.forEach((I,J)=>{
                        //firebase.database().ref('/Facts/'+a+'/Content/'+J) .update({PO:'N/A'})
                        if(!I.PO){
                            console.log(Z.val()[a].Content[J], 'also ', Z.val()[a].PO)
                            firebase.database().ref('/Facts/'+a+'/Content/'+J) .update({PO:'N/A'})
                        }
                    });
                    //console.log(Z.val()[a], 'also ', Z.val()[a].PO)
                }
            }
        })
    }
    AnalyzeY(){
        firebase.database().ref('/Cots').once('value',Z=>{
            for (let a in Z.val()) {
                //console.log(new Date(Z.val()[a].DateG).getMonth())
                firebase.database().ref('/Cots/'+a).update({indexYear:new Date(Z.val()[a].DateG).getFullYear()})
            }
        })
    }
    AnalyzeFactsY(){
        firebase.database().ref('/Facts').once('value',Z=>{
            for (let a in Z.val()) {
                firebase.database().ref('/Facts/'+a).update({indexYear:new Date(Z.val()[a].DateG).getFullYear()})
            }
        })
    }
    AnalyzePOsY(){
        firebase.database().ref('/POs').once('value',Z=>{
            for (let a in Z.val()) {
                console.log(a, Z.val()[a].DateG)
                if(Z.val()[a].DateG == 'Invalid Date'){}else{ firebase.database().ref('/POs/'+a).update({indexMonth:(new Date(Z.val()[a].DateG).getMonth())})}
            }
        })
    }
    SetFacs(){
        firebase.database().ref('/Facts').orderByChild('indexMonth').endAt(8).once('value',Z=>{
            for (let a in Z.val()) {
                firebase.database().ref('/Facts/'+a).update({Alta:true})
            }
        })
    }
    DebugT(){
        firebase.database().ref('/Facts').once('value',Z => {
            let db = firebase.firestore();
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                db.collection('Debugger').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload1(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('ApList').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload2(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('SwList').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload3(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('SwSerial').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload4(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('GBICSerial').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload5(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('POWSerial').doc(I).set(Z.val()[I])
            });
        });
    }
    Upload6(){
        firebase.database().ref('/Events/TRANSFER2').once('value',Z => {
            Object.keys(Z.val()).forEach(I=>{
                console.log(Z.val()[I])
                let db = firebase.firestore();
                db.collection('ApSerial').doc(I).set(Z.val()[I])
            });
        });
    }
}