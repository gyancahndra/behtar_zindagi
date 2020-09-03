import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { SeeMoreComponent } from './see-more/see-more.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';
import { BannerProductsComponent } from './banner-products/banner-products.component';
import { PromoProductsComponent } from './promo-products/promo-products.component';

@NgModule({
  declarations: [
    SubCategoriesComponent,
    ProductDetailComponent,
    CheckoutComponent,
    SeeMoreComponent,
    BrandProductsComponent,
    BannerProductsComponent,
    PromoProductsComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    RouterModule,

  ]
})
export class CategoryModule { }
