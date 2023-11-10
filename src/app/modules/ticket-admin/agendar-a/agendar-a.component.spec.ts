import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarAComponent } from './agendar-a.component';

describe('AgendarAComponent', () => {
  let component: AgendarAComponent;
  let fixture: ComponentFixture<AgendarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
