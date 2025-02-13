import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorConnectionComponent } from './monitor-connection.component';

describe('MonitorConnectionComponent', () => {
  let component: MonitorConnectionComponent;
  let fixture: ComponentFixture<MonitorConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
