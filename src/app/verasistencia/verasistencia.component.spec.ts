import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerasistenciaComponent } from './verasistencia.component';

describe('VerasistenciaComponent', () => {
  let component: VerasistenciaComponent;
  let fixture: ComponentFixture<VerasistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerasistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerasistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
