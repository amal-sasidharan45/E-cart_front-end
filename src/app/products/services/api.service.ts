import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //to hold search value
  searchTerm=new BehaviorSubject('')


//to hold cart item-count
cartitemcount=new BehaviorSubject(0)


  constructor(private http:HttpClient) {
    this.cartCount()
   }

Base_Url='https://e-cart-gci8.onrender.com'

  // api call for getallproducts
  getallproduct(){
    return this.http.get(`${this.Base_Url}/products/all-products`) 
    
  }
viewproducts(prod_id:any){
  return this.http.get(`${this.Base_Url}/products/view-product/${prod_id}`)
}


//apicall for addto wishlist

addtowishlist(id:any,title:any,price:any,image:any){
  const body={
    id,title,price,image

  }
  return this.http.post(`${this.Base_Url}/wishlist/add-to-wishlist`,body)

}

getwishlistproduct(){
  return this.http.get(`${this.Base_Url}/wishlist/get-wishlist`)
}

removewishistitem(id:any){
  return this.http.delete(`${this.Base_Url}/wishlist/remove-wishlist-item/${id}`)
}
addtocart(product:any){
  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
   quantity:product.quantity
    
  }

  return this.http.post(`${this.Base_Url}/cart/add-to-cart`,body)

}
getcartproduct(){
  return this.http.get(`${this.Base_Url}/cart/get-cart/`)
}
cartCount(){
  this.getcartproduct().subscribe((result:any)=>{//array of cart items
    this.cartitemcount.next(result.length);//number of items

  })
}

removecartitem(id:any){
 return this.http.delete(`${this.Base_Url}/cart/deleletcartitem/${id}`)

}

incrementcart(id:any){
  return this.http.get(`${this.Base_Url}/cart/incrementcart/${id}`)
}
decrementcart(id:any){
  return this.http.get(`${this.Base_Url}/cart/decrementcart/${id}`)
}
}



