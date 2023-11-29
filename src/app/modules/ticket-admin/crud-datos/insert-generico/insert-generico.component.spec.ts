import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGenericoComponent } from './insert-generico.component';

describe('InsertGenericoComponent', () => {
  let component: InsertGenericoComponent;
  let fixture: ComponentFixture<InsertGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertGenericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
