import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityPanelComponent } from './capability-panel.component';

describe('CapabilityPanelComponent', () => {
  let component: CapabilityPanelComponent;
  let fixture: ComponentFixture<CapabilityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
