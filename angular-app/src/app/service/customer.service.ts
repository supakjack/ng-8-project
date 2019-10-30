import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private uri: string = `http://localhost:3000`
  constructor(private http: Http) { }
  select_all_customer() {
    return this.http.get(`${this.uri}/customers`).map(res => res.json())
  }
  insert_customer(data) {
    console.log(data)
    return this.http.post(`${this.uri}/customers`, data)
      .map(res => res.json())
  }
  delete_customer_by_id(data) {
    console.log(data)
    return this.http.delete(`${this.uri}/customers/${data.id}`)
      .map(res => res.json())
  }
  update_customer_by_id(data) {
    console.log(data)
    return this.http.put(`${this.uri}/customers/${data.id}`, data)
      .map(res => res.json())
  }
  select_by_id(id) {
    return this.http.get(`${this.uri}/customers/${id}`).map(res => res.json())
  }
}
