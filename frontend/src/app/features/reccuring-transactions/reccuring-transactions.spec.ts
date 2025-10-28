import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccuringTransactions } from './reccuring-transactions';

describe('ReccuringTransactions', () => {
  let component: ReccuringTransactions;
  let fixture: ComponentFixture<ReccuringTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReccuringTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReccuringTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
