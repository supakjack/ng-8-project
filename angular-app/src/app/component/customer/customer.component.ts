import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../service/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  static search_customer(arg0: string) {
    console.log()
    throw new Error("Method not implemented.");
  }

  private customerList: Array<rs_customer>

  constructor(private cus_ser: CustomerService) { }

  ngOnInit() {
    this.get_all_customer()
  }

  get_all_customer() {
    this.cus_ser.select_all_customer().subscribe(res => {
      this.customerList = res
      console.log(this.customerList)
    })
  }

  add_customer(data) {
    console.log(data)
    // data.addressLine1 = "Erling Skakkes gate 78"
    // data.addressLine2 = null
    // data.city = "Stavern"
    // data.contactFirstName = "JACK"
    // data.contactLastName = "SUPAK"
    // data.country = "Norway"
    // data.creditLimit = 81700
    // data.customerName = "Baane Mini Imports"
    // data.customerNumber = 121
    // data.phone = "07-98 9555"
    // data.postalCode = "4110"
    // data.salesRepEmployeeNumber = 1504
    // data.state = null
    // console.log(data)
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
    console.log(data) //delete_customer_by_id
    console.log(value) //delete_customer_by_id
    data.id = data.customerNumber
    data.customerName = value
    this.cus_ser.update_customer_by_id(data).subscribe(res => {
      console.log(res)
      this.get_all_customer()
    })
  }
  // search_customer(data){
  //   return console.log(data)
  // }
  get_hello(data: any[]) {
    console.log("hello")
    console.log(data)
  }

}

interface rs_customer {
  addressLine1: any
  addressLine2: any
  city: any
  contactFirstName: any
  contactLastName: any
  country: any
  creditLimit: any
  customerName: any
  customerNumber: any
  phone: any
  postalCode: any
  salesRepEmployeeNumber: any
  state: any
}