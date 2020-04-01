import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrfidComponent } from './addrfid.component';

describe('AddrfidComponent', () => {
  let component: AddrfidComponent;
  let fixture: ComponentFixture<AddrfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
