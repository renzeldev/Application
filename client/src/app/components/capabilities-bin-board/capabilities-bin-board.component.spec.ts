import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesBoardComponent } from './capabilities-board.component';

describe('CapabilitiesBoardComponent', () => {
  let component: CapabilitiesBoardComponent;
  let fixture: ComponentFixture<CapabilitiesBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilitiesBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
