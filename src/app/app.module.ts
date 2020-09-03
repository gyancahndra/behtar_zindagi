import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialComponentsModule } from './views/material.module';
// Component
import { AppComponent } from './app.component';
import { LayoutComponent } from './views/layout/layout.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HeaderComponent  } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { BannersComponent } from './views/home/banners/banners.component';
// Modules component
import { HomeModule } from './views/home/home.module';
import { SharedModule } from './views/shared/shared.module';
import { CategoryModule } from './views/category/category.module';
import { AuthInterceptor } from './services/auth-interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoaderComponent } from './views/common/loader/loader.component';
import { LoaderInterceptor  } from './services/loader-interceptor.service';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './views/about/about.component';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent  } from './views/home-layout/home-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BannersComponent,
    LoaderComponent,
    AboutComponent,
    HomeLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialComponentsModule,
    HomeModule,
    SharedModule,
    CategoryModule,
    SlickCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgGdczxA0wa7WGNd1pjJ28Lw01a9aqNfY',
      libraries: ['places']
    }),
    RouterModule
  ],
  providers: [
    //{provide: LocationStrategy, useClass: PathLocationStrategy},
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
  //entryComponents: [],
})
export class AppModule { }
