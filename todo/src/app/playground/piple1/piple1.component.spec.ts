import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Piple1Component } from './piple1.component';

describe('Piple1Component', () => {
  let component: Piple1Component;
  let fixture: ComponentFixture<Piple1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Piple1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Piple1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
