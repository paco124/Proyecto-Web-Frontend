import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDatosComponent } from './crud-datos.component';

describe('CrudDatosComponent', () => {
  let component: CrudDatosComponent;
  let fixture: ComponentFixture<CrudDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
