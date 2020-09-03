import { Injectable } from '@angular/core';
import { API_PATH } from '../utilis/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(
    private http: HttpClient,
  ) { }

  getOTP(mobileNo){
    return this.http.get(API_PATH.getOTP + '?mobile='+mobileNo)
  }

  verfifyOTP(mobileNo, otp){
    return this.http.get(API_PATH.verifyOTP+ '?mobile=' + mobileNo + '&otp=' + otp)
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  
  farmerAppLogin(phoneNo, referBy, farmerId, deviceId, farmerName){
    return this.http.get(API_PATH.farmerAppLogin + '?apiKey=123&PhoneNo=' + phoneNo + '&referedBy=' + referBy + '&FarmerId=' + farmerId + '&DeviceId=' + deviceId + '&Name=' + farmerName);
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
