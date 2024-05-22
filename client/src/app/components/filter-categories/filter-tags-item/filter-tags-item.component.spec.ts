import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTagsItemComponent } from './filter-tags-item.component';

describe('FilterTagsItemComponent', () => {
  let component: FilterTagsItemComponent;
  let fixture: ComponentFixture<FilterTagsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTagsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTagsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
