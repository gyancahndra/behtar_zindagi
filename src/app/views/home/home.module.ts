import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryListComponent } from './category-list/category-list.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { BrandsComponent } from './brands/brands.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    CategoryListComponent, 
    TopProductsComponent, 
    BrandsComponent, 
    HomeComponent, 
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
  ]
})
export class HomeModule { }
