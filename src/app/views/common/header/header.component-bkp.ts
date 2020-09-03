import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  locationForm: FormGroup;
  loginForm: FormGroup;
  verifyOtpForm: FormGroup;
  loginWrapperBox: boolean = true;
  mobileNo;
  stateList: any = [];
  districtList: any = [];
  stateName;
  districtName;
  closeIcon: boolean = false;
  farmerCategoryList: any = [];
  loginStatus: boolean = true;
  latitude: any;
  longitude: any;
  zoom: number;
  address: string;
  private geoCoder;
  categoryWrapper: boolean = false;
  categoryWrapperMobile: boolean = false;
  bannersList: any = [];
  slideConfig = {autoplay: true, slidesToShow: 2, slidesToScroll: 2,  dots: false, autoplaySpeed: 4000,
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

  //farmerCategoryList: any = [];
  slideConfig2 = {autoplay: false, slidesToShow: 5, slidesToScroll: 5,  dots: false, autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5
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
  resendOtp: boolean = false;
  farmerName;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService, 
    private categoryService: CategoryService, 
    private homeService: HomeService,  
    private mapsAPILoader: MapsAPILoader, 
    public router: Router,
  ) { }
 
  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      this.getFarmerCategoryList(); 
      this.getFarmersAppservices();
    });
    
    this.getLocation();
    this.createAddUserForm();
    this.createLoginForm();
    this.createVerifyForm();
    this.getStateListData(); 
   this.getBannersData();
    
    const loginMessage = sessionStorage.getItem('loginStatus');
    const isManualLocation = sessionStorage.getItem('isManualLocation');
    const farmerName = sessionStorage.getItem('FarmerName');
    if(farmerName){
      this.farmerName = farmerName;
    }
    if(isManualLocation == 'true'){
      //$('#myModal').modal('hide');
      this.stateName = sessionStorage.getItem('state');
      this.districtName = sessionStorage.getItem('district');
      
    }

    if(loginMessage){
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
    }
    
    this.categoryService.getMessage().subscribe((res: any) => {
      //console.log('gyan', res);
    })

  }


  createAddUserForm() {
    this.locationForm = this.fb.group({
      state: ['', Validators.required],
      district: ['', Validators.required]
    })
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      full_name: ['', Validators.required],
      mob: ['', Validators.required]
    })
  }

  createVerifyForm(){
    this.verifyOtpForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }

  getStateListData(){
    this.homeService.getStateList().subscribe((res: any) => {
      this.stateList = res.List;
    }, err => {
      console.log(err);
    })
  }

  category(){
    this.categoryWrapper = !this.categoryWrapper;
  }

  addState(stateId: any){
    let result = stateId.substr(0,stateId.indexOf(' '));
    sessionStorage.setItem('stateId', stateId.substr(0,stateId.indexOf(' ')));
    sessionStorage.setItem('state', stateId.substr(stateId.indexOf(' ')+1));
    this.stateName = sessionStorage.getItem('state');
    this.homeService.getDistrictList(result).subscribe((res: any) => {
      this.districtList = res.List;
    }, err => {
      console.log(err);
    })
  }

  addDistrict(districtId){
    sessionStorage.setItem('districtId', districtId.substr(0, districtId.indexOf(' ')));
    sessionStorage.setItem('district', districtId.substr(districtId.indexOf(' ')+1));
    this.districtName = sessionStorage.getItem('district');
  }
  

  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  }

  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        const state = sessionStorage.getItem('state');
        if(state){
          $('#myModal').modal('hide');
        }else{
          $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
          });
        }
        
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position:any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        sessionStorage.setItem('lat', position.coords.latitude);
        sessionStorage.setItem('long', position.coords.longitude);
        this.getAddress(this.latitude, this.longitude);
        this.getFarmerCategoryList();
        this.getFarmersAppservices();
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          if(this.stateName && this.districtName){
            sessionStorage.setItem('district', this.districtName);
            sessionStorage.setItem('state', this.stateName);
          }else{
            sessionStorage.setItem('district', results[0].address_components[4].long_name);
            sessionStorage.setItem('state', results[0].address_components[6].long_name);
          }
          
          
          //console.log('add', this.address);
          //this.categoryService.sendMessage({'state': results[0].address_components[6].long_name, 'district': results[0].address_components[4].long_name})
          this.getFarmerCategoryList();
          this.getFarmersAppservices();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  
  goBack(){
    this.loginWrapperBox = true;
  }

  locationModal(){
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
     });
     this.closeIcon = true;
     this.getFarmerCategoryList();
     this.getFarmersAppservices();
  }

  loginWrapper(){
    $('#myModal2').modal({
      backdrop: 'static',
      keyboard: false
     });
  }

  getFarmersAppservices(){
    this.categoryService.getFarmerAppServices().subscribe((res: any) => {
      if(res.Status){
        //console.log('res', res);
        sessionStorage.setItem('stateId', res.Location[0].StateId);
        sessionStorage.setItem('haryanaDistrictId', res.Location[0].DistrictId);
      }
    })
  }

  getFarmerCategoryList(){
    this.categoryService.getFarmerCategoryList().subscribe((res: any) => {
      if(res.Status){
        this.farmerCategoryList = res.Category.Category;
        for (let elem of this.farmerCategoryList) {
          if (elem.isKGP_Category === 0) {
            this.categoryService.sendMessage(true);
            break;
          }else{
            this.categoryService.sendMessage(false);
            break;
          }
        }
      }
     
    }, err => {
      console.log(err);
    })
  }

  keyPressEvent(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resendOneTimePassword(){
    this.authService.getOTP(this.loginForm.get('mob').value).subscribe((res: any) => {
      this.mobileNo = this.loginForm.get('mob').value;
      this.resendOtp = !this.resendOtp;
      this.loginWrapperBox = false;
      sessionStorage.setItem('loginMessage', res.message);
    }, err => {
      console.log(err);
    })
  }

  onSubmit(){
    console.log()
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    this.getFarmerCategoryList();
    this.getFarmersAppservices();
    sessionStorage.setItem('isManualLocation', 'true');
    //this.categoryService.sendMessage({'state': state, 'district': district})
    $('#myModal').modal('hide');
  }

  onLoginSubmit(){
    this.authService.getOTP(this.loginForm.get('mob').value).subscribe((res: any) => {
      this.mobileNo = this.loginForm.get('mob').value;
      this.loginWrapperBox = false;
    }, err => {
      console.log(err);
    })
   
  }
  onVerifyOtp(){
    this.authService.verfifyOTP(this.mobileNo, this.verifyOtpForm.get('otp').value).subscribe((res: any) => {
      if(res.success){
        this.loginStatus = false;
        const farmerName = this.loginForm.get('full_name').value;
        this.farmerLogin(this.mobileNo, farmerName);
        $('#myModal2').modal('hide');
        this.verifyOtpForm.reset();
      }else{
        alert('OTP is incorrect');
      }
     
    }, err => {
      console.log(err);
    })
   
  }

  private farmerLogin(phoneNo, farmerName){
    this.authService.farmerAppLogin(phoneNo, 0, 0, 0, farmerName).subscribe((res: any) => {
      //console.log('res', res[0].FarmerID);
      if(res[0].Status){
        this.farmerName = res[0].FirstName;
        sessionStorage.setItem('FarmerId', res[0].FarmerID);
        sessionStorage.setItem('FarmerName', res[0].FirstName);
        sessionStorage.setItem('farmerMob', phoneNo)
        sessionStorage.setItem('loginStatus', 'true');
      }
    }, err => {
      console.log(err);
    })
  }

  signOut(){
    sessionStorage.removeItem('district');
    sessionStorage.removeItem('FarmerId');
    sessionStorage.removeItem('haryanaDistrictId');
    sessionStorage.removeItem('farmerMob');
    sessionStorage.removeItem('stateId');
    sessionStorage.removeItem('state');
    sessionStorage.removeItem('FarmerName');
    sessionStorage.removeItem('lat');
    sessionStorage.removeItem('long');
    sessionStorage.removeItem('isManualLocation');
    sessionStorage.removeItem('loginStatus');
    this.loginStatus = true;
    this.loginForm.reset();
    this.loginWrapperBox = true;

  }

  goToSubcategory(id, kgp){
    //console.log('id', id);
    sessionStorage.setItem('kgpStatus', kgp);
    this.router.navigate(['/bz/category', id]);
    this.categoryWrapper = false;
    this.categoryWrapperMobile = false;
  }

  categoryMobile(){
    this.categoryWrapperMobile = !this.categoryWrapperMobile;
  }

  gotoHomePage(){
    this.router.navigate(['/bz']);
    this.categoryWrapperMobile = false;
  }

  getBannersData(){
    this.homeService.getBannersLists().subscribe((res: any) => {
      this.bannersList = res.BZAppBanner.BZProductBanner;
    
    }, err => {
      console.log(err);
    })
  }
}
