import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryModule } from './views/category/category.module';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './views/layout/layout.component';
import { SubCategoriesComponent } from './views/category/sub-categories/sub-categories.component';
import { ProductDetailComponent } from './views/category/product-detail/product-detail.component';
import { AboutComponent } from './views/about/about.component';
import { HomeLayoutComponent } from './views/home-layout/home-layout.component';
import { CheckoutComponent } from './views/category/checkout/checkout.component';
import { SeeMoreComponent } from './views/category/see-more/see-more.component';
import { BrandProductsComponent } from './views/category/brand-products/brand-products.component';
import { BannerProductsComponent } from './views/category/banner-products/banner-products.component';
import { PromoProductsComponent } from './views/category/promo-products/promo-products.component';

const routes: Routes = [

  // {
  //   path: 'bz',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path:'', component:HomeComponent
  //     },
  //     {
  //       path : 'category/:categoryId',
  //       component: SubCategoriesComponent
  //     },
  //     {
  //       path: 'product-detail/:productId',
  //       component: ProductDetailComponent
  //     },
  //     {
  //       path: 'about',
  //       component: AboutComponent
  //     },
  //     {
  //       path: '', 
  //       redirectTo:'', 
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // { path: "**", redirectTo: "/bz", pathMatch: "full" }

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'bz',
    component: LayoutComponent,
    children: [
      {
        path: 'category/:categoryId',
        component: SubCategoriesComponent
      },
      {
        path: 'product-detail/:productId',
        component: ProductDetailComponent
      },
      {
        path: 'checkout/:productId',
        component: CheckoutComponent
      },
      {
        path: 'brand-products/:brandId',
        component: BrandProductsComponent
      },
      {
        path: 'banner-products/:categoryId',
        component: BannerProductsComponent
      },
      {
        path: 'banners-products/:subCategoryId',
        component: PromoProductsComponent
      },
      {
        path: 'see-more',
        component: SeeMoreComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
