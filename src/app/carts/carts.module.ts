import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './componanets/cart/cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CartsModule { }
