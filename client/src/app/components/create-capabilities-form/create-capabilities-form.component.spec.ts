import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCapabilitiesFormComponent } from './create-capabilities-form.component';

describe('CreateCapabilitiesFormComponent', () => {
  let component: CreateCapabilitiesFormComponent;
  let fixture: ComponentFixture<CreateCapabilitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCapabilitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCapabilitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
