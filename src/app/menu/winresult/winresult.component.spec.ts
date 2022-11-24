import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinresultComponent } from './winresult.component';

describe('WinresultComponent', () => {
  let component: WinresultComponent;
  let fixture: ComponentFixture<WinresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
