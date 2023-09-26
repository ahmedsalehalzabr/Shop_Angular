import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  products:Product[] = [];
  categories:string[] = [];
  loading:boolean = false;
  cartProducts:any[] = []
  constructor(private service:ProductsService) {}
    ngOnInit(): void {
   this.getProducts()
   this.getCategories()
  }
  getProducts(){
    this.loading = true
    this.service.getAllProducts().subscribe ((res:any) => {
    this.products = res
    this.loading = false
    }, error =>{
      this.loading = false
      alert(error)
    })
  }
  getCategories(){
    this.loading = true
    this.service.getAllCategories().subscribe ((res:any) => {
    this.categories = res
    this.loading = false
    }, error =>{
      this.loading = false
      alert("Error")
    })
  }
  filtercategory(event:any) {
    let value = event.target.value;
    if(value == "all") {
      this.getProducts()
    } else {
      this.getProductsCategory(value)
    }
    
  }
  getProductsCategory(keyword:string) {
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res:any) =>{
       this.products = res
       this.loading = false
    })
  }
  addToCart(event:any) {
   if("cart" in localStorage) {
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    let exist = this.cartProducts.find(item => item.item.id == event.item.id)
    if(exist){
      alert("Products is already in your cart")
    }else{
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }
   }else {
    this.cartProducts.push(event)
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
   }
  }
 
}
