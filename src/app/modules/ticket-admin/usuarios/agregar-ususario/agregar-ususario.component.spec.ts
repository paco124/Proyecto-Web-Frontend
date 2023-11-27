import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsusarioComponent } from './agregar-ususario.component';

describe('AgregarUsusarioComponent', () => {
  let component: AgregarUsusarioComponent;
  let fixture: ComponentFixture<AgregarUsusarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarUsusarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarUsusarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
