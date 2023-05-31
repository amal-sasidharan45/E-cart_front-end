import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService){}
  count:number=0
  ngOnInit(): void {
    this.api.cartitemcount.subscribe((data:any)=>{
      console.log(data);
      this.count=data
      
    })
  }
  search(event:any){

    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value);    //to assign new values to the behaviour subject

    
    

  }

}
