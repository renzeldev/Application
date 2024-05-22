import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCapabilitiesComponent } from './search-capabilities.component';

describe('SearchCapabilitiesComponent', () => {
  let component: SearchCapabilitiesComponent;
  let fixture: ComponentFixture<SearchCapabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCapabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCapabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
