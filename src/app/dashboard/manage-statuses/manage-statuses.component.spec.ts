import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageStatusesComponent} from './manage-statuses.component';

describe('ManageStatusesComponent', () => {
  let component: ManageStatusesComponent;
  let fixture: ComponentFixture<ManageStatusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStatusesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
