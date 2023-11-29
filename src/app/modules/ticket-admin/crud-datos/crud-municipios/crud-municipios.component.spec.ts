import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMunicipiosComponent } from './crud-municipios.component';

describe('CrudMunicipiosComponent', () => {
  let component: CrudMunicipiosComponent;
  let fixture: ComponentFixture<CrudMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMunicipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
