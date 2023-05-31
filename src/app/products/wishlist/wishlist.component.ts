import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private api:ApiService){}
  wish_prod:any=[]


  ngOnInit(): void {
    this.api.getwishlistproduct().subscribe((result)=>{
      console.log(result);
      this.wish_prod=result
      
    })
    

}

deletewishlistitem(id:any){
  this.api.removewishistitem(id).subscribe((result:any)=>{
    console.log(result);
    alert('item deleted')
this.wish_prod=result
    
    
  })

}

addtoCart(product:any){
  //add quantity
  Object.assign(product,{quantity:1})
    console.log(product);


this.api.addtocart(product).subscribe((result:any)=>{
  alert(result)
  this.api.cartCount()
  this.deletewishlistitem(product.id)
},
(result:any)=>{
  alert(result.error)

})

  
  }

}

