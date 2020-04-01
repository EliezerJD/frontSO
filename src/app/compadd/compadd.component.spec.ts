import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaddComponent } from './compadd.component';

describe('CompaddComponent', () => {
  let component: CompaddComponent;
  let fixture: ComponentFixture<CompaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
