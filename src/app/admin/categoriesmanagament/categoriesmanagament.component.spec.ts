import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesmanagamentComponent } from './categoriesmanagament.component';

describe('CategoriesmanagamentComponent', () => {
  let component: CategoriesmanagamentComponent;
  let fixture: ComponentFixture<CategoriesmanagamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesmanagamentComponent]
    });
    fixture = TestBed.createComponent(CategoriesmanagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
