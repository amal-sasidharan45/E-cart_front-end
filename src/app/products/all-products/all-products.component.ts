import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allproducts:any=[]
  searchTerm:string=''
  constructor(private api:ApiService) {}
  ngOnInit(): void {
  
    
    this.api.getallproduct().subscribe((result)=>{
      console.log(result);//array of 20 data
      this.allproducts=result
    })
          // this.searchTerm=this.api.searchTerm
          this.api.searchTerm.subscribe((result:any)=>{
            this.searchTerm=result
          })
          console.log(this.searchTerm);

          
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

