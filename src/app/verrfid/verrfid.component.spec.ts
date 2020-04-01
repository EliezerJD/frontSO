import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerrfidComponent } from './verrfid.component';

describe('VerrfidComponent', () => {
  let component: VerrfidComponent;
  let fixture: ComponentFixture<VerrfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerrfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerrfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
