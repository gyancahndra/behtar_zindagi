import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  @Input() topBrands: any;
  slideConfig2 = {
    autoplay: true, 
    slidesToShow: 5, 
    slidesToScroll: 1,  
    dots: false, 
    autoplaySpeed: 2000,
    nextArrow: `<div class="next" style=" position: absolute; top: -69px;
    left: auto;
    right: 35px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-left slick-arrow slider-next"></i></div>`,
    prevArrow: `<div class="prev"  style=" position: absolute; top: -69px;
    left: auto;
    right: 0px;
    font-size: 12px;
    background: #f36523;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;"><i class="fa fa-arrow-right slick-arrow slider-prev"></i></div>`,
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
          slidesToShow: 2
        }
      }
    ]
  };
  constructor(private homeService: HomeService, public router: Router,) { }

  ngOnInit(): void {
   
  }

  goToBrandsProduct(id){
    console.log('id', id);
    this.router.navigate(['/bz/brand-products', id])
  }

}
