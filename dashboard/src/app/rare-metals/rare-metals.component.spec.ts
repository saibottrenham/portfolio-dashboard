import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RareMetalsComponent } from './rare-metals.component';

describe('RareMetalsComponent', () => {
  let component: RareMetalsComponent;
  let fixture: ComponentFixture<RareMetalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RareMetalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RareMetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
