import { Component, OnInit } from '@angular/core';
import { HomeService  } from '../../../services/home.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {
  sellingProducts: any = [];
  behtarBachatProducts: any = [];
  gyan: string = 'demo';
  slideConfig = {
    autoplay: true, 
    slidesToShow: 5, 
    slidesToScroll: 1,  
    dots: false, 
    autoplaySpeed: 5000,
    nextArrow: `<div class="next" style=" position: absolute; top: -69px;
    left: auto;
    right: 35px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-left slick-arrow slider-next"></i></div>`,
    prevArrow: `<div class="prev"  style=" position: absolute; top: -69px;
    left: auto;
    right: 0px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-right slick-arrow slider-prev"></i></div>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  slideConfig2 = {
    autoplay: true, 
    slidesToShow: 5, 
    slidesToScroll: 1,  
    dots: false, 
    autoplaySpeed: 2000,
    nextArrow: `<div class="next" style=" position: absolute; top: -69px;
    left: auto;
    right: 35px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-left slick-arrow slider-next"></i></div>`,
    prevArrow: `<div class="prev"  style=" position: absolute; top: -69px;
    left: auto;
    right: 0px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-right slick-arrow slider-prev"></i></div>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  slideConfig3 = {
    autoplay: true, 
    slidesToShow: 5, 
    slidesToScroll: 1,  
    dots: false, 
    autoplaySpeed: 2000,
    nextArrow: `<div class="next" style=" position: absolute; top: -69px;
    left: auto;
    right: 35px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-left slick-arrow slider-next"></i></div>`,
    prevArrow: `<div class="prev"  style=" position: absolute; top: -69px;
    left: auto;
    right: 0px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-right slick-arrow slider-prev"></i></div>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  todaysOffer: any = [];
  trendProducts: any = [];
  todaysOfferWrapper: boolean = true;
  district;
  state;
  latLong;
  promoBanners: any = [];
  constructor(private homeService: HomeService, private commonService: CommonService,  private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    if(state && district){
      this.state = state;
      this.district = district;
    }else{
      this.commonService.getLocationMessage().subscribe((res: any) => {
        if(res){
          this.state = res.state;
          this.district = res.district;
        }
      })
    }

    this.commonService.getLatLongMessage().subscribe((res: any) => {
      if(res){
        this.latLong = res;
      }
    })
    

    this.categoryService.getMessage().subscribe((res: any) => {
      if(res.text == true){
        this.todaysOfferWrapper = false;
        this.getTodaysOffer();
        this.getTrendsProduct();
      }else{
        this.todaysOfferWrapper = true;
        this.getTopSellingProducts();
        this.getBehtarBachatProducts();
      }
    })
    
    this.getPromoBanners(this.district, this.state);
    
  }

  
  getTopSellingProducts(){
   this.homeService.getTopSellingProducts(this.district, this.state).subscribe((res: any) => {
     this.sellingProducts = res.ProductsApiReponse.Product;
   }, err => {
     console.log(err);
   })
  }

  getBehtarBachatProducts(){
    return this.homeService.getBehtarBachatProducts(this.district, this.state).subscribe((res: any) => {
      this.behtarBachatProducts = res.ProductsApiReponse.Product;
    }, err => {
      console.log(err);
    })
  }

  getTodaysOffer(){
    this.categoryService.getTodaysOffer(this.district, this.state).subscribe((res: any) => {
      if(res.Status){
        this.todaysOffer = res.ProductsApiReponse.Product;
      }
     
    }, err => {
      console.log(err);
    })
  }

  getTrendsProduct(){
    this.categoryService.getTrendsProduct(this.district, this.state).subscribe((res: any) => {
      if(res.Status){
        this.trendProducts = res.ProductsApiReponse.Product;
      }
    }, err => {
      console.log(err);
    })
  }

  getPromoBanners(district, state){
    this.homeService.getPromoBanners(district, state).subscribe((res: any) => {
      if(res.Status){
        this.promoBanners = res.BZBanner.BzBanner;
      }
    }, err => {
      console.log(err);
    })
  }

  goToDetailPage(id){
    if(this.latLong){
      sessionStorage.setItem('latData', this.latLong.lat);
      sessionStorage.setItem('longData', this.latLong.long);
    }
    this.router.navigate(['/bz/product-detail', id])
  }

  goToCategory(id, categoryName){
    if(id){
      this.router.navigate(['/bz/banners-products', id])
      //this.router.navigate(['/bz/banners-products', id], { queryParams: { category: categoryName } }); 
    }
    
  }
  
  goToSeeMore(value){
    sessionStorage.setItem('see-more', value);
    this.commonService.sendSeeMoreMessage(value);
    this.router.navigate(['/bz/see-more']);
    //console.log('see more');
  }

}
