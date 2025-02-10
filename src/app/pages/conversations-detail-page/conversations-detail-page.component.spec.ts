import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsDetailPageComponent } from './conversations-detail-page.component';

describe('ConversationsDetailPageComponent', () => {
  let component: ConversationsDetailPageComponent;
  let fixture: ComponentFixture<ConversationsDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationsDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
