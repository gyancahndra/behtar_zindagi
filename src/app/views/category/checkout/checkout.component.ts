import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  //FarmerName, Mobile, DistrictId, StateId
  productId;
  districtId;
  dealerDetails: any = [];
  productDetails: any = [];
  desc: any = [];
  productAvailability: boolean = true;
  dealersAvailability: boolean = true;
  dealersMessage: string;
  globalBuyWrapper: boolean = true;
  quantity = [1,2,3,4,5,6,7,8,9,10];
  quantityValue;
  totalQuantity;
  totalAmount;
  farmerId;
  farmerName;
  farmerMob;
  farmerDistrictId;
  farmerStateId;
  address;
  addressWrapper: boolean = false;
  addressValue;
  locationForm: FormGroup;
  stateList: any = [];
  districtList: any = [];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _location: Location,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.productId = res.productId;
      const districtId = sessionStorage.getItem('districtId') || 0;
      const lat = sessionStorage.getItem('lat') || 0;
      const lon = sessionStorage.getItem('long') || 0;
      this.farmerId = sessionStorage.getItem('FarmerId') || 0;
      this.farmerName = sessionStorage.getItem('FarmerName');
      this.farmerMob = sessionStorage.getItem('farmerMob');
      this.farmerDistrictId = sessionStorage.getItem('haryanaDistrictId');
      this.farmerStateId = sessionStorage.getItem('stateId');
      this.address = sessionStorage.getItem('farmerAdd');
      if(this.address){
        this.addressValue = this.address;
      }
      if (this.farmerId) {
        this.getProductDetailWithFarmerId(this.productId, districtId, this.farmerId, lat, lon);
      }
      else {
        this.dialog.open(DialogComponent, {
          data: 'Please Login First'
        });
      }
      //this.getProductDetailWithFarmerId(this.productId, districtId, this.farmerId, lat, lon);

    })

    this.createAddUserForm();
    this.setPreFormData();
  }

  createAddUserForm() {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mob: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      subDistrict: ['', Validators.required],
      village: ['', Validators.required],
      neighbourVillage: ['', Validators.required],
      full_address: ['', Validators.required]
    })
  }

  setPreFormData(){
    this.locationForm.patchValue({
      name: sessionStorage.getItem('FarmerName'),
      email: sessionStorage.getItem('email'),
      mob: sessionStorage.getItem('farmerMob'),
      state: sessionStorage.getItem('FarmerName'),
      district:sessionStorage.getItem('DistrictName'),
      subDistrict: sessionStorage.getItem('BlockName'),
      village: sessionStorage.getItem('VillageName'),
      neighbourVillage: sessionStorage.getItem('NearByVillage'),
      full_address: sessionStorage.getItem('farmerAdd')
    })
  }
  addState(event){

  }
  addDistrict(event){

  }
  subDistrict(event){

  }
  village(event){

  }

  getProductDetailWithFarmerId(ProductId, Districtid, FarmerId, lat, lon) {
    this.categoryService.getProductDetailsWithFarmerId(ProductId, Districtid, FarmerId, lat, lon).subscribe((res: any) => {
      if (res.Status) {
        if (res.BZApiReponse) {
          this.productDetails = JSON.parse(JSON.stringify(res.BZApiReponse.ProductDetails || null));
          this.totalQuantity = this.productDetails[0].Quantity;
          this.totalAmount = this.productDetails[0].OnlinePrice;
          //console.log('product', this.productDetails);
        }
      }
    }, err => {
      console.log(err);
    })
  }

  selectedValue(value){
    this.quantityValue = value;
    this.totalAmount = this.totalAmount * this.quantityValue;
    this.totalQuantity = this.quantityValue;
  }

  checkout() {
   
    if(this.addressValue){
      this.checkoutService.checkout(this.farmerId, this.productDetails[0].PackageID, this.totalQuantity, this.productDetails[0].RecordID, this.farmerName, this.farmerMob, this.addressValue, this.farmerDistrictId, this.farmerStateId).subscribe((res: any) => {
        if(res.Status == 2){
          this.dialog.open(DialogComponent, {
            data: 'Your order created successfully'
          });
          this.router.navigate(['/']);
        }
       
      })
    }else{
      this.dialog.open(DialogComponent, {
        data: 'Please enter full address'
      });
    }
    
  }

  goToBack(){
    this._location.back();
  }

}
