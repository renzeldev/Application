import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesDeletedBoardComponent } from './capabilities-board.component';

describe('CapabilitiesDeletedBoardComponent', () => {
  let component: CapabilitiesDeletedBoardComponent;
  let fixture: ComponentFixture<CapabilitiesDeletedBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilitiesDeletedBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesDeletedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
