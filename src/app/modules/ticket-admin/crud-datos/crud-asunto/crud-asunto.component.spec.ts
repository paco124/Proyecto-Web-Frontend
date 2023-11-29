import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAsuntoComponent } from './crud-asunto.component';

describe('CrudAsuntoComponent', () => {
  let component: CrudAsuntoComponent;
  let fixture: ComponentFixture<CrudAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAsuntoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
