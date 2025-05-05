import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUptComponent } from './sign-upt.component';

describe('SignUptComponent', () => {
  let component: SignUptComponent;
  let fixture: ComponentFixture<SignUptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
