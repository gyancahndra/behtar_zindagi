import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import {LocationStrategy} from '@angular/common';
@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css']
})
export class BrandProductsComponent implements OnInit {
  brandId;
  state;
  district;
  brandsProduct: any = [];
  districtId;
  latLong;
  categoryId;
  subCategoryId;

  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private url:LocationStrategy
  ) { }

  ngOnInit(): void {

    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    this.districtId = sessionStorage.getItem('haryanaDistrictId');
    this.commonService.getLatLongMessage().subscribe((res: any) => {
      if(res){
        this.latLong = res;
      }
    })
    this.route.params.subscribe((res: any) => {
      if(res){
        this.brandId = res.brandId;
        if(state && district){
          this.state = state;
          this.district = district;
          this.getbrandProducts(this.state, this.district, this.brandId, this.districtId);
        }else{
          this.commonService.getLocationMessage().subscribe((res) => {
            if(res){
              this.state = res.state;
              this.district = res.district;
              this.getbrandProducts(this.state, this.district, this.brandId, this.districtId);
            }
          })
        }
      }
    })
   

    

    // console.log(this.url.path());
    
    // if(this.url.path() === '/bz/brand-products'){
    //   console.log('dee', this.url.path());
    //   if(state && district){
    //     this.state = state;
    //     this.district = district;
    //     this.getbrandProducts(this.state, this.district, this.brandId, this.districtId);
    //   }else{
    //     this.commonService.getLocationMessage().subscribe((res) => {
    //       if(res){
    //         this.state = res.state;
    //         this.district = res.district;
    //         this.getbrandProducts(this.state, this.district, this.brandId, this.districtId);
    //       }
    //     })
    //   }
    //  }
    // //  if(this.url.path() === '/bz/banners-products'){
    // //   console.log('dedfe', this.url.path());
    // //   console.log('dedf', this.subCategoryId);
    // //   this.getSubCategoriesProducts(this.subCategoryId);
    // //  }
    //  else{
    //   this.getBannerProducts(this.categoryId, this.districtId);
    //  }



    
   
  }

  getbrandProducts(state, district, brandId, districtId){
    this.categoryService.getBrandWiseProducts(state, district, brandId, districtId).subscribe((res: any) => {
      if(res.Status){
        this.brandsProduct = res.ProductsApiReponse.Product;
      }else{
        alert('Data not available')
      }
    })
  }

 

  

  goToProdcutDetail(data){
    if(data){
      if(this.latLong){
        this.commonService.sendLatLongMessage(this.latLong);
        sessionStorage.setItem('latData', this.latLong.lat);
        sessionStorage.setItem('longData', this.latLong.long);
      }
      this.router.navigate(['/bz/product-detail', data.RecordID]);
    }
  }

}
