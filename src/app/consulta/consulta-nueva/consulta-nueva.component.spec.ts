import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNuevaComponent } from './consulta-nueva.component';

describe('ConsultaNuevaComponent', () => {
  let component: ConsultaNuevaComponent;
  let fixture: ComponentFixture<ConsultaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
