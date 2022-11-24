import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoseresultComponent } from './loseresult.component';

describe('LoseresultComponent', () => {
  let component: LoseresultComponent;
  let fixture: ComponentFixture<LoseresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoseresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoseresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
