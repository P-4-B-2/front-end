import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchLocationComponent } from './bench-location.component';

describe('BenchLocationComponent', () => {
  let component: BenchLocationComponent;
  let fixture: ComponentFixture<BenchLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenchLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
