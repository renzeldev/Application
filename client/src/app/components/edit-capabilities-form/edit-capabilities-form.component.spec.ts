import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCapabilitiesFormComponent } from './edit-capabilities-form.component';

describe('EditCapabilitiesFormComponent', () => {
  let component: EditCapabilitiesFormComponent;
  let fixture: ComponentFixture<EditCapabilitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCapabilitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCapabilitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
