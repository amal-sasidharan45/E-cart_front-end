import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
constructor(private viewactivatedroute:ActivatedRoute,private api:ApiService){}
productId:string=''
prod:any=[]
  ngOnInit(): void {
    
this.viewactivatedroute.params.subscribe((data:any)=>{
  console.log(data.id);
  this.productId=data.id
  this.api.viewproducts(this.productId).subscribe((data:any)=>{
    console.log(data);
    this.prod=data
    
  },(result:any)=>{
    console.log(result.error);
    
  })
})


  }

addtowishlist(){
  const{id,title,price,image}=this.prod
  //api call

  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  })
}



addtoCart(product:any){
  //add quantity
  Object.assign(product,{quantity:1})
    console.log(product);


this.api.addtocart(product).subscribe((result:any)=>{
  alert(result)
  this.api.cartCount()
},
(result:any)=>{
  alert(result.error)

})

  
  }


}
