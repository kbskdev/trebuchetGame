import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLevelComponent } from './main-level.component';

describe('MainLevelComponent', () => {
  let component: MainLevelComponent;
  let fixture: ComponentFixture<MainLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
