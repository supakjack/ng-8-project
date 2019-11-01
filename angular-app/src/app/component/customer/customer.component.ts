import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../service/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private customerList: any
  private customer: any

  constructor(private cus_ser: CustomerService) { }

  ngOnInit() {
    this.get_all_customer()
    this.customer = false;
  }

  get_all_customer() {
    this.cus_ser.select_all_customer().subscribe(res => {
      this.customerList = res
      console.log(this.customerList)
    })
  }

  add_customer(data) {
    console.log(data)
    this.cus_ser.insert_customer(data).subscribe(res => {
      console.log(res)
      this.get_all_customer()
    })

  }

  del_customer(data: any) {
    console.log(data) //delete_customer_by_id
    data.id = data.customerNumber
    this.cus_ser.delete_customer_by_id(data).subscribe(res => {
      console.log(res)
      this.get_all_customer()
    })
  }

  edit_customer(data: any,value:any) {
    // console.log(data) //delete_customer_by_id
    console.log(value) //delete_customer_by_id
    data.id = data.customerNumber
    data.customerName = value
    this.cus_ser.update_customer_by_id(data).subscribe(res => {
      console.log(res)
      this.get_all_customer()
    })
  }
  search_customer_by_id(data){
    if(data){
      this.cus_ser.select_by_id(data).subscribe(res=>{
        this.customer = res
        console.log(res)
      })
      this.customerList = false;
    }else{
      this.get_all_customer()
    }
    
    
  }
  get_hello(data: any[]) {
    console.log("hello")
    console.log(data)
  }

}