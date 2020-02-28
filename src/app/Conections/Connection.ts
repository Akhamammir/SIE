import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
export class Conns {
    constructor(private H:Http, private R:Router){}
    Connect(){
        return new Promise<any>((resolve, reject)=>{
            let h = new Headers();
        h.append('Content-Type', 'application/json');
        this.H.post('/api', JSON.stringify({"ConfigLst":1}),{headers:h}).map(R=>{
            if (!firebase.apps.length) {
                resolve(firebase.initializeApp(JSON.parse(R.json()[0].Config)))
            } else {
                reject('Conn Done')
            }
        }).subscribe();
        })
    }
}