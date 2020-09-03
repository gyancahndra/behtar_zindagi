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
  slideConfig2 = {autoplay: false, slidesToShow: 5, slidesToScroll: 1,  dots: false, autoplaySpeed: 4000,
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
  stateId;
  districtId;
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
   

    // this.categoryService.getMessage().subscribe((res: any) => {
    //   console.log('cate', res);
    //   if(res){
    //     this.getFarmerCategoryList();
    //   }
    // })

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      this.getFarmerCategoryList(); 
      this.getFarmersAppservices();
    });
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    if(state && district){
      this.stateName = state;
      this.districtName = district;
      this.commonService.sendManualLocationMessage({state: this.stateName, district: this.districtName});
      this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
    }else{
      this.getLocation();
    }
    

    
    this.createAddUserForm();
    this.createLoginForm();
    this.createVerifyForm();
    this.getStateListData(); 
    const loginMessage = sessionStorage.getItem('loginStatus');
    const farmerName = sessionStorage.getItem('FarmerName');
    
    if(farmerName && loginMessage){
      this.farmerName = farmerName;
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
    }
    
    
    // this.categoryService.getMessage().subscribe((res: any) => {
    //   console.log('gyan', res);
    // })
   
    this.commonService.getLocationMessage().subscribe((res: any) => {
      if(res){
        this.districtName = res.district;
        this.stateName = res.state;
      }
    });

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // const state = sessionStorage.getItem('state');
    // const district = sessionStorage.getItem('district');
    // if(state && district){
    //   $('#myModal').modal('hide');
    // }
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
   
    this.stateName = stateId.substr(stateId.indexOf(' ')+1);
    this.stateId = stateId.substr(0,stateId.indexOf(' '));
    this.homeService.getDistrictList(result).subscribe((res: any) => {
      this.districtList = res.List;
    }, err => {
      console.log(err);
    })
  }

  addDistrict(districtId){
    
    this.districtName = districtId.substr(districtId.indexOf(' ')+1);
    this.districtId = districtId.substr(0, districtId.indexOf(' '));
  }
  

  getData(){
    navigator.permissions && navigator.permissions.query({name: 'geolocation'})
    .then(function(PermissionStatus) {
        if (PermissionStatus.state == 'granted') {
              //allowed
              console.log('gyan');
        } else if (PermissionStatus.state == 'prompt') {
              // prompt - not yet grated or denied
              // console.log('gyan2');
        } else {
            //denied
            $('#myModal').modal({
              backdrop: 'static',
              keyboard: false
            });
            console.log('gyan3');
           
        }
    })
  }

  waitForOneSecond(data) {
    return new Promise(resolve => {
     resolve(data)
    });
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
        $('#myModal').modal({
          backdrop: 'static',
          keyboard: false
         });
         sessionStorage.setItem('isBlockLocation', 'true');
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
        // sessionStorage.setItem('lat', position.coords.latitude);
        // sessionStorage.setItem('long', position.coords.longitude);
        this.commonService.sendLatLongMessage({lat: this.latitude, long: this.longitude})
        this.getAddress(this.latitude, this.longitude);
        this.getFarmerCategoryList();
        this.getFarmersAppservices();
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        let city, region, country;
        if (results[1]) {
          var indice=0;
          for (var j=0; j<results.length; j++)
          {
              if (results[j].types[0]=='locality')
                  {
                      indice=j;
                      break;
                  }
              }
          for (var i=0; i<results[j].address_components.length; i++)
              {
                  if (results[j].address_components[i].types[0] == "locality") {
                          //this is the object you are looking for City
                           city = results[j].address_components[i];
                      }
                  if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                          //this is the object you are looking for State
                          region = results[j].address_components[i];
                      }
                  if (results[j].address_components[i].types[0] == "country") {
                          //this is the object you are looking for
                          country = results[j].address_components[i];
                      }
              }
              //city data
              console.log(city.long_name + " || " + region.long_name + " || " + country.short_name);

              if(this.stateName && this.districtName){
                this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
              }else{
                this.districtName =  city.long_name;
                this.stateName = region.long_name;
                this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
              }
             
              this.getFarmerCategoryList();
              this.getFarmersAppservices();

            } else {
              console.log("No results found");
            }
        // if (results[0]) {
        //   this.zoom = 12;

        //   this.address = results[0].formatted_address;
        //   if(this.stateName && this.districtName){
        //     this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
        //   }else{
        //     this.districtName =  results[0].address_components[4].long_name;
        //     this.stateName = results[0].address_components[6].long_name;
        //     this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
        //   }
        //   //console.log('add', this.address);
        //   this.getFarmerCategoryList();
        //   this.getFarmersAppservices();
        // } else {
        //   window.alert('No results found');
        // }
      } else {
        console.log('Geocoder failed due to: ' + status);
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
    this.categoryService.getFarmerAppServices(this.districtName, this.stateName).subscribe((res: any) => {
      if(res.Status){
        //console.log('res', res);
        // sessionStorage.setItem('stateId', res.Location[0].StateId);
        sessionStorage.setItem('haryanaDistrictId', res.Location[0].DistrictId);
        this.commonService.sendDistrictMessage({stateId: res.Location[0].StateId, districtId: res.Location[0].DistrictId});
      }
    })
  }

  getFarmerCategoryList(){
    this.categoryService.getFarmerCategoryList(this.districtName, this.stateName).subscribe((res: any) => {
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
    this.commonService.sendManualLocationMessage({state: this.stateName, district: this.districtName});
    this.commonService.sendDistrictMessage({stateId: this.stateId, districtId: this.districtId});
    this.commonService.sendLocationMessage({state: this.stateName, district: this.districtName});
    // const state = sessionStorage.getItem('state');
    // const district = sessionStorage.getItem('district');
    sessionStorage.setItem('district', this.districtName);
    sessionStorage.setItem('districtId', this.districtId);
    sessionStorage.setItem('state', this.stateName);
    this.getFarmerCategoryList();
    this.getFarmersAppservices();
    // sessionStorage.setItem('isManualLocation', 'true');
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
        sessionStorage.setItem('farmerAdd', res[0].Address);
        sessionStorage.setItem('BlockName', res[0].BlockName);
        sessionStorage.setItem('DistrictName', res[0].DistrictName);
        sessionStorage.setItem('NearByVillage', res[0].NearByVillage);
        sessionStorage.setItem('VillageName', res[0].VillageName);
        sessionStorage.setItem('Address', res[0].Address);
        sessionStorage.setItem('farmerMob', phoneNo)
        sessionStorage.setItem('loginStatus', 'true');
        //this.commonService.sendLoginMessage({isLogin:true, farmerId: res[0].FarmerID, farmerName: res[0].FirstName, farmerMob: phoneNo})
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
    sessionStorage.removeItem('BlockName');
      sessionStorage.removeItem('DistrictName');
        sessionStorage.removeItem('NearByVillage');
        sessionStorage.removeItem('VillageName');
    this.commonService.sendLoginMessage({isLogin:false, farmerId: null, farmerName: null, farmerMob: null})
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
    this.router.navigate(['/']);
    this.categoryWrapperMobile = false;
  }
}
