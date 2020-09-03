import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  farmerCategoryList: any = [];
  constructor(private categoryService: CategoryService, public router: Router, ) { }

  ngOnInit(): void {
    //this.getFarmerCategoryList();
  }

  // getFarmerCategoryList(){
  //   this.categoryService.getFarmerCategoryList().subscribe((res: any) => {
  //     if(res.Status){
  //       this.farmerCategoryList = res.Category.Category;
  //     }
     
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  goToSubcategory(id, kgp){
    //console.log('id', id);
    sessionStorage.setItem('kgpStatus', kgp);
    this.router.navigate(['/bz/category', id]);
  }

}
