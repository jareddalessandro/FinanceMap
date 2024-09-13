import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceMapComponent } from './finance-map.component';

describe('FinanceMapComponent', () => {
  let component: FinanceMapComponent;
  let fixture: ComponentFixture<FinanceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
