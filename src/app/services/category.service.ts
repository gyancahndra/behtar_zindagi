import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { API_PATH } from '../utilis/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private subject = new Subject<any>();
  private locationSource = new Subject<any>();
  isLocation = this.locationSource.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }


  sendMessage(message: any) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getFarmerCategoryList(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.farmerCategory, httpOptions);
  }

  getSubCategory(id){
    return this.http.get(API_PATH.subCategories + id);
  }

  getSubCategoryProduct(categoryId){
   
    const body = {
      "KGP_CategoryId": categoryId,
      "KGPCategory": [],
      "lang": "E",
      "userid": "",
      "version": "1"
    }
    return this.http.post(API_PATH.getSubCategoriesProductsByCategoryId, (body));
  }

  getSubCategoriesFilter(id){
    return this.http.get(API_PATH.getSubCategoryFilter + id);
  }

  getProductDetails(ProductId, Districtid, lat, lon){
    const paramsData = {
      version: 1,
      ProductId: ProductId,
      Districtid: Districtid,
      lat: lat,
      lon: lon
    }

    return this.http.get(API_PATH.getProductDetails, {
      params: JSON.parse(JSON.stringify(paramsData)),
    })
  }

  getProductDetailsWithFarmerId(ProductId, Districtid, FarmerId, lat, lon){
    const paramsData = {
      version: 1,
      ProductId: ProductId,
      Districtid: Districtid,
      FarmerId: FarmerId,
      lat: lat,
      lon: lon
    }

    return this.http.get(API_PATH.getProductDetailsWithFarmerId, {
      params: JSON.parse(JSON.stringify(paramsData)),
    })
  }

  getHaryanCategoryProducts(catId, districtId){
    return this.http.get(API_PATH.haryanaCategoryProduct + "version=1&CategoryId=" + catId + '&SubCategoryId=null&DistrictId=' + districtId + '&PageIndex=1&PageSize=1000')
  }

  getBestDeal(PackageId, MobileNo, buyerId, sellerId){
    return this.http.get(API_PATH.getBestDeal + '?PackageID=' + PackageId + '&MobileNo=' + MobileNo + '&BuyerID=' + buyerId + '&SellerID=' + sellerId);
  }

  getFarmerAppServices(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.farmerAppServices, httpOptions)
  }

  getTodaysOffer(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.GetTodayOfferProduct + '?Version=1&CategoryId=0', httpOptions);
  }

  getTrendsProduct(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.getTrendsProduct, httpOptions);
  }

  getBrandWiseProducts(district, state, brandId, districtId){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    //?version=1&CategoryId=0&BrandId=1428&DistrictId=716&PageIndex=1&PageSize=100
    return this.http.get(API_PATH.GetBrandWiseProduct + '?version=1&CategoryId=0&BrandId=' + brandId + '&DistrictId=' + districtId + '&PageIndex=1&PageSize=100', httpOptions);
  }

}
