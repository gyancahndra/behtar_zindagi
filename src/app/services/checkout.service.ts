import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { API_PATH } from '../utilis/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  checkout(farmerId, PackageId, Quantity, RecordId, FarmerName, Mobile, address, DistrictId, StateId){

    const body = {
      "apiKey": "123",
      "userid": farmerId,
      "ModeOfPayment": "cod",
      "Product": [
          {
              "PackageId": PackageId,
              "Quantity": Quantity,
              "RecordId": RecordId
          }
      ],
      "Farmer": {
          "FarmerId": farmerId,
          "FarmerName": FarmerName,
          "FatherName": "",
          "Mobile": Mobile,
          "OtherVillageName": "",
          "Address": address,
          "VillageId": '',
          "BlockId": '',
          "DistrictId": DistrictId,
          "StateId": StateId
      }
  }

    return this.http.post(API_PATH.orderCreate, body);
    
  }

 
}
