import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  //@Input() farmerCategoryList: any;
  farmerCategoryList: any = [];
  slideConfig = {autoplay: false, slidesToShow: 5, slidesToScroll: 5,  dots: false, autoplaySpeed: 4000,
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
  constructor( private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.getFarmerCategoryList();
  }

  // getFarmerCategoryList(){
  //   this.categoryService.getFarmerCategoryList().subscribe((res: any) => {
  //     if(res.Status){
  //       console.log(res);
  //       this.farmerCategoryList = res.Category.Category;
  //     }
      
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  goToSubcategory(id, kgp){
    console.log('kgp', kgp, 'id', id);
    sessionStorage.setItem('kgpStatus', kgp);
    this.router.navigate(['/bz/category', id]);
  }
  
}

