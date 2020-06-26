import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahnComponent } from './bahn.component';

describe('BahnComponent', () => {
  let component: BahnComponent;
  let fixture: ComponentFixture<BahnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
