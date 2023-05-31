import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']

})
export class CartComponent implements OnInit {
  constructor(private api:ApiService,private paymentfb:FormBuilder){}
cartproducts:any=[]
totalamount:number=0
paymentstatus:boolean=false
offerstatus:boolean=true
offerclicked:boolean=false

username:string=''
housenumber:string=''
streetname:string=''
pincode:string=''
state:string=''

showSuccess:boolean=false
showpaypal:boolean=false

public payPalConfig?: IPayPalConfig;

paymentform=this.paymentfb.group({
  username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
  streetname:['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
  pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-z]*')]],






})


  ngOnInit(): void {

    this.initConfig();
    this.api.getcartproduct().subscribe((result:any)=>{
      console.log(result);
      this.cartproducts=result
      //call get cart total
      this.getcarttotal()

      
    })
  }


  deletecartitem(id:any){
this.api.removecartitem(id).subscribe((data:any)=>{
  console.log(data);
  this.cartproducts=data
  this.api.cartCount()
  this.getcarttotal()
  
},
(result:any)=>{
  alert(result.error)

})
  }

  getcarttotal(){
    let total=0
    this.cartproducts.forEach((item:any)=>{
      total=total+item.grandtotal
      this.totalamount=Math.ceil(total)
  
    })
  }


  incrementcart(id:any){
    this.api.incrementcart(id).subscribe((result:any)=>{
      console.log(result);
      this.cartproducts=result
      this.getcarttotal()
      

    })
  }
  drecrement(id:any){
    this.api.decrementcart(id).subscribe((result:any)=>{
      console.log(result);
      this.cartproducts=result
      this.getcarttotal()
      

    })
  }



  //form validation
submitform(){
  if(this.paymentform.valid){
    this.paymentstatus=true
      console.log(this.paymentform)
      this.username=this.paymentform.value.username||""
      this.housenumber=this.paymentform.value.housenumber||""

      this.streetname=this.paymentform.value.streetname||""

      this.pincode=this.paymentform.value.pincode||""
      this.state=this.paymentform.value.state||""





  }
  else{
    alert('please enter valid details')
  }
}

offers(){
  this.offerstatus=false
  this.offerclicked=true

}
discounts(value:any){
  this.totalamount=Math.ceil(this.totalamount*(100-value)/100)
  this.offerclicked=false
}
makepayment(){
  this.showpaypal=true
}


private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}



}



