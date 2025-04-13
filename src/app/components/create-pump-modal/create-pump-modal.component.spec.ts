import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePumpModalComponent } from './create-pump-modal.component';

describe('CreatePumpModalComponent', () => {
  let component: CreatePumpModalComponent;
  let fixture: ComponentFixture<CreatePumpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePumpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePumpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
