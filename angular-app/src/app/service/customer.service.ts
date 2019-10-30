import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private uri:string = `http://localhost:3000`
  constructor(private http:Http) { }
  select_all_customer(){
    return this.http.get(`${this.uri}/customers`).map(res=>res.json())
  }
  insert_customer(data){
    console.log(data)
    // this.http.post('https://myapiserver', JSON.stringify(user), 
    //            { headers: config }).subscrib

   return this.http.post(`${this.uri}/customers`,data)
   .map(res => res.json())
  }
}
