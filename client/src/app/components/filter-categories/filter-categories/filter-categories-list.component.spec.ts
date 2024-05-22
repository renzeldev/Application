import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategoriesListComponent } from './filter-categories-list.component';

describe('FilterCategoriesListComponent', () => {
  let component: FilterCategoriesListComponent;
  let fixture: ComponentFixture<FilterCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
