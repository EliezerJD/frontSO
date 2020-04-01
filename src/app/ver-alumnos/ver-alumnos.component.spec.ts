import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosComponent } from './ver-alumnos.component';

describe('VerAlumnosComponent', () => {
  let component: VerAlumnosComponent;
  let fixture: ComponentFixture<VerAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
