import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarasistenciaComponent } from './asignarasistencia.component';

describe('AsignarasistenciaComponent', () => {
  let component: AsignarasistenciaComponent;
  let fixture: ComponentFixture<AsignarasistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarasistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarasistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
