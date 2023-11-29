import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNivelesComponent } from './crud-niveles.component';

describe('CrudNivelesComponent', () => {
  let component: CrudNivelesComponent;
  let fixture: ComponentFixture<CrudNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudNivelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
