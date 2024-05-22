import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategoryItemComponent } from './filter-category-item.component';

describe('FilterCategoryItemComponent', () => {
  let component: FilterCategoryItemComponent;
  let fixture: ComponentFixture<FilterCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
