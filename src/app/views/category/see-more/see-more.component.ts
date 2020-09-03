// import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  Component, OnInit, Input, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from 'src/app/services/home.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.css']
})
export class SeeMoreComponent implements OnInit {
  productsList: any = [];
  district;
  state;
  seeMoreText;
  constructor(private commonService: CommonService, 
    private homeService: HomeService, 
    private categoryService: CategoryService, 
    private router: Router,
    private cdr: ChangeDetectorRef
    ) { 
   
  }

  ngOnInit(): void {
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    if(state && district){
      this.state = state;
      this.district = district;
      const seeMore = sessionStorage.getItem('see-more');
          console.log('see', seeMore);
          if(seeMore == 'top-selling'){
            this.getTopSellingProducts(this.district, this.state);
            this.seeMoreText = 'Top Selling Products';
          }
          if(seeMore == 'haryana-todays-offer'){
            this.getTodaysOffer(this.district, this.state);
            this.seeMoreText = 'आज के ऑफर-सिर्फ आपके लिए';
          }
          if(seeMore == 'behtar-bachat'){
             this.getBehtarBachatProducts(this.district, this.state); 
             this.seeMoreText = 'Behtar Bachat Products';  
          }
          if(seeMore == 'most-sellings'){
            this.getTrendsProduct(this.district, this.state); 
            this.seeMoreText = 'सर्वाधिक बिकने वाले उत्पाद';    
          }

    }else{
      this.commonService.getLocationMessage().subscribe((res: any) => {
        if(res){
          this.state = res.state;
          this.district = res.district;
          console.log('loc2', this.district, this.state);
          const seeMore = sessionStorage.getItem('see-more');
          console.log('see', seeMore);
          if(seeMore == 'top-selling'){
            this.getTopSellingProducts(this.district, this.state);
            this.seeMoreText = 'Top Selling Products';
          }
          if(seeMore == 'haryana-todays-offer'){
            this.getTodaysOffer(this.district, this.state);
            this.seeMoreText = 'आज के ऑफर-सिर्फ आपके लिए';
          }
          if(seeMore == 'behtar-bachat'){
             this.getBehtarBachatProducts(this.district, this.state); 
             this.seeMoreText = 'Behtar Bachat Products';  
          }
          if(seeMore == 'most-sellings'){
            this.getTrendsProduct(this.district, this.state); 
            this.seeMoreText = 'सर्वाधिक बिकने वाले उत्पाद';    
          }
          // this.commonService.getSeeMoreMessage().subscribe((res: any) => {
          //   console.log('ress', res);
          //   if(res == 'top-selling'){
          //     this.getTopSellingProducts(this.district, this.state);
          //   }
          //   if(res == 'haryana-todays-offer'){
          //     this.getTodaysOffer(this.district, this.state);
          //   }
          //   if(res == 'behtar-bachat'){
          //      this.getBehtarBachatProducts(this.district, this.state);   
          //   }
          //   if(res == 'most-sellings'){
          //     this.getTrendsProduct(this.district, this.state);     
          //   }
          // })

        }
      })
    }

    
  }



  getTopSellingProducts(district, state){
    this.homeService.getTopSellingProducts(district, state).subscribe((res: any) => {
      this.productsList = res.ProductsApiReponse.Product;
    }, err => {
      console.log(err);
    })
   }
 
   getBehtarBachatProducts(district, state){
     return this.homeService.getBehtarBachatProducts(district, state).subscribe((res: any) => {
       this.productsList = res.ProductsApiReponse.Product;
     }, err => {
       console.log(err);
     })
   }
 
   getTodaysOffer(district, state){
     this.categoryService.getTodaysOffer(district, state).subscribe((res: any) => {
       if(res.Status){
         this.productsList = res.ProductsApiReponse.Product;
       }
      
     }, err => {
       console.log(err);
     })
   }
 
   getTrendsProduct(district, state){
     this.categoryService.getTrendsProduct(district, state).subscribe((res: any) => {
       if(res.Status){
         this.productsList = res.ProductsApiReponse.Product;
       }
     }, err => {
       console.log(err);
     })
   }

   goToDetailPage(id){
     this.router.navigate(['/bz/product-detail', id]);
   }

}
