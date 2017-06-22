import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Piple2Component } from './piple2.component';

describe('Piple2Component', () => {
  let component: Piple2Component;
  let fixture: ComponentFixture<Piple2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Piple2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Piple2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
