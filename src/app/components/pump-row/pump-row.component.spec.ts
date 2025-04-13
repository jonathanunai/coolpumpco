import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpRowComponent } from './pump-row.component';

describe('PumpRowComponent', () => {
  let component: PumpRowComponent;
  let fixture: ComponentFixture<PumpRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PumpRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
