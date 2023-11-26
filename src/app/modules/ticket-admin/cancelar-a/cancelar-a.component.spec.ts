import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarAComponent } from './cancelar-a.component';

describe('CancelarAComponent', () => {
  let component: CancelarAComponent;
  let fixture: ComponentFixture<CancelarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
