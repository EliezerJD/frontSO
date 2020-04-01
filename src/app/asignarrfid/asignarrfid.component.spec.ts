import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarrfidComponent } from './asignarrfid.component';

describe('AsignarrfidComponent', () => {
  let component: AsignarrfidComponent;
  let fixture: ComponentFixture<AsignarrfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarrfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarrfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
