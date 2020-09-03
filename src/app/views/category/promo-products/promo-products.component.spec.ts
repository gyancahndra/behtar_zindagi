import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductsComponent } from './promo-products.component';

describe('PromoProductsComponent', () => {
  let component: PromoProductsComponent;
  let fixture: ComponentFixture<PromoProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
