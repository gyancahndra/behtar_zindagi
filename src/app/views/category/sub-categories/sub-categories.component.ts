import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../common/loader/loader.component';
import { TopProductsComponent } from '../../home/top-products/top-products.component';
import { CommonService } from 'src/app/services/common.service';
declare let $: any;
@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements AfterViewInit  {
  subCategoryList: any = [];
  categoryId;
  firstCategoryId;
  productsList: any = [];
  slideConfig = {autoplay: false, slidesToShow: 7, slidesToScroll: 1,  dots: false, autoplaySpeed: 4000,
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
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };
  selectedIndex: number = 0;
  filterData: any = [];

  @ViewChild(TopProductsComponent, { static: false })
  multiSelectDrp: TopProductsComponent;
  subCategoryWrapper: boolean = true;
  filterWrapper: boolean = true;
  productWrapper: boolean = true;
  state;
  district;
  latLong;
  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.commonService.getLatLongMessage().subscribe((res: any) => {
      if(res){
        // console.log('lat long def', res);
        this.latLong = res;
      }
    })

    this.route.params.subscribe((res: any) => {
      if(res && res.categoryId){
        this.categoryId = res.categoryId;
        const kgpStatus = sessionStorage.getItem('kgpStatus');
        //console.log(kgpStatus)
        if(kgpStatus == '1'){
          this.subCategoryWrapper = true;
          this.getSubCategoriesList();
        }else{
          this.subCategoryWrapper = false;
          //this.getSubCategoriesProducts(this.categoryId);
          const haryanaDistrictId = sessionStorage.getItem('haryanaDistrictId');
          this.getHaryanaProducts(this.categoryId, haryanaDistrictId);
          this.getSubCategoriesFilter(this.categoryId);
        }
      }
    });
  }

  ngAfterViewInit() {
    // let result = this.multiSelectDrp.getTopSellingProducts();
    // console.log('res', result);
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }

  getSubCategoriesList(){
    this.categoryService.getSubCategory(this.categoryId).subscribe((res: any) => {
      this.subCategoryList = res.BZAppSubCatagory.BZFarmerAppSubCatagory;
      this.firstCategoryId = this.subCategoryList[0].CategoryID;
      if(this.firstCategoryId){
        this.getSubCategoriesProducts(this.firstCategoryId);
        this.getSubCategoriesFilter(this.firstCategoryId);
      }
     
    }, err => {
      console.log(err);
    })
  }

  goToSubcategory(id){
    //console.log('id', id);
    this.getSubCategoriesProducts(id);
    this.getSubCategoriesFilter(id);
  }


  getSubCategoriesProducts(id){
    this.categoryService.getSubCategoryProduct(id).subscribe((res: any) => {
      if(res.ProductsApiReponse.Product.length > 0){
        this.productWrapper = true;
        this.productsList = res.ProductsApiReponse.Product;
        //console.log('haryan', this.productsList);
      }else{
        this.productWrapper = false;
      }
      
    }, err => {
      console.log(err);
    })
  }

  getHaryanaProducts(catId, districtId){
    this.categoryService.getHaryanCategoryProducts(catId, districtId).subscribe((res: any) => {
      if(res.Status){
        this.productsList = res.ProductsApiReponse.Product;
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

  getSubCategoriesFilter(id){
    this.categoryService.getSubCategoriesFilter(id).subscribe((res: any) => {
      if(res.KGPApiReponse){
        this.filterWrapper = true;
        this.filterData = res.KGPApiReponse;
      }else{
        this.filterWrapper = false;
      }
      
    }, err => {
      console.log(err);
    })
  }

}
