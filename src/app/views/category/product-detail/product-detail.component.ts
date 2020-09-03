import { Component, OnInit } from '@angular/core';
import {Location, PopStateEvent} from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CommonService } from 'src/app/services/common.service';
import { ViewportScroller } from '@angular/common';
declare let $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId;
  districtId;
  dealerDetails: any = [];
  productDetails: any = [];
  desc: any = [];
  productAvailability: boolean = true;
  dealersAvailability: boolean = true;
  dealersMessage: string;
  globalBuyWrapper: boolean = true;
  farmerId;
  mobileNo;
  latData;
  haryanaBuyNowWrapper: boolean = false;
  latResult;
  longResult;
  districtResult;
  private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
  ) { }
   
  ngOnInit(): void {
   
    const defaultDistrictId = sessionStorage.getItem('districtId');
    const isBlockLocation = sessionStorage.getItem('isBlockLocation');
    const latData = sessionStorage.getItem('latData');
    const longData = sessionStorage.getItem('longData');
    this.farmerId = sessionStorage.getItem('FarmerId');
    this.mobileNo = sessionStorage.getItem('farmerMob');

    if(isBlockLocation == 'true'){
      if(defaultDistrictId){
        this.districtResult = defaultDistrictId;
      }
    }else{
      this.commonService.getDistrictMessage().subscribe((res) => {
        //console.log('des', res.districtId);
        if(res){
          this.districtResult = res.districtId;
        }
      });
    }

    this.route.params.subscribe((res: any) => {
      if(res){
        this.productId = res.productId;
      }
    });

    
    if(latData && longData && !this.farmerId  && !this.districtResult){
      this.getProductDetail(this.productId, 0, latData, longData);
    }
    if(this.districtResult && !latData && !longData && !this.farmerId){
      this.getProductDetail(this.productId, this.districtResult, 0, 0);
    }
    
    if(this.farmerId && latData && longData && !this.districtResult){
      this.getProductDetailWithFarmerId(this.productId, 0, this.farmerId, latData, longData);
    }

    if(this.farmerId && this.districtResult && !longData && !latData){
      this.getProductDetailWithFarmerId(this.productId, this.districtResult, this.farmerId, 0, 0);
    }

  }

  getProductDetail(ProductId, Districtid, lat, lon){
    //ProductId=3735&Districtid=0&lat=28.5402236&lon=79.4549102
    this.categoryService.getProductDetails(ProductId, Districtid, lat, lon).subscribe((res: any) => {
      if(res.Status){
        if(res.BZApiReponse){
          this.productDetails = JSON.parse(JSON.stringify(res.BZApiReponse.ProductDetails || null )) ;
          this.dealerDetails =  JSON.parse(JSON.stringify(res.BZApiReponse.DealerDetails || null )) ;
          this.productAvailability = true;
          if(this.productDetails.length > 0){
            let data = [];
            this.productDetails.forEach(element => {
              data.push(element.Description);
              return data;
            });
            
           if(data[0]){
            for (const [key, value] of Object.entries(JSON.parse(data[0]))) {
              if(value && value !== 'null' && value !== 'NULL'){
                this.desc.push({key: key, value: value});
              }
            }
           }

            
            
          }else{
            this.productAvailability = false;
          }
          if(this.dealerDetails.length > 0){
            this.dealersAvailability = true;
            this.dealerDetails.forEach(element => {
              if(element.IsDeliveryAvailable == 1){
                this.globalBuyWrapper = false;
              }
            
            });
          }else{
            this.dealersAvailability = false;
            this.dealersMessage = res.MSG[0].Msg;
          }
        }
      }
      
    }, err => {
      console.log(err);
    })
  }

  getProductDetailWithFarmerId(ProductId, Districtid, FarmerId, lat, lon){
    this.categoryService.getProductDetailsWithFarmerId(ProductId, Districtid, FarmerId, lat, lon).subscribe((res: any) => {
      if(res.Status){
        if(res.BZApiReponse){
          this.productDetails = JSON.parse(JSON.stringify(res.BZApiReponse.ProductDetails || null )) ;
          this.dealerDetails =  JSON.parse(JSON.stringify(res.BZApiReponse.DealerDetails || null )) ;
          this.productAvailability = true;
          if(this.productDetails.length > 0){
            let data = [];
            this.productDetails.forEach(element => {
              data.push(element.Description);
              return data;
            });
            
           if(data[0]){
            for (const [key, value] of Object.entries(JSON.parse(data[0]))) {
              if(value && value !== 'null' && value !== 'NULL'){
                this.desc.push({key: key, value: value});
              }
            }
           }

            
            
          }else{
            this.productAvailability = false;
          }
          if(this.dealerDetails.length > 0){
            this.dealersAvailability = true;
            this.dealerDetails.forEach(element => {
              if(element.IsDeliveryAvailable == 1){
                this.globalBuyWrapper = false;
              }
            
            });
          }else{
            this.dealersAvailability = false;
            this.haryanaBuyNowWrapper = true;
            this.dealersMessage = res.MSG[0].Msg;
          }
        }
      }
    }, err => {
      console.log(err);
    })
  }

  openModal(item){
    //console.log('item', item);
    if(this.farmerId){
      this.categoryService.getBestDeal(item.RecordId, this.mobileNo, this.farmerId, item.dealerId).subscribe((res: any) => {
        if(res.Status){
          this.dialog.open(DialogComponent, {
            data:  res.Msg[0].Msg
          });
        }
      })
    }else{
      this.dialog.open(DialogComponent, {
        data:  'Please Login First'
      });
    }
    
  }

  globalBuyBtn(){
    if(this.farmerId){
      this.router.navigate(['/bz/checkout', this.productId]);
    }else{
      this.dialog.open(DialogComponent, {
        data:  'Please Login First'
      });
    }
    
  }

  goToBack(){
    this.location.back();
  }
}
