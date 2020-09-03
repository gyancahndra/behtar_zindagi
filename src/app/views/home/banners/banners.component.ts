import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  @Input() banners = [];
  bannersList: any = [];

  slideConfig = {autoplay: true, slidesToShow: 2, slidesToScroll: 1,  dots: false, autoplaySpeed: 4000,
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
  state;
  district;
  districtId;
  constructor(private homeService: HomeService, private commonService: CommonService, private categoryService: CategoryService,  public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
   
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    this.districtId = sessionStorage.getItem('haryanaDistrictId');
    if(state && district){
      this.getBannersData(district, state);
    }else{
       this.commonService.getLocationMessage().subscribe((res: any) => {
        if(res){
          this.state = res.state;
          this.district = res.district;
          this.getBannersData(this.district, this.state);
        }
      })
    }
    
  }

 

  getBannersData(district, state){
    this.homeService.getBannersLists(district, state).subscribe((res: any) => {
      if(res.Status){
        this.bannersList = res.BZAppBanner.BZProductBanner;
      }
      
    
    }, err => {
      console.log(err);
    })
  }

  goToCategory(catId){
    console.log('catId', catId);
    if(catId){
      this.router.navigate(['/bz/banner-products', catId]);
    }else{
      alert('Data not available'); 
    }
    // this.categoryService.getHaryanCategoryProducts(catId, this.districtId).subscribe((res: any) => {
    //   console.log('ress', res);
    //   if(res.Status){
    //     this.router.navigate(['/bz/banner-products', catId]);
    //   }else{
    //     // this.dialog.open(DialogComponent, {
    //     //   data:  'Data not available'
    //     // });
    //     alert('Data not available');
    //   }
    // })
  }

}
