import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-banner-products',
  templateUrl: './banner-products.component.html',
  styleUrls: ['./banner-products.component.css']
})
export class BannerProductsComponent implements OnInit {
  brandsProduct: any = [];
  categoryId;
  districtId;
  latLong;
  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private url:LocationStrategy
  ) { }

  ngOnInit(): void {
    this.districtId = sessionStorage.getItem('haryanaDistrictId');
    this.commonService.getLatLongMessage().subscribe((res: any) => {
      if(res){
        this.latLong = res;
      }
    })
    this.route.params.subscribe((res: any) => {
      if(res){
        this.categoryId = res.categoryId;
        this.getBannerProducts(this.categoryId, this.districtId);
      }
    });
  }

  getBannerProducts(categoryId, districtId){
    this.categoryService.getHaryanCategoryProducts(categoryId, districtId).subscribe((res: any) => {
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
