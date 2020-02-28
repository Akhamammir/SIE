import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MessageService, SelectItem, MenuItem} from 'primeng/api';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import {Conns} from './../../Conections/Connection';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './Dashboard.html',
    styleUrls: [
        './Dashboard.css'
        ],
    providers: []
})
export class MainFSH{
    @ViewChild('Map') Map: ElementRef;
    APs: any[]=[];data: any;data2: any;data3: any;data4: any;
    display=true;Totals={};Totals2={};
    Docs=[];
    Labels={'0':{Total:0, Progress:'0.00'}, ApGuest:{Total:0, Progress:'0.00'}, ApArrival:{Total:0, Progress:'0.00'}, ApRes:{Total:0, Progress:'0.00'},
    ApCommon:{Total:0, Progress:'0.00'}, ApSpa:{Total:0, Progress:'0.00'}, ApService:{Total:0, Progress:'0.00'}, SwGuest:{Total:0, Progress:'0.00'},
    SwArr:{Total:0, Progress:'0.00'}, SwRes:{Total:0, Progress:'0.00'}, SwCom:{Total:0, Progress:'0.00'},
    SwCas:{Total:0, Progress:'0.00'}, SwSer:{Total:0, Progress:'0.00'}, SwGat:{Total:0, Progress:'0.00'}, SwMcr:{Total:0, Progress:'0.00'}
};
    canvas;OffL;OffT;OP:HTMLElement;Menus:SelectItem[];Trail:MenuItem[];
    mouseX;mouseY;APx;APy;Sector=[true, false];selectedList='WiFi';
    circles=[];sun= new Image();Name:string='Loading. . .';
    constructor(private H: Http, private R: Router, private M: MessageService, private AR: ActivatedRoute) {
        this.Totals={GUESTROOM:{Done:0,Docs:[]}, ARRIVAL:{Done:0,Docs:[]},RESIDENCIAS:{Done:0,Docs:[]}, 'AREAS COMUNES':{Done:0,Docs:[]}, SPA:{Done:0,Docs:[]}, SERVICES:{Done:0,Docs:[]}}
        this.Menus = [
            {label: 'WiFi', value: 'WiFi', icon: 'fas fa-wifi'},
            {label: 'Switch', value: 'Switch', icon: 'fas fa-ethernet'},
        ];
        this.Docs = [
            {label:'Select City', value:null},
            {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
            {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
            {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
            {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
            {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
        ];
    }
    Charts(){
        let sum = +this.Totals['GUESTROOM'].Done + this.Totals['ARRIVAL'].Done + this.Totals['RESIDENCIAS'].Done + this.Totals['AREAS COMUNES'].Done + this.Totals['SPA'].Done + this.Totals['SERVICES'].Done;
        let Total = +this.Totals['GUESTROOM'].Total + +this.Totals['ARRIVAL'].Total + +this.Totals['RESIDENCIAS'].Total + +this.Totals['AREAS COMUNES'].Total + +this.Totals['SPA'].Total + +this.Totals['SERVICES'].Total;
        let Remain = Total - sum;
        console.log()
        this.data = {
            labels: ['Guestrooms', 'Arrivals', 'Residential', 'Common Areas', 'Spa', 'Services'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(142,237,178,0.4)',
                    borderColor: 'rgba(157,247,188,1)',
                    pointBackgroundColor: '#89F4B2',
                    pointBorderColor: '#8EEDB2',
                    pointHoverBackgroundColor: '#8EEDB2',
                    pointHoverBorderColor: '#89F4B2',
                    data: [this.Totals['GUESTROOM'].Done, this.Totals['ARRIVAL'].Done, this.Totals['RESIDENCIAS'].Done, this.Totals['AREAS COMUNES'].Done, this.Totals['SPA'].Done, this.Totals['SERVICES'].Done]
                }
            ]
        };
        this.data2 = {
            labels: ['Completed','Remaining'],
            datasets: [
                {
                    data: [sum, Remain],
                    backgroundColor: [
                        "#9BC53D",
                        "#A31621"
                    ],
                    hoverBackgroundColor: [
                        "#A4CA4E",
                        "#AB2B35"
                    ]
                }]    
        };
        let sum2 =  +this.Totals2['GUESTROOM'].Done +  +this.Totals2['ARRIVAL'].Done +  +this.Totals2['RESIDENCIAS'].Done +  +this.Totals2['AREAS COMUNES'].Done +  +this.Totals2['CASITAS'].Done +  +this.Totals2['SERVICES'].Done +  +this.Totals2['GATEHOUSES'].Done +  +this.Totals2['MCR'].Done
        let Total2 =  +this.Totals2['GUESTROOM'].Total +  +this.Totals2['ARRIVAL'].Total +  +this.Totals2['RESIDENCIAS'].Total +  +this.Totals2['AREAS COMUNES'].Total +  +this.Totals2['CASITAS'].Total +  +this.Totals2['SERVICES'].Total +  +this.Totals2['GATEHOUSES'].Total +  +this.Totals2['MCR'].Total
        let Remain2 = Total2 - sum2;
        this.data3 = {
            labels: ['Guestrooms', 'Arrivals', 'Residential', 'Common Areas', 'Spa', 'Services'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(175,247,247,0.4)',
                    borderColor: 'rgba(185,255,255,1)',
                    pointBackgroundColor: '#AFF7F7',
                    pointBorderColor: '#B6F7F7',
                    pointHoverBackgroundColor: '#B6F7F7',
                    pointHoverBorderColor: '#AFF7F7',
                    data: [this.Totals2['GUESTROOM'].Done, this.Totals2['ARRIVAL'].Done, this.Totals2['RESIDENCIAS'].Done, this.Totals2['AREAS COMUNES'].Done, this.Totals2['CASITAS'].Done, this.Totals2['SERVICES'].Done, this.Totals2['GATEHOUSES'].Done, this.Totals2['MCR'].Done]
                }
            ]
        };
        this.data4 = {
            labels: ['Completed','Remaining'],
            datasets: [
                {
                    data: [sum2, Remain2],
                    backgroundColor: [
                        "#9BC53D",
                        "#A31621"
                    ],
                    hoverBackgroundColor: [
                        "#A4CA4E",
                        "#AB2B35"
                    ]
                }]    
            };
    }
    DB(){
        let db = firebase.firestore();
        db.collection('Users').where('ID', '==', this.AR.snapshot.params.id).get().then(snap=>{
            snap.forEach(doc=>{
                this.Name = doc.data().Name;
            })
        }).then(()=>{
            db.collection('Areas').get().then(snap=>{
                snap.forEach(doc=>{
                    this.Totals[doc.id]={Total:doc.data().Total, Done:0, Docs:doc.data().Docs}
                });
                console.log(this.Docs)
            })
            db.collection('Areas2').get().then(snap=>{
                snap.forEach(doc=>{
                    this.Totals2[doc.id]={Total:doc.data().Total, Done:0}
                })
            })
            db.collection('ApList').where("InstallFinish", "==", true).get().then(snap=>{
                console.log('Hi')
                snap.forEach(doc=>{
                    let data= doc.data();
                    if (data.InstallFinish == true) this.Totals[data.Area].Done++;
                });
                console.log(this.Totals)
            });
            db.collection('SWList').where("InstallFinish", "==", true).get().then(snap=>{
                console.log('Hi')
                snap.forEach(doc=>{
                    let data= doc.data();
                    if (data.InstallFinish == true) this.Totals2[data.Area].Done++;
                });
                console.log(this.Totals)
            }).then(()=>{
                console.log(this.Totals)
                this.Labels={ '0':{Total:0, Progress:'0'},
                    ApGuest:{Total:this.Totals['GUESTROOM'].Total, Progress:((this.Totals['GUESTROOM'].Done/this.Totals['GUESTROOM'].Total)*100).toFixed(2).toString()},
                    ApArrival:{Total:this.Totals['ARRIVAL'].Total, Progress:((this.Totals['ARRIVAL'].Done/this.Totals['ARRIVAL'].Total)*100).toFixed(2).toString()},
                    ApRes:{Total:this.Totals['RESIDENCIAS'].Total, Progress:((this.Totals['RESIDENCIAS'].Done/this.Totals['RESIDENCIAS'].Total)*100).toFixed(2).toString()},
                    ApCommon:{Total:this.Totals['AREAS COMUNES'].Total, Progress:((this.Totals['AREAS COMUNES'].Done/this.Totals['AREAS COMUNES'].Total)*100).toFixed(2).toString()},
                    ApSpa:{Total:this.Totals['SPA'].Total, Progress:((this.Totals['SPA'].Done/this.Totals['SPA'].Total)*100).toFixed(2).toString()},
                    ApService:{Total:this.Totals['SERVICES'].Total, Progress:((this.Totals['SERVICES'].Done/this.Totals['SERVICES'].Total)*100).toFixed(2).toString()},
                    SwGuest:{Total:this.Totals2['GUESTROOM'].Total, Progress:((this.Totals['GUESTROOM'].Done/this.Totals['GUESTROOM'].Total)*100).toFixed(2).toString()},
                    SwArr:{Total:this.Totals2['ARRIVAL'].Total, Progress:((this.Totals2['ARRIVAL'].Done/this.Totals2['ARRIVAL'].Total)*100).toFixed(2).toString()},
                    SwRes:{Total:this.Totals2['RESIDENCIAS'].Total, Progress:((this.Totals2['RESIDENCIAS'].Done/this.Totals2['RESIDENCIAS'].Total)*100).toFixed(2).toString()},
                    SwCom:{Total:this.Totals2['AREAS COMUNES'].Total, Progress:((this.Totals2['AREAS COMUNES'].Done/this.Totals2['AREAS COMUNES'].Total)*100).toFixed(2).toString()},
                    SwCas:{Total:this.Totals2['CASITAS'].Total, Progress:((this.Totals2['CASITAS'].Done/this.Totals2['CASITAS'].Total)*100).toFixed(2).toString()},
                    SwSer:{Total:this.Totals2['SERVICES'].Total, Progress:((this.Totals2['SERVICES'].Done/this.Totals2['SERVICES'].Total)*100).toFixed(2).toString()},
                    SwGat:{Total:this.Totals2['GATEHOUSES'].Total, Progress:((this.Totals2['GATEHOUSES'].Done/this.Totals2['GATEHOUSES'].Total)*100).toFixed(2).toString()},
                    SwMcr:{Total:this.Totals2['MCR'].Total, Progress:((this.Totals2['MCR'].Done/this.Totals2['MCR'].Total)*100).toFixed(2).toString()}
                };
                this.Charts();
                console.log(this.Labels)
            });;
        })
    }
    UpdateAP(ID, Matrx){
        console.log(ID, Matrx, 'Aite mate');
        let db = firebase.firestore();
        db.collection('ApList').doc(ID).update({Matrix:Matrx}).then(()=>{
            this.M.add({severity: 'success', summary: 'Carga correcta', detail: 'El valor ha sido actualizado en la base de datos'});
        }).catch(()=>{
            this.M.add({severity: 'error', summary: 'Carga incorrecta', detail: 'El valor no fue actualizado en la base de datos'});
        })
    }
    UpdateAPtag(ID, Matrx){
        console.log(ID, Matrx, 'Aite mate');
        let db = firebase.firestore();
        db.collection('ApList').doc(ID).update({Tag:Matrx}).then(()=>{
            this.M.add({severity: 'success', summary: 'Carga correcta', detail: 'El valor ha sido actualizado en la base de datos'});
        }).catch(()=>{
            this.M.add({severity: 'error', summary: 'Carga incorrecta', detail: 'El valor no fue actualizado en la base de datos'});
        })
    }
dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/*ngAfterViewInit(){
    this.dragElement(document.getElementsByClassName("mydiv"));
}*/
    ngOnInit() {
        new Conns(this.H, this.R).Connect().then(() => {
            console.log('Yo');
            this.DB();
        }).catch(Res => {
            console.log(Res);
            this.DB();
        });
        this.Trail = [
            {label: 'AP', command:(()=>{this.return();})}
        ];
        this.circles = [
            {
                x: 100,
                y: 100,
                radius: 20,
                color: 'rgba(125,125,125,0)',
                id: 1
              },
              {
                x: 120,
                y: 120,
                radius: 20,
                color: 'rgba(125,125,125,0)',
                id: 2
              }
        ];
        //this.canvas = document.getElementsByClassName('Map');
    }
    Sectorer(){
        this.Trail= this.selectedList == 'WiFi' ? this.Trail = [{label: 'AP', command:(()=>{this.return();})}] : [{label: 'Switch', command:(()=>{this.return();})}]
    }
    /*ngAfterViewInit() {
        this.sun.src = 'http://35.227.119.63:4200/ImgSrc/router.png';
        //this.canvas = (<HTMLCanvasElement>this.Map.nativeElement);
        this.OffL = this.canvas.offsetLeft; this.OffT = this.canvas.offsetTop;
        let ctx:CanvasRenderingContext2D = this.canvas.getContext('2d');
        let H=30, W=40;
        this.sun.addEventListener('load', ()=>{
            this.circles.forEach(circle => {
                console.log('hhh');
                ctx.drawImage(this.sun, circle.x - (W / 2), circle.y - (H / 1.5), W, H);
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = circle.color;
                ctx.fill();
                //ctx.stroke();
                //ctx.drawImage(this.sun, 0, 0, 300, 300);
              });
        }, false);
    }
    Fly(Evt) {
        let rect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = this.canvas.height / rect.height;
        this.mouseX = (Evt.clientX - rect.left) * scaleX;
        this.mouseY = (Evt.clientY - rect.top) * scaleY;
        //console.log(Evt)
        let Mouse = {x:this.mouseX, y:this.mouseY}
        this.circles.forEach(circle => {
            this.OP=document.getElementById('op'+ circle.id);
            if (this.Intersect(Mouse, circle)) {
                console.log(this.Intersect(Mouse, circle), this.OP.id );
                this.OP.style.position='fixed'
                this.OP.style.left=Evt.clientX +'px';
                this.OP.style.top=Evt.clientY+'px';
                this.OP.style.display='block'
            } else {
                this.OP.style.display='none';
            }
        });
    }
    Intersect(point, circle) {
        return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
      }
      return() {
        //let ctx:CanvasRenderingContext2D = this.canvas.getContext('2d');
        this.Sector[1]=!this.Sector[1];this.Sector[0]=!this.Sector[0];
        setTimeout(()=>{
            this.ngAfterViewInit()
        }, 500);
      }*/
      return() {
        //let ctx:CanvasRenderingContext2D = this.canvas.getContext('2d');
        this.Sector[1]=!this.Sector[1];this.Sector[0]=!this.Sector[0];
        this.Trail.pop();
        /*setTimeout(()=>{
            this.ngAfterViewInit()
        }, 500);*/
      }
      Tabler(Where:string, Name:string) {
          this.Trail.push({label:Name})
          let Temp=['Front','Left','Right','Back', 'Serial'];
          this.APs=[];
        this.Sector[0]=!this.Sector[0];this.Sector[1]=!this.Sector[1];
        let db = firebase.firestore();
    db.collection(this.selectedList=='WiFi' ? 'ApList' : 'SwList').where("Area", "==", Where).get().then(Snap=>{
        Snap.forEach(doc=>{
            console.log(doc.data())
            let T=doc.data();
            T.Galleria=[]
            doc.data().InstallPath.forEach((I,J) => {
                T.Galleria.push({source:I, thumbnail:'http://35.227.119.63:4200/ImgSrc/Thumb.jpg', title:Temp[J]});
            });
            T.ID=doc.id
            this.APs.push(T)
        });
        this.display=false;
    }).then(()=>{
        //this.dragElement(document.getElementsByClassName("mydiv"));
        setTimeout(()=>{
            let x = document.getElementsByClassName("ui-lightbox ui-widget ui-corner-all ui-shadow"), i=0;
        console.log(x, x.length)
        for (i = 0; i < x.length; i++) {
            x[i].id = "Drag" + i;
            this.dragElement(x[i]);
        } console.log(x)
        },600)
    });
      }
}
