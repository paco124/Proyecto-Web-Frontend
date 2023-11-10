import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAComponent } from './consultar-a.component';

describe('ConsultarAComponent', () => {
  let component: ConsultarAComponent;
  let fixture: ComponentFixture<ConsultarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
