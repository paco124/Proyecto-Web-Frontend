import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEstatusComponent } from './crud-estatus.component';

describe('CrudEstatusComponent', () => {
  let component: CrudEstatusComponent;
  let fixture: ComponentFixture<CrudEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
