declare let pdfMake;
import * as sha512 from 'js-sha512';
import {Dict} from './../ImgDict/ImgDict';
export class PDFLIB{
    constructor(){}
    Alt(X:any, User:any, B:any, Co:boolean, T:string, N:number, Nt:string[], Tc:string, OCDate:string, ODatum?:string){
        console.log(OCDate)
        let CDate =  new Date(OCDate); let Datum = ODatum ? new Date(ODatum) : null;
        let pdf = pdfMake;
            let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            let D= Datum ? new Date(Datum) : new Date();
            let body=[]; let S:number=0;let notes=[];let comme=[];let body2=[];let con=[];
            B.forEach(I=>{
                let s=0;
                con.push([
                        {
                            border:[false,false,false,false],
                            colSpan:6,
                            text:' ',
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            colSpan:6,
                            fillColor:'#66aaff',
                            text:I.Nom,
                            alignment:'center'
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            text:'Cantidad',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Unidad/Parte',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Descripción',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Unitario',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Total',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Tiempo de entrega',
                            alignment:'center',
                            bold:true
                        }
                ]);
                I.D.forEach(i=>{
                    s= +s + (+i.Ctot);
                    if(i.Unit=='SERVICIO ECO'){
                        //i.CInicial =0;
                        i.DeliveryC =0;
                        i.Dcto=0;
                        //i.Utilidad=0;
                    }
                con.push(
                    [
                        {
                            text:i.Cant,
                            alignment:'center'
                        },{
                            text:i.Unit,
                            alignment:'center'
                        },{
                                text:i.Desc,
                        },{
                            text:i.Unit=='SERVICIO ECO'? (+i.Ctot/i.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}) : (+i.CInicial + +i.DeliveryC +(i.CInicial*(i.Utilidad/100)) - (i.CInicial*(i.Dcto/100))).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.Unit=='SERVICIO ECO'? (+i.Ctot).toLocaleString('en-US',{style:'currency', currency:'USD'}) : parseFloat(i.Ctot.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.DeliveryT,
                            alignment:'center'
                        }
                    ]
                );
            });
            con.push(
                [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal'
                    },{
                        text:parseFloat(s.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]);
                if(B.length==1){
                    con.push(
                        [
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'IVA'
                            },{
                                text:(s*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:' ',
                                alignment:'center'
                            }
                        ],[
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'Total'
                            },{
                                text:(s+(s*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:Co ? 'Dolares' : 'Pesos',
                                alignment:'center'
                            }
                        ]);
                }
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:con
                    }
                });
                con=[];
                S=S+s;
            });
            if(B.length>1){
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:[
                            [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal General'
                    },{
                        text:parseFloat(S.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'IVA'
                    },{
                        text:(S*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:Co ? 'Dolares' : 'Pesos',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Gran Total'
                    },{
                        text:(S+(S*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]
                        ]
                    }
                });
            }
            notes.push(
                [
                    {
                        border:[undefined],
                        text: Nt.length==0 ? '': 'Notas:'
                    },{
                        border:[undefined],
                        text:' '
                    }
                ]
            );
            Nt.forEach(I=>{
                notes.push(
                    [
                        {
                            border:[undefined],
                            text:' '
                        },{
                            border:[undefined],
                            text:I
                        }
                    ]
                )
            });
            comme.push({
                    text:Tc,
                    fontSize:8
                });
                console.log(body2)
            let H = new Headers();
            H.append('Content-Type', 'application/json');
            let p = pdf.createPdf({
                pageMargins: [40, 40, 40, 80],
                info:{
                    title:N + ' - ' +T,
                    author:User[0],
                    creator:'Ecosta',
                    producer:'SIE'
                },
                content:[
                    {
                        columns:[
                            {
                                table:{
                                    widths:['auto',200],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                text:'Empresa:',
                                                border:[true,true,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,true,true,true],
                                                text:X[0].fill ? X[0].fill : ' ',
                                                fontSize : 7,
                                                bold:true
                                            }
                                        ],[
                                            {
                                                text:'Atencion:',
                                                border:[true,false,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[1].fill ? X[1].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Dirección',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[2].fill ? X[2].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Telefono:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[3].fill ? X[3].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'e-mail:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,true],
                                                text:X[4].fill ? X[4].fill : ' ',
                                                fontSize : 7
                                            }
                                        ]
                                    ]
                                }
                            },{
                                style: 'tableExample',
                                table:{
                                    widths:['auto','auto'],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,true],
                                                text:'Cotizacion:'
                                            },{
                                                border:[false,false,false,true],
                                                text:'COT-'+N,
                                                alignment:'center',
                                                color:'#c40000',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' '
                                            }, {
                                                border:[false,false,false,true],
                                                text:' '
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Fecha de Expedicion:'
                                            },{
                                                border:[false,true,true,true],
                                                text:D.getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Cotizacion vigente hasta:'
                                            },{
                                                border:[false,true,true,true],
                                                text: CDate.getDate()+'-'+M[CDate.getMonth()]+'-'+CDate.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,true,false],
                                                text:'Ejecutivo'
                                            },{
                                                border:[true,true,true,false],
                                                text:User[0] //dd
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'email'
                                            },{
                                                border:[true,false,true,false],
                                                text:User[2],
                                                alignment:'right'
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'Puesto'
                                            },{
                                                border:[true,false,true,true],
                                                text:User[1]
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    },
                    body2
                    ,{
                        style:{
                            fontSize:7
                        },
                        table:{
                            widths:[22,'auto'],
                            body:notes,
                            layout:{
                                defaultBorder: false,
                            }
                        }
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        style:{
                            fontSize:8
                        },
                        table:{
                            widths:[200],
                            body:[
                                [
                                    {
                                        fillColor:'#010577',
                                        text:'Terminos Comerciales:',
                                        color:'#FFFFFF'
                                    }
                                ]
                            ]
                        }
                    },comme,{
                        text:' '
                    },{
                        text:User[0],
                        fontSize:9,
                        color:'#080eaa'
                    },{
                        text:User[1],
                        fontSize:9,
                        color:'#080eaa'
                    }
                ]
                ,styles:{
                    tableExample:{
			            margin: [85, 0, 0, 0],
                        fontSize:7
		            }
                }
            }).open();
    }
    Maker(X:any, User:any, B:any, Co:boolean, T:string, N:number, Nt:string[], Tc:string, OCDate:string, ODatum?:string){
        console.log(OCDate)
        let CDate =  new Date(OCDate); let Datum = ODatum ? new Date(ODatum) : null;
        let pdf = pdfMake;
            let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            let D= Datum ? new Date(Datum) : new Date();
            let body=[]; let S:number=0;let notes=[];let comme=[];let body2=[];let con=[];
            console.log(X)
            console.log(User)
            B.forEach(I=>{
                let s=0;
                con.push([
                        {
                            border:[false,false,false,false],
                            colSpan:6,
                            text:' ',
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            colSpan:6,
                            fillColor:'#66aaff',
                            text:I.Nom,
                            alignment:'center'
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            text:'Cantidad',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Unidad/Parte',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Descripción',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Unitario',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Total',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Tiempo de entrega',
                            alignment:'center',
                            bold:true
                        }
                ]);
                I.D.forEach(i=>{
                    s= +s + (+i.Ctot);
                    if(i.Unit=='SERVICIO ECO'){
                        //i.CInicial =0;
                        i.DeliveryC =0;
                        i.Dcto=0;
                        //i.Utilidad=0;
                    }
                con.push(
                    [
                        {
                            text:i.Cant,
                            alignment:'center'
                        },{
                            text:i.Unit,
                            alignment:'center'
                        },{
                                text:i.Desc,
                        },{
                            text: (+i.Ctot/i.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}) ,
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.Unit=='SERVICIO ECO'? (+i.Ctot).toLocaleString('en-US',{style:'currency', currency:'USD'}) : parseFloat(i.Ctot.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.DeliveryT,
                            alignment:'center'
                        }
                    ]
                );
            });
            con.push(
                [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal'
                    },{
                        text:parseFloat(s.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]);
                if(B.length==1){
                    con.push(
                        [
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'IVA'
                            },{
                                text:(s*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:' ',
                                alignment:'center'
                            }
                        ],[
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'Total'
                            },{
                                text:(s+(s*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:Co ? 'Dolares' : 'Pesos',
                                alignment:'center'
                            }
                        ]);
                }
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:con
                    }
                });
                con=[];
                S=S+s;
            });
            if(B.length>1){
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:[
                            [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal General'
                    },{
                        text:parseFloat(S.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'IVA'
                    },{
                        text:(S*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:Co ? 'Dolares' : 'Pesos',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Gran Total'
                    },{
                        text:(S+(S*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]
                        ]
                    }
                });
            }
            notes.push(
                [
                    {
                        border:[undefined],
                        text: Nt.length==0 ? '': 'Notas:'
                    },{
                        border:[undefined],
                        text:' '
                    }
                ]
            );
            Nt.forEach(I=>{
                notes.push(
                    [
                        {
                            border:[undefined],
                            text:' '
                        },{
                            border:[undefined],
                            text:I
                        }
                    ]
                )
            });
            comme.push({
                    text:Tc,
                    fontSize:8
                });
                console.log(body2)
            let H = new Headers();
            H.append('Content-Type', 'application/json');
            let p = pdf.createPdf({
                pageMargins: [40, 40, 40, 80],
                info:{
                    title:N + ' - ' +T,
                    author:User[0],
                    creator:'Ecosta',
                    producer:'SIE'
                },
                content:[
                    {
                        columns:[
                            {
                                image: Dict.ELogo,
                                width:210,//Base:83 Mult:8.3
                                margin:[0,25,0,0]
                            },{
                                image: Dict.HPLogo,
                                width:70,//Base: Mult:2
                                margin:[160,25,0,0]
                            }
                        ]
                    },{
                        columns:[
                            {
                                table:{
                                    widths:['auto',200],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                text:'Empresa:',
                                                border:[true,true,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,true,true,true],
                                                text:X[0].fill ? X[0].fill : ' ',
                                                fontSize : 7,
                                                bold:true
                                            }
                                        ],[
                                            {
                                                text:'Atencion:',
                                                border:[true,false,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[1].fill ? X[1].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Dirección',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[2].fill ? X[2].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Telefono:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[3].fill ? X[3].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'e-mail:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,true],
                                                text:X[4].fill ? X[4].fill : ' ',
                                                fontSize : 7
                                            }
                                        ]
                                    ]
                                }
                            },{
                                style: 'tableExample',
                                table:{
                                    widths:['auto','auto'],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,true],
                                                text:'Cotizacion:'
                                            },{
                                                border:[false,false,false,true],
                                                text:'COT-' + N,
                                                alignment:'center',
                                                color:'#c40000',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' '
                                            }, {
                                                border:[false,false,false,true],
                                                text:' '
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Fecha de Expedicion:'
                                            },{
                                                border:[false,true,true,true],
                                                text:D.getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Cotizacion vigente hasta:'
                                            },{
                                                border:[false,true,true,true],
                                                text: CDate.getDate()+'-'+M[CDate.getMonth()]+'-'+CDate.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,true,false],
                                                text:'Ejecutivo'
                                            },{
                                                border:[true,true,true,false],
                                                text:User[0] //dd
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'email'
                                            },{
                                                border:[true,false,true,false],
                                                text:User[2],
                                                alignment:'right'
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'Puesto'
                                            },{
                                                border:[true,false,true,true],
                                                text:User[1]
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    },
                    body2
                    ,{
                        style:{
                            fontSize:7
                        },
                        table:{
                            widths:[22,'auto'],
                            body:notes,
                            layout:{
                                defaultBorder: false,
                            }
                        }
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        style:{
                            fontSize:8
                        },
                        table:{
                            widths:[200],
                            body:[
                                [
                                    {
                                        fillColor:'#010577',
                                        text:'Terminos Comerciales:',
                                        color:'#FFFFFF'
                                    }
                                ]
                            ]
                        }
                    },comme,{
                        text:' '
                    },{
                        text:' '
                    },{
                        text:User[0].toString().replace('_', ' '),
                        fontSize:9,
                        color:'#080eaa'
                    },{
                        text:User[1],
                        fontSize:9,
                        color:'#080eaa'
                    }
                ],footer:{
                    columns:[
                        {
                            width:'*',
                            text:''
                        },{
                            width:'auto',
                            table:{
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            fontSize:9,
                                            text:'Carr. a Tepic 4681, Col. Guadalupe Victoria, C.P. 48317',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            fontSize:9,
                                            text:'Puerto Vallarta, Jalisco. Mexico',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            table:{
                                                body:[
                                                    [
                                                        {
                                                            border:[false,false,false,false],
                                                            margin:[0,-3,0,0],
                                                            image:Dict.PhoneCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'322 225 1320 con 4 lineas',
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-2,0,0],
                                                            image:Dict.WappCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'+52 ' + User[3],
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-1,0,0],
                                                            image:Dict.InterCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'www.ecosta.com.mx',
                                                        }
                                                    ]
                                                ]
                                            }
                                        }
                                    ]
                                ]
                            },
                            layout:{
                                hLineColor: '#1481ff'
                            }
                        },{
                            width:'*',
                            text:''
                        }
                    ]
                }
                ,styles:{
                    tableExample:{
			            margin: [85, 0, 0, 0],
                        fontSize:7
		            }
                }
            }).open();
    }
    Facts(X:any, User:any,Client:any, Gen:any, Coin:string, Co:boolean, N:string, T:string, DeliveryA:string, Atn:string,
         RFC:string, CFDI:string, PayMet:string, PayFor:string) {
        let pdf = pdfMake;
        let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        let D= new Date();
        let F=[];let G=[];
        console.log(X)
        console.log(User)
        console.log(Client)
        console.log(Gen)
        F.push([
                {border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},
                {border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},
                {border:[false,false,false,false],text:' ',fontSize:7}
            ],[
                {
                    border:[false,false,false,false],
                    text:'Cant.',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{
                    border:[false,false,false,false],
                    text:'No. Parte',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{
                    border:[false,false,false,false],
                    text:'Descripcion y serie',
                    colSpan:2,
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{border:[false,false,false,false],text:''},{
                    border:[false,false,false,false],
                    text:'P. Unitario',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{
                    border:[false,false,false,false],
                    text:'Importe',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{
                    border:[false,false,true,false],
                    text:'Comentarios',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                }
            ]);
            G.push([
                {
                    border:[false,false,false,false],
                    colSpan:2,
                    text:'Utilidad en pesos mexicanos',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:7,
                    bold: true
                },{border:[false,false,true,false],text:''}
            ],[
                {
                    border:[false,false,false,false],
                    text:'Util. Unit.',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                },{
                    border:[false,false,false,false],
                    text:'Util. Tot.',
                    alignment:'center',
                    color:'#F2F2F2',
                    fillColor:'#0D54A5',
                    fontSize:8,
                    bold: true
                }
            ]);
            let S:number=0;let E:number=0;let s:number=0;
            Gen.forEach(I=>{
                Gen[Gen.indexOf(I)].Stat=0;
                console.log(I)
                F.push(
                    [
                        {
                            border:[true,false,true,true],
                            text:I.Cant,
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,false,true,true],
                            text:I.Unit,
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,false,true,true],
                            text:I.Desc,
                            colSpan:2,
                            alignment:'left',
                            fontSize:7
                        },{border:[false,false,false,false],text:'',},{
                            border:[true,false,true,true],
                            text:(I.Ctot/I.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'right',
                            fontSize:7
                        },{
                            border:[true,false,true,true],
                            text:parseFloat(I.Ctot.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'right',
                            fontSize:7
                        },{
                            border:[true,false,true,true],
                            text:I.Comm ? I.Comm : '',
                            alignment:'center',
                            fontSize:7
                        }
                    ],[
                        {border:[true,false,false,false],text:''},{border:[false,false,false,false],text:''},
                        {
                            border:[true,true,true,true],
                            fillColor:'#C0E2B7',
                            alignment:'left',
                            text:I.Prov,
                            fontSize:7,
                        },{
                            border:[true,true,true,true],
                            fillColor:'#C0E2B7',
                            alignment:'right',
                            text:I.CFact.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                        },{
                            border:[true,true,true,true],
                            fillColor:'#C0E2B7',
                            alignment:'center',
                            text:I.Koin,
                            color:'#c40000',
                            fontSize:7,
                            bold: true
                        },{border:[false,false,false,false],text:''},{border:[false,false,true,false],text:''}
                    ],[
                        {border:[true,false,false,true],text:'',fontSize:7},{border:[false,false,false,true],text:'',fontSize:7},{border:[false,false,false,true],text:'',fontSize:7},
                        {border:[false,false,false,true],text:'',fontSize:7},{border:[false,false,false,true],text:'',fontSize:7},{border:[false,false,false,true],text:'',fontSize:7},
                        {border:[false,false,true,true],text:'',fontSize:7}
                ]);
                let a:string
                console.log(I.Unit.toString().includes('SERVICIO ECO') ? parseFloat(I.CInicial).toLocaleString('en-US',{style:'currency', currency:'USD'}) : (I.UNet/I.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}))
                G.push([
                    {
                        border:[true,false,false,false],
                        text:(I.Unit.toString().includes('SERVICIO ECO') ? (I.CInicial* +Coin).toLocaleString('en-US',{style:'currency', currency:'USD'}) : (I.UNet/I.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'})),
                        alignment:'center',
                        fontSize:7,
                    },{
                        border:[false,false,true,false],
                        text:(I.Unit.toString().includes('SERVICIO ECO') ? ((I.CInicial * +Coin)*I.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}) : I.UNet.toLocaleString('en-US',{style:'currency', currency:'USD'})),
                        alignment:'center',
                        fontSize:7,
                    }
                ],[
                    {border:[true,false,false,false],text:' ',fontSize:7},{border:[false,false,true,false],text:' ',fontSize:7}
                ],[
                    {border:[true,false,false,false],text:''},{border:[false,false,true,false],text:''}
                ])
                S = +S + +I.Ctot;
                E= +E+(isNaN(I.DeliveryCF) ? 0 : parseFloat(I.DeliveryCF));
                I.Unit.toString().includes('SERVICIO ECO') ? (s= +s + ( (Co ? I.CInicial* +Coin : I.CInicial) *I.Cant)) : (s= +s + +I.UNet);
                console.log(I.DeliveryCF)
                console.log(E)
            });
        F.push([
            {
                border:[false,false,false,false],
                text:'*EN CASO DE CANCELACION SE HARA UN CARGO DEL 20% SOBRE PEDIDO',
                colSpan:4,
                alignment:'left',
                fontSize:6,
                color:'#0D54A5'
            },{border:[true,false,false,true],text:'',fontSize:7},{border:[true,false,false,true],text:'',fontSize:7},{border:[true,false,false,true],text:'',fontSize:7},
            {
                border:[false,false,false,false],
                alignment:'right',
                fontSize:8,
                text:'Subtotal',
                color:'#0D54A5'
            },{
                border:[true,true,true,true],
                alignment:'right',
                fontSize:8,
                text: parseFloat(S.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
            },{
                border:[false,false,true,false],
                text:'Moneda',
                alignment:'center',
                color:'#F2F2F2',
                fillColor:'#0D54A5',
                fontSize:8,
                bold: true
            }
        ],[
            {border:[false,false,false,false],text:'',fontSize:7},{border:[false,false,false,false],text:'',fontSize:7},{border:[false,false,false,false],text:'',fontSize:7},
            {border:[false,false,false,false],text:'',fontSize:7},
            {
                border:[false,false,false,false],
                alignment:'right',
                fontSize:8,
                text:'IVA',
                color:'#0D54A5'
            },{
                border:[true,true,true,true],
                alignment:'right',
                fontSize:8,
                text:'$ '+parseFloat((S*0.16).toString()).toLocaleString('en-US'),
            },{
                border:[true,false,true,false],
                alignment:'center',
                text:Co? 'Dolares' : 'Pesos',
                color:'#c40000',
                fontSize:7,
                bold: true
            }
        ],[
            {
                border:[false,false,false,true],
                colSpan:4,
                text:'Vendedor:' + User[0],
                color:'#0D54A5',
                fontSize:7
            },{
                border:[false,false,false,false],
                text:'',
                fontSize:7
            },{border:[false,false,false,false],text:'',fontSize:7},{border:[false,false,false,false],text:'',fontSize:7},
            {
                border:[false,false,false,false],
                alignment:'right',
                fontSize:8,
                text:'Total',
                color:'#0D54A5'
            },{
                border:[true,true,true,true],
                alignment:'right',
                fontSize:8,
                text:(S+(S*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
            },{
                border:[true,false,true,true],
                text:' ',
                fontSize:7,
                bold: true
            }
        ],[
            {border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},
            {border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},{border:[false,false,false,false],text:' ',fontSize:7},
            {border:[false,false,false,false],text:' ',fontSize:7}
        ]);
        G.push([
                {
                    border:[false,true,true,false],
                    text:'Subtotal',
                    color:'#0D54A5',
                    alignment:'right',
                    fontSize:7,
                },{
                    border:[true,true,true,true],
                    text:parseFloat(s.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7,
                }
            ],[
                {
                    border:[false,false,true,false],
                    text:'Cargo de envio',
                    color:'#0D54A5',
                    alignment:'right',
                    fontSize:6,
                },{
                    border:[true,true,true,true],
                    text:parseFloat((E).toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7,
                }
            ],[
                {
                    border:[false,false,true,false],
                    text:'Subtotal',
                    color:'#0D54A5',
                    alignment:'right',
                    fontSize:7,
                },{
                    border:[true,true,true,true],
                    text:parseFloat(((s-E)).toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7,
                }
            ],[
                {
                    border:[false,false,true,false],
                    text:'IVA',
                    color:'#0D54A5',
                    alignment:'right',
                    fontSize:7,
                },{
                    border:[true,true,true,true],
                    text:parseFloat(((s)*0.16).toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7,
                }
            ],[
                {
                    border:[false,false,true,false],
                    text:'Total',
                    color:'#0D54A5',
                    alignment:'right',
                    fontSize:7,
                },{
                    border:[true,true,true,true],
                    text:parseFloat((s-E).toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7,
                }
            ])
        console.log(S)
        if (Coin.length==0){
            return 'Failed!'
        } else {
            let p = pdf.createPdf({
            pageMargins: [20, 40, 20, 40],
            info:{
                    title:N + ' - ' +T,
                    author:User[0],
                    creator:'Ecosta',
                    producer:'SIE'
                },
            content:[
                {
                    columns:[
                        {
                            table:{
                                widths:[50,200,50,100],
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            colSpan:3,
                                            fontSize:9,
                                            alignment:'left',
                                            text:'Orden de Facturacion',
                                            color:'#0D54A5'
                                        },{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},
                                        {border:[false,false,false,false],text:''}
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            colSpan:3,
                                            fontSize:9,
                                            alignment:'left',
                                            text:' ',
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],text:'G01',
                                            alignment:'left',
                                            fontSize:7,
                                        },{border:[false,false,false,false],text:''},
                                        {border:[false,false,false,false],text:''}
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'M. de Pago:',
                                            alignment:'left',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            text:PayMet + ',      '+ PayFor,
                                            alignment:'right',
                                            fontSize:7,
                                        },
                                        {
                                            border:[false,false,false,false],
                                            alignment:'right',
                                            fontSize:8,
                                            text:'O. de Fact.',
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'center',
                                            text:N + '',
                                            fontSize:7,
                                            color:'#c40000',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'Uso CFDI:',
                                            alignment:'left',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            text:CFDI,
                                            alignment:'right',
                                            fontSize:7,
                                        },{
                                            border:[false,false,false,false],
                                            alignment:'right',
                                            fontSize:8,
                                            text:'Fecha',
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'center',
                                            text:D.getDate() + '-' + M[D.getMonth()] + '-' + D.getFullYear().toString().slice(-2),
                                            fontSize:7,
                                            color:'#c40000',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'Facturar a:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                    },{
                                            border:[false,false,false,true],
                                            text:X[0].fill,
                                            fontSize:7,
                                        },{
                                            border:[false,false,false,false],
                                            alignment:'right',
                                            fontSize:8,
                                            text:'RFC',
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'center',
                                            text:RFC,
                                            fontSize:7,
                                            color:'#c40000',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'Direccion:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            colSpan:3,
                                            text:X[2].fill ? X[2].fill : ' ',
                                            fontSize:7,
                                        },{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''}
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'Ciudad:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:Client[0] ? Client[0] : '',
                                            fontSize:7,
                                            bold: true
                                        },{
                                            border:[false,false,false,false],
                                            text:'Telefono:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:X[3].fill ? X[3].fill :' ',
                                            fontSize:7,
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'Entregar en:',
                                            fontSize:6,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:DeliveryA ? DeliveryA :' ',
                                            fontSize:7,
                                            bold: true
                                        },{
                                            border:[false,false,false,false],
                                            text:'Cond.:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:Client[2] ? Client[2] : '',
                                            fontSize:7,
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            text:'At\'n:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:Atn ? Atn :' ',
                                            fontSize:7,
                                            bold: true
                                        },{
                                            border:[false,false,false,false],
                                            text:'T. de C.:',
                                            fontSize:8,
                                            color:'#0D54A5'
                                        },{
                                            border:[false,false,false,true],
                                            alignment:'left',
                                            text:Coin ? Coin:' ',
                                            fontSize:7,
                                            bold: true
                                        }
                                    ],[
                                        {border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},
                                        {
                                            border:[false,false,false,false],
                                            fillColor:'#C0E2B7',
                                            text:'Facturar en:',
                                            fontSize:7,
                                        },{
                                            border:[false,false,false,false],
                                            fillColor:'#C0E2B7',
                                            alignment:'center',
                                            text:Co ? 'DOLARES' : 'PESOS',
                                            color:'#c40000',
                                            fontSize:7,
                                            bold: true
                                        }
                                    ]
                                ]
                            }, layout:{
                                hLineColor: '#0D54A5'
                            }
                        },{
                            margin:[0,20,0,0],
                            image:Dict.HPInvent,
                            width:110
                        }
                    ]
                },{
                    columns:[
                        {
                            table:{
                                widths:[30,50,60,60,50,50,80],
                                body:F
                            }, layout:{
                                hLineColor: '#0D54A5',
                                vLineColor: '#0D54A5'
                            }
                        },{
                            table:{
                                body:G
                            },
                            margin:[10,0,0,0],
                            width:140
                        }
                    ]
                }
            ],footer:{
                    columns:[
                        {
                            width:'*',
                            text:''
                        },{
                            width:'auto',
                            table:{
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            fontSize:9,
                                            text:'Carr. a Tepic 4681, Col. Guadalupe Victoria, C.P. 48317',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            fontSize:9,
                                            text:'Puerto Vallarta, Jalisco. Mexico',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            table:{
                                                body:[
                                                    [
                                                        {
                                                            border:[false,false,false,false],
                                                            margin:[0,-3,0,0],
                                                            image:Dict.PhoneCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'322 225 1320 con 4 lineas',
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-2,0,0],
                                                            image:Dict.WappCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'+52 ' + User[3],
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-1,0,0],
                                                            image:Dict.InterCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'www.ecosta.com.mx',
                                                        }
                                                    ]
                                                ]
                                            }
                                        }
                                    ]
                                ]
                            },
                            layout:{
                                hLineColor: '#1481ff'
                            }
                        },{
                            width:'*',
                            text:''
                        }
                    ]
                }
            }).open();
        }
    }
    Rem(Send, Client, No, Comm, Dater?) {
        const pdf = pdfMake;
        const Arr =[]; let T = 0;
        const a = sha512.sha512(Client + '-' + No);
        Arr.push([
            {
                border:[true,true,true,true],
                text:'Cant',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            },{
                border:[true,true,true,true],
                text:'Unidad',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            },{
                border:[true,true,true,true],
                text:'No. Serie',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            },{
                border:[true,true,true,true],
                text:'Descripcion',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            },{
                border:[true,true,true,true],
                text:'Precio C.',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            },{
                border:[true,true,true,true],
                text:'Subtotal',
                fillColor: '#0097C1',
                alignment:'center',
                fontSize:7
            }
        ]);
        Send.forEach(I => {
            Arr.push(
                [
                    {
                        border:[true,true,true,true],
                        text:I.Cant,
                        alignment:'center',
                        fontSize:7
                    },{
                        border:[true,true,true,true],
                        text:I.Unit,
                        alignment:'center',
                        fontSize:7
                    },{
                        border:[true,true,true,true],
                        text:I.Serial,
                        alignment:'center',
                        fontSize:7
                    },{
                        border:[true,true,true,true],
                        text:I.Desc,
                        alignment:'center',
                        fontSize:7
                    },{
                        border:[true,true,true,true],
                        text:(I.Ctot/I.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'center',
                        fontSize:7
                    },{
                        border:[true,true,true,true],
                        text:I.Ctot.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'center',
                        fontSize:7
                    }
                ]
            ); T = T + +I.Ctot;
        });
        Arr.push(
            [
                {
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:6
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:'Subtotal',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:T.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7
                }
            ],[
                {
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:6
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:'IVA',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:((T*1.16)-T).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7
                }
            ],[
                {
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:6
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:' ',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:'Total',
                    alignment:'center',
                    fontSize:7
                },{
                    border:[false,false,false,false],
                    text:(T*1.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                    alignment:'center',
                    fontSize:7
                }
            ]
        )
    try{
        let p = pdf.createPdf({
            pageMargins: [40, 40, 40, 80],
            info:{
                title:'Rem-'+No,//N + ' - ' +T,
                author:'Sie',//User[0],
                creator:'Ecosta',
                producer:'SIE'
            },
            content:[
                {
                    image: Dict.ELogo,
                            width:310,//Base:83 Mult:8.3
                            margin:[0,25,0,0]
                },{
                    text:' '
                },{
                    columns:[
                        {
                            table:{
                                widths:[400,100],
                                heights: [8, 35,8],
                                body:[
                                    [
                                        {
                                            border:[true,true,true,true],
                                            text:' ',
                                            fontSize : 7
                                        },{
                                            border:[true,true,true,true],
                                            text:'Remision',
                                            fontSize : 10,
                                            color:'#c40000',
                                            alignment:'center',
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,false],
                                            text:Client,
                                            fontSize : 15,
                                            color:'#c40000',
                                            alignment:'center',
                                            margin:[0,16,0,0],
                                            bold: true
                                        },{
                                            border:[true,true,true,false],
                                            text:No,
                                            fontSize : 15,
                                            color:'#c40000',
                                            alignment:'center',
                                            margin:[0,10,0,0],
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[true,false,true,true],
                                            text:' ',
                                            fontSize : 7
                                        },{
                                            border:[true,true,true,true],
                                            text: Dater ? new Date(Dater).toLocaleDateString('es-ES', {weekday: 'short', year:'numeric', month:'short', day:'numeric'}) : new Date().toLocaleDateString('es-ES', {weekday: 'short', year:'numeric', month:'short', day:'numeric'}),
                                            fontSize : 10,
                                            color:'#c40000',
                                            alignment:'center',
                                            bold: true
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },{
                    text:' '
                },{
                    table:{
                        widths:[50,60,50,160,75,75],
                        body:Arr
                    }
                },{
                    text:' '
                },{
                    text:Comm
                },{
                    text:' '
                },{
                    text:'Debo y pagare incondicionalmente a la orden de ECOSTA S. de R.L. de C.V. en la Cd. de Puerto Vallarta, Jal. causara un interes del CPP mas 10 puntos porcentuales mensuales de acuerdo al articulo 1092 del Codigo Comercial',
                    fontSize : 8
                },{
                    text:' '
                },{
                    table:{
                        widths:[40,300],
                        body:[
                            [
                                {
                                    border:[false,false,false,false],
                                    text:'Nombre',
                                    fontSize : 8
                                },{
                                    border:[false,false,false,true],
                                    text:' ',
                                    fontSize : 8,
                                    alignment:'center',
                                }
                            ],[
                                {
                                    border:[false,false,false,false],
                                    text:'Firma',
                                    fontSize : 8
                                },{
                                    border:[false,false,false,true],
                                    text:' ',
                                    fontSize : 8,
                                    alignment:'center',
                                }
                            ],[
                                {
                                    border:[false,false,false,false],
                                    text:'Puesto',
                                    fontSize : 8
                                },{
                                    border:[false,false,false,true],
                                    text:' ',
                                    fontSize : 8,
                                    alignment:'center',
                                }
                            ],[
                                {
                                    border:[false,false,false,false],
                                    text:'Fecha',
                                    fontSize : 8
                                },{
                                    border:[false,false,false,true],
                                    text:' ',
                                    fontSize : 8,
                                    alignment:'center',
                                }
                            ]
                        ]
                    }
                },{text:' '},{
                    text:'Codigo de Seguridad: ' + a,
                    fontSize : 8
                }
            ],footer:{
                columns:[
                    {
                        width:'*',
                        text:''
                    },{
                        width:'auto',
                        table:{
                            body:[
                                [
                                    {
                                        border:[false,false,false,true],
                                        fontSize:9,
                                        text:'Carr. a Tepic 4681, Col. Guadalupe Victoria, C.P. 48317',
                                        alignment:'center'
                                    }
                                ],[
                                    {
                                        border:[false,false,false,false],
                                        fontSize:9,
                                        text:'Puerto Vallarta, Jalisco. Mexico',
                                        alignment:'center'
                                    }
                                ],[
                                    {
                                        border:[false,false,false,false],
                                        table:{
                                            body:[
                                                [
                                                    {
                                                        border:[false,false,false,false],
                                                        margin:[0,-3,0,0],
                                                        image:Dict.PhoneCon,
                                                        width:13
                                                    },{
                                                        border:[false,false,false,false],
                                                        fontSize:9,
                                                        text:'322 225 1320 con 4 lineas',
                                                    },{
                                                        border:[false,false,false,false],
                                                        margin:[0,-2,0,0],
                                                        image:Dict.WappCon,
                                                        width:13
                                                    },{
                                                        border:[false,false,false,false],
                                                        fontSize:9,
                                                        text:'',
                                                    },{
                                                        border:[false,false,false,false],
                                                        margin:[0,-1,0,0],
                                                        image:Dict.InterCon,
                                                        width:13
                                                    },{
                                                        border:[false,false,false,false],
                                                        fontSize:9,
                                                        text:'www.ecosta.com.mx',
                                                    }
                                                ]
                                            ]
                                        }
                                    }
                                ]
                            ]
                        },
                        layout:{
                            hLineColor: '#1481ff'
                        }
                    },{
                        width:'*',
                        text:''
                    }
                ]
            }
            ,styles:{
                tableExample:{
                    margin: [85, 0, 0, 0],
                    fontSize:7
                }
            }
        }).open();
        return a;
    }catch(E) {
        console.log(E);
        return 'Error';
    }
    }
    Sends(Send:any[],K:string, D:Date){
        let pdf = pdfMake;
            let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            let n=1;
            let body=[];
            body.push(
                [
                    {
                        text:'Cant.'
                    },{
                        text:'Num. de Parte'
                    },{
                        text:'Descripcion'
                    },{
                        text:'Proveedor'
                    },{
                        text:'Precio Unit.'
                    },{
                        text:'Precio Total'
                    }
                ]
            );
            Send.forEach(I=>{
                body.push(
                    [
                        {
                            text:I.Cant
                        },{
                            text:I.Unit
                        },{
                            text:I.Desc
                        },{
                            text:I.PReal
                        },{
                            text:parseFloat(I.CCompra).toLocaleString('en-US',{style:'currency', currency:'USD'})
                        },{
                            text:parseFloat(I.CFin).toLocaleString('en-US',{style:'currency', currency:'USD'})
                        }
                    ]
                ); 
            });
            let p = pdf.createPdf({
                pageMargins: [40, 40, 40, 80],
                info:{
                    title:'Relacion Envio de '+ D.getFullYear() + '-' + M[D.getMonth()] + '-' + D.getDate(),
                    author:'Ventas',
                    creator:'Ecosta',
                    producer:'SIE'
                },
                content:[
                    {
                        columns:[
                            {
                                text:K,
                                width:210,//Base:83 Mult:8.3
                                margin:[0,25,0,0]
                            },{
                                text:D.getFullYear() + '-' + M[D.getMonth()] + '-' + D.getDate(),
                                margin:[160,25,0,0]
                            }
                        ]
                    },{
                        columns:[
                            {
                                image: Dict.ELogo,
                                width:210,//Base:83 Mult:8.3
                                margin:[0,25,0,0]
                            },{
                                image: Dict.HPLogo,
                                width:70,//Base: Mult:2
                                margin:[160,25,0,0]
                            }
                        ]
                    },{
                        table:{
                            widths:['auto','auto','*',60,'auto','auto'],
                            body:body
                        }
                    }
                ]
            }).open()
    }
    Arrayer(Send:any[]){
        let a=[];let T:number=0;let E:number=0;
        Send[0].Commit > 0 ? a.push(
                    [
                        {
                            border:[true,true,true,true],
                            text:'Cant',
                            fillColor: '#0097C1',
                            fontSize:6
                        },{
                            border:[true,true,true,true],
                            text:'Unidad',
                            fillColor: '#0097C1',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Descripcion',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Pedido',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Precio C.',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Com',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:6
                        },{
                            border:[true,true,true,true],
                            text:'Precio U.',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Subtotal',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'T. Entrega',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Cliente',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'O de C',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        }
                    ]
                ) :a.push(
                    [
                        {
                            border:[true,true,true,true],
                            text:'Cant.',
                            fillColor: '#0097C1',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Unidad',
                            fillColor: '#0097C1',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Descripcion',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Precio U.',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Subtotal',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'T. Entrega',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'Cliente',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:'O de F',
                            fillColor: '#0097C1',
                            alignment:'center',
                            fontSize:7
                        }
                    ]
                );
        Send[0].Commit > 0 ? Send.forEach(I=>{
            console.log(I.CCompra)
            T += (((+I.CCompra + (I.CCompra*(I.Commit/100))) * (I.Cant)) + (+I.GdE));
            E += +I.GdE;
            a.push(
                    [
                        {
                            border:[true,true,true,true],
                            text:I.Cant,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Unit,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Desc,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Pedido,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:parseFloat(I.CCompra).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Commit + '%',
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text: (+I.CCompra + (I.CCompra*(I.Commit/100))).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:(((+I.CCompra + (I.CCompra*(I.Commit/100))) * (I.Cant)) + (+I.GdE)).toLocaleString('en-US',{style:'currency', currency:'USD'}) ,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.TdE,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Cli,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.MID,
                            fontSize:7
                        }
                    ]
                )
        }) :Send.forEach(I=>{
            T += (+I.CCompra*I.Cant) + +I.GdE
            E += +I.GdE;
            a.push(
                    [
                        {
                            border:[true,true,true,true],
                            text:I.Cant,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Unit,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Desc,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:parseFloat(I.CCompra).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.CFin.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.TdE,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.Cli,
                            fontSize:7
                        },{
                            border:[true,true,true,true],
                            text:I.MID,
                            fontSize:7
                        }
                    ]
                )
        });
        Send[0].Commit > 0 ? a.push(
                    [
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text: 'Subtotal',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:T.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:Send[0].Koin == 0? 'Pesos':'Dolares'
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text: 'Gastos de Envio',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(+E).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text: 'IVA',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(T*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text: 'Total',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(+T +(T*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ]
                ) : a.push(
                    [
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:'Subtotal',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:T.toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:Send[0].Koin == 0? 'Pesos':'Dolares'
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:'IVA',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(T*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:Send[0].Koin == 0? 'Pesos':'Dolares'
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text: 'Gastos de Envio',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(+E).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ],[
                        {
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:'Total',
                            fontSize:7,
                            color:'#c40000',
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:(+T+(T*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            fontSize:7,
                            bold: true
                        },{
                            border:[false,false,false,false],
                            text:Send[0].Koin == 0? 'Pesos':'Dolares'
                        },{
                            border:[false,false,false,false],
                            text:' '
                        },{
                            border:[false,false,false,false],
                            text:' '
                        }
                    ]
                )
        return a;
    }
    Builder(OP:string, Delivered:string[], Provided:string[], Send:any[], N?:number, Datum?){
        try{
            switch(N){
            case 0:
                Delivered[0]='ECOSTA S de RL de CV';
                Delivered[1]='Paul Llamas'
                Delivered[2]='Carr. a Tepic 4681';
                Delivered[3]='Col. Guadalupe Victoria';
                Delivered[5]='Puerto Vallarta';
                Delivered[4]='Jalisco';
                Delivered[6]='3222251320';
                Delivered[7]='admon@ecosta.com.mx';
            break;
            case 1:
                Delivered[0]='Equipos Computacionales de Occidente SA de CV';
                Delivered[1]='Leonardo Rios';
                Delivered[2]='Av. Las americas 1237';
                Delivered[3]='Providencia';
                Delivered[5]='Guadalajara';
                Delivered[4]='Jalisco';
                Delivered[6]='333817066';
                Delivered[7]='leonardo_rios@ecosa.com.mx';
            break;
            default:
            break;
        }
        console.log(Provided, Send)
        let D = Datum ? new Date(Datum) : new Date();
        let Build=[]
        let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        Build.push({
            style:{
                fontSize:8
            },
                table:{
                    widths:Send[0].Commit> 0 ? [15,50,170,40,40,15,50,50,60,50,40] : [40,60,165,50,50,40,40,40],
                    body:this.Arrayer(Send)
                }, margin:[0,10,0,0]
        })
        let pdf = pdfMake;
        let p = pdf.createPdf({
            pageMargins: [20, 40, 20, 40],
            info:{
                    title:OP,
                    author:'this.User[0]',
                    creator:'Ecosta',
                    producer:'SIE'
                },
                pageOrientation: Send[0].Commit> 0? 'landscape': 'portrait',
            content:[
                {
                    columns:[
                        {
                            image: Dict.ELogo,
                            width:Send[0].Commit> 0? 320 : 310,//Base:83 Mult:8.3
                            margin:[0,5,0,20]
                        },{
                            text:'ORDEN DE COMPRA',
                            fontSize : 20,
                            bold: true,
                            margin: Send[0].Commit> 0? [245,10,20]: [25,10,20]
                        }
                    ]
                },{
                    columns:[
                        {
                            table:{
                        widths:[120,120,120],
                        body:[
                            [
                                {
                                    border:[false,false,false,false],
                                    text:'Proveedor:',
                                    fontSize:10,
                                    alignment:'center',
                                    color:'#3A66AD',
                                    bold: true
                                },{
                                    border:[false,false,false,false],
                                    text:'Facturar a:',
                                    fontSize:10,
                                    alignment:'center',
                                    color:'#3A66AD',
                                    bold: true
                                },{
                                    border:[false,false,false,false],
                                    text:'Entregar en:',
                                    fontSize:10,
                                    alignment:'center',
                                    color:'#3A66AD',
                                    bold: true
                                }
                            ],[
                                {
                                    border:[true,true,true,true],
                                    text:Send[0].Commit> 0 ? 'Equipos Computacionales de Occidente SA de CV' : Provided[0],
                                    fontSize:9,
                                    alignment:'center',
                                    bold: true
                                },{
                                    border:[true,true,true,true],
                                    text:'ECOSTA S de RL de CV',
                                    fontSize:9,
                                    alignment:'center',
                                    bold: true
                                },{
                                    border:[true,true,true,true],
                                    text:Delivered[0],
                                    fontSize:9,
                                    alignment:'center',
                                    bold: true
                                }
                            ],[
                                {
                                    border:[true,true,true,false],
                                    text:Send[0].Commit> 0 ? 'Leonardo Rios' : Provided[5],
                                    fontSize:8,
                                    bold: true
                                },{
                                    border:[true,true,true,false],
                                    text:'Paul Llamas',
                                    fontSize:8,
                                    bold: true
                                },{
                                    border:[true,true,true,false],
                                    text:Delivered[1],
                                    fontSize:8,
                                    bold: true
                                }
                            ],[
                                {
                                    border:[true,false,true,false],
                                    text:Send[0].Commit> 0 ? 'Av. Las americas 1237':Provided[1],
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:'Carr. a Tepic 4681',
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:Delivered[2],
                                    fontSize:7
                                }
                            ],[
                                {
                                    border:[true,false,true,false],
                                    text:Send[0].Commit> 0 ? 'Providencia':Provided[2] ,
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:'Col. Guadalupe Victoria',
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:Delivered[3],
                                    fontSize:7
                                }
                            ],[
                                {
                                    border:[true,false,true,false],
                                    text:Send[0].Commit> 0 ? 'Guadalajara, Jalisco' : Provided[3] +', '+Provided[4],
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:'Puerto Vallarta, Jalisco',
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:Delivered[5] + ', '+ Delivered[4],
                                    fontSize:7
                                }
                            ],[
                                {
                                    border:[true,false,true,false],
                                    text:Send[0].Commit> 0 ? '333817066': Provided[6],
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:'3222251320',
                                    fontSize:7
                                },{
                                    border:[true,false,true,false],
                                    text:Delivered[6],
                                    fontSize:7
                                }
                            ],[
                                {
                                    border:[true,false,true,true],
                                    text:Send[0].Commit> 0 ? 'leonardo_rios@ecosa.com.mx': Provided[7],
                                    color:'#3A66AD',
                                    decoration:'underline',
                                    fontSize:7
                                },{
                                    border:[true,false,true,true],
                                    text:'admon@ecosta.com.mx',
                                    color:'#3A66AD',
                                    decoration:'underline',
                                    fontSize:7
                                },{
                                    border:[true,false,true,true],
                                    text:Delivered[7],
                                    color:'#3A66AD',
                                    decoration:'underline',
                                    fontSize:7
                                }
                            ]
                        ]
                    }
                        },
                        {
                            table:{
                                widths:['auto','auto'],
                                body:[
                                    [
                                        {
                                            border:[false,false,false,false],
                                            text:' ',
                                            fontSize:9
                                        },{
                                            border:[false,false,false,false],
                                            text:' ',
                                            fontSize:9,
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,true],
                                            text:'Orden de Compra',
                                            fontSize:9
                                        },{
                                            border:[true,true,true,true],
                                            text:OP,
                                            fontSize:9,
                                            color:'#c40000',
                                            bold: true
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,true],
                                            text:'Fecha',
                                            fontSize:9
                                        },{
                                            border:[true,true,true,true],
                                            text:D.getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                            fontSize:9
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,true],
                                            text:'Condiciones de pago',
                                            fontSize:9
                                        },{
                                            border:[true,true,true,true],
                                            text:'Credito',
                                            fontSize:9
                                        }
                                    ],[
                                        {
                                            border:[true,true,true,true],
                                            text:'Tiempo de Entrega',
                                            fontSize:9
                                        },{
                                            border:[true,true,true,true],
                                            text:'3 Semanas',
                                            fontSize:9,
                                            decoration:'underline'
                                        }
                                    ]
                                ]
                            },
                            margin:Send[0].Commit> 0? [225,10,20]: [20,5,0,0]
                        }
                    ]
                },
                    Build
            ], footer:{
                columns:[
                        {
                            width:'*',
                            text:''
                        },{
                            width:'auto',
                            table:{
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            fontSize:9,
                                            text:'Carr. a Tepic 4681, Col. Guadalupe Victoria, C.P. 48317',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            fontSize:9,
                                            text:'Puerto Vallarta, Jalisco. Mexico',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            table:{
                                                body:[
                                                    [
                                                        {
                                                            border:[false,false,false,false],
                                                            margin:[0,-3,0,0],
                                                            image:Dict.PhoneCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'322 225 1320 con 4 lineas',
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-2,0,0],
                                                            image:Dict.WappCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'+52 ' +' this.User[3]',
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-1,0,0],
                                                            image:Dict.InterCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'www.ecosta.com.mx',
                                                        }
                                                    ]
                                                ]
                                            }
                                        }
                                    ]
                                ]
                            },
                            layout:{
                                hLineColor: '#1481ff'
                            }
                        },{
                            width:'*',
                            text:''
                        }
                    ]
            }
        }).open();
        return 'Success!'
        } catch(E){
            console.log(E)
            return 'Awwww'
        }
        
    }
    Generate(X:any, User:any, B:any, Co:boolean, T:string, N:number, Nt:string[], Tc:string, OCDate:string, ODatum?:string){
        console.log(OCDate)
        let CDate =  new Date(OCDate); let Datum = ODatum ? new Date(ODatum) : null;
        let pdf = pdfMake;
            let M =['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            let D= Datum ? new Date(Datum) : new Date();
            let body=[]; let S:number=0;let notes=[];let comme=[];let body2=[];let con=[];
            console.log(X)
            console.log(User)
            B.forEach(I=>{
                let s=0;
                con.push([
                        {
                            border:[false,false,false,false],
                            colSpan:6,
                            text:' ',
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            colSpan:6,
                            fillColor:'#66aaff',
                            text:I.Nom,
                            alignment:'center'
                        },{text:' '},{text:' '},{text:' '},{text:' '},{text:' '}
                    ],[
                        {
                            text:'Cantidad',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Unidad/Parte',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Descripción',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Unitario',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Precio Total',
                            alignment:'center',
                            bold:true
                        },{
                            text:'Tiempo de entrega',
                            alignment:'center',
                            bold:true
                        }
                ]);
                I.D.forEach(i=>{
                    s= +s + (+i.Ctot);
                    if(i.Unit=='SERVICIO ECO'){
                        //i.CInicial =0;
                        i.DeliveryC =0;
                        i.Dcto=0;
                        //i.Utilidad=0;
                    }
                con.push(
                    [
                        {
                            text:i.Cant,
                            alignment:'center'
                        },{
                            text:i.Unit,
                            alignment:'center'
                        },{
                                text:i.Desc,
                        },{
                            text:i.Unit=='SERVICIO ECO'? (+i.Ctot/i.Cant).toLocaleString('en-US',{style:'currency', currency:'USD'}) : (((+i.CInicial) * (1.00 +(i.Utilidad/100)) ) * (i.Dcto > 0 ? (i.Dcto/100) : 1) + +i.DeliveryC).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.Unit=='SERVICIO ECO'? (+i.Ctot).toLocaleString('en-US',{style:'currency', currency:'USD'}) : parseFloat(i.Ctot.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                            alignment:'justify',
                            noWrap: true
                        },{
                            text:i.DeliveryT,
                            alignment:'center'
                        }
                    ]
                );
            });
            con.push(
                [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal'
                    },{
                        text:parseFloat(s.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]);
                if(B.length==1){
                    con.push(
                        [
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'IVA'
                            },{
                                text:(s*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:' ',
                                alignment:'center'
                            }
                        ],[
                            {
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                border:[false,false,false,false],
                                text:' ',
                            },{
                                text:'Total'
                            },{
                                text:(s+(s*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                                alignment:'justify'
                            },{
                                border:[false,false,false,false],
                                text:Co ? 'Dolares' : 'Pesos',
                                alignment:'center'
                            }
                        ]);
                }
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:con
                    }
                });
                con=[];
                S=S+s;
            });
            if(B.length>1){
                body2.push({
                    style:{
                        fontSize:8
                    },
                    table:{
                        widths:[50,60,160,60,60,70],
                        body:[
                            [
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' '
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Subtotal General'
                    },{
                        text:parseFloat(S.toString()).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'IVA'
                    },{
                        text:(S*0.16).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:Co ? 'Dolares' : 'Pesos',
                        alignment:'center'
                    }
                ],[
                    {
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        border:[false,false,false,false],
                        text:' ',
                    },{
                        text:'Gran Total'
                    },{
                        text:(S+(S*0.16)).toLocaleString('en-US',{style:'currency', currency:'USD'}),
                        alignment:'justify'
                    },{
                        border:[false,false,false,false],
                        text:' ',
                        alignment:'center'
                    }
                ]
                        ]
                    }
                });
            }
            notes.push(
                [
                    {
                        border:[undefined],
                        text: Nt.length==0 ? '': 'Notas:'
                    },{
                        border:[undefined],
                        text:' '
                    }
                ]
            );
            Nt.forEach(I=>{
                notes.push(
                    [
                        {
                            border:[undefined],
                            text:' '
                        },{
                            border:[undefined],
                            text:I
                        }
                    ]
                )
            });
            comme.push({
                    text:Tc,
                    fontSize:8
                });
                console.log(body2)
            let H = new Headers();
            H.append('Content-Type', 'application/json');
            let p = pdf.createPdf({
                pageMargins: [40, 40, 40, 80],
                info:{
                    title:N + ' - ' +T,
                    author:User[0],
                    creator:'Ecosta',
                    producer:'SIE'
                },
                content:[
                    {
                        columns:[
                            {
                                image: Dict.ELogo,
                                width:210,//Base:83 Mult:8.3
                                margin:[0,25,0,0]
                            },{
                                image: Dict.HPLogo,
                                width:70,//Base: Mult:2
                                margin:[160,25,0,0]
                            }
                        ]
                    },{
                        columns:[
                            {
                                table:{
                                    widths:['auto',200],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,false],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            },{
                                                border:[false,false,false,true],
                                                text:' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                text:'Empresa:',
                                                border:[true,true,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,true,true,true],
                                                text:X[0].fill ? X[0].fill : ' ',
                                                fontSize : 7,
                                                bold:true
                                            }
                                        ],[
                                            {
                                                text:'Atencion:',
                                                border:[true,false,true,false],
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[1].fill ? X[1].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Dirección',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[2].fill ? X[2].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'Telefono:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,false],
                                                text:X[3].fill ? X[3].fill : ' ',
                                                fontSize : 7
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'e-mail:',
                                                fontSize : 7
                                            },{
                                                border:[true,false,true,true],
                                                text:X[4].fill ? X[4].fill : ' ',
                                                fontSize : 7
                                            }
                                        ]
                                    ]
                                }
                            },{
                                style: 'tableExample',
                                table:{
                                    widths:['auto','auto'],
                                    body:[
                                        [
                                            {
                                                border:[false,false,false,true],
                                                text:'Cotizacion:'
                                            },{
                                                border:[false,false,false,true],
                                                text:'COT-'+N,
                                                alignment:'center',
                                                color:'#c40000',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[false,false,false,true],
                                                text:' '
                                            }, {
                                                border:[false,false,false,true],
                                                text:' '
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Fecha de Expedicion:'
                                            },{
                                                border:[false,true,true,true],
                                                text:D.getDate()+'-'+M[D.getMonth()]+'-'+D.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,false,true],
                                                text:'Cotizacion vigente hasta:'
                                            },{
                                                border:[false,true,true,true],
                                                text: CDate.getDate()+'-'+M[CDate.getMonth()]+'-'+CDate.getFullYear().toString().slice(-2),
                                                color:'#1481ff',
                                                alignment:'right',
                                                bold: true
                                            }
                                        ],[
                                            {
                                                border:[true,true,true,false],
                                                text:'Ejecutivo'
                                            },{
                                                border:[true,true,true,false],
                                                text:User[0] //dd
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,false],
                                                text:'email'
                                            },{
                                                border:[true,false,true,false],
                                                text:User[2],
                                                alignment:'right'
                                            }
                                        ],[
                                            {
                                                border:[true,false,true,true],
                                                text:'Puesto'
                                            },{
                                                border:[true,false,true,true],
                                                text:User[1]
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    },
                    body2
                    ,{
                        style:{
                            fontSize:7
                        },
                        table:{
                            widths:[22,'auto'],
                            body:notes,
                            layout:{
                                defaultBorder: false,
                            }
                        }
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        text:' '
                    },{
                        style:{
                            fontSize:8
                        },
                        table:{
                            widths:[200],
                            body:[
                                [
                                    {
                                        fillColor:'#010577',
                                        text:'Terminos Comerciales:',
                                        color:'#FFFFFF'
                                    }
                                ]
                            ]
                        }
                    },comme,{
                        text:' '
                    },{
                        text:' '
                    },{
                        text:User[0].toString().replace('_', ' '),
                        fontSize:9,
                        color:'#080eaa'
                    },{
                        text:User[1],
                        fontSize:9,
                        color:'#080eaa'
                    }
                ],footer:{
                    columns:[
                        {
                            width:'*',
                            text:''
                        },{
                            width:'auto',
                            table:{
                                body:[
                                    [
                                        {
                                            border:[false,false,false,true],
                                            fontSize:9,
                                            text:'Carr. a Tepic 4681, Col. Guadalupe Victoria, C.P. 48317',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            fontSize:9,
                                            text:'Puerto Vallarta, Jalisco. Mexico',
                                            alignment:'center'
                                        }
                                    ],[
                                        {
                                            border:[false,false,false,false],
                                            table:{
                                                body:[
                                                    [
                                                        {
                                                            border:[false,false,false,false],
                                                            margin:[0,-3,0,0],
                                                            image:Dict.PhoneCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'322 225 1320 con 4 lineas',
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-2,0,0],
                                                            image:Dict.WappCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'+52 ' + User[3],
                                                        },{
                                                            border:[false,false,false,false],
                                                            margin:[0,-1,0,0],
                                                            image:Dict.InterCon,
                                                            width:13
                                                        },{
                                                            border:[false,false,false,false],
                                                            fontSize:9,
                                                            text:'www.ecosta.com.mx',
                                                        }
                                                    ]
                                                ]
                                            }
                                        }
                                    ]
                                ]
                            },
                            layout:{
                                hLineColor: '#1481ff'
                            }
                        },{
                            width:'*',
                            text:''
                        }
                    ]
                }
                ,styles:{
                    tableExample:{
			            margin: [85, 0, 0, 0],
                        fontSize:7
		            }
                }
            });
        return p;
    }
}