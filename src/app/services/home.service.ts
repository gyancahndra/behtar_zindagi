import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { API_PATH } from '../utilis/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  


  getStateList(){
    return this.http.get(API_PATH.statesList);
  }

  getDistrictList(stateId){
    return this.http.get(API_PATH.districtList+`&Id=${stateId}&Type=D`);
  }

  getBannersLists(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.bannersList, httpOptions);
  }

  getPromoBanners(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.getPromoBanners, httpOptions);
  }

  getTopSellingProducts(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.topSellingProducts, httpOptions);
  }

  getBehtarBachatProducts(district, state){
    const httpOptions = {
      headers: new HttpHeaders({
        "district": district,
        "state": state
      })
    }
    return this.http.get(API_PATH.behtarBachatProducts);
  }

  getTopBrands(){
    return this.http.get(API_PATH.topBrands);
  }

  GetBrandWiseProduct(brandId, DistrictId){
    return this.http.get(API_PATH.GetBrandWiseProduct + '?version=1&CategoryId=0&BrandId=' + brandId + '&DistrictId=' + DistrictId + '&PageIndex=1&PageSize=100')
  }


}
