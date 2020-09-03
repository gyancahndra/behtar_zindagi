import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesList: any = [];
  productsList: any = [];
  brandsList: any = [];
  district;
  state;
  constructor(private fb: FormBuilder, private commonService: CommonService, private homeService: HomeService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.commonService.getLocationMessage().subscribe((res: any) => {
      if(res){
        this.state = res.state;
        this.district = res.district;
       
      }
    })
    this.getTopListBrands();
  }

 
  getTopListBrands(){
    this.homeService.getTopBrands().subscribe((res: any) => {
      if(res.Status){
        this.brandsList = res.BZBrands.BZActiveBrands;
      }
    }, err => {
      console.log(err);
    })
  }

}
