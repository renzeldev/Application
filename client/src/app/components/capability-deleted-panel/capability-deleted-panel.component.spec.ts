import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityDeletedPanelComponent } from './capability-deleted-panel.component';

describe('CapabilityDeletedPanelComponent', () => {
  let component: CapabilityDeletedPanelComponent;
  let fixture: ComponentFixture<CapabilityDeletedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityDeletedPanelComponent,
      CapabilityDeletedPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityDeletedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
