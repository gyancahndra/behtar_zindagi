import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-promo-products',
  templateUrl: './promo-products.component.html',
  styleUrls: ['./promo-products.component.css']
})
export class PromoProductsComponent implements OnInit {
  subCategoryId;
  brandsProduct: any = [];
  latLong;
  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private url:LocationStrategy
  ) {
    // this.route.queryParams
    //   .filter(params => params.category)
    //   .subscribe(params => {
    //     console.log(params); 
    //     console.log(params.category.split('-').join(' ')); 
    //   }
    // );
   }

  ngOnInit(): void {
    this.commonService.getLatLongMessage().subscribe((res: any) => {
      if(res){
        this.latLong = res;
      }
    })
    this.route.params.subscribe((res: any) => {
      if(res){
        this.subCategoryId = res.subCategoryId;
        this.getSubCategoriesProducts(this.subCategoryId)
      }
    });
  }

  getSubCategoriesProducts(id){
    this.categoryService.getSubCategoryProduct(id).subscribe((res: any) => {
      if(res.ProductsApiReponse.Product.length > 0){
        this.brandsProduct = res.ProductsApiReponse.Product;
      }
      
    }, err => {
      console.log(err);
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
