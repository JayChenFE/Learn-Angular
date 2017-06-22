import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInPiplesComponent } from './build-in-piples.component';

describe('BuildInPiplesComponent', () => {
  let component: BuildInPiplesComponent;
  let fixture: ComponentFixture<BuildInPiplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildInPiplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildInPiplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
