import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3JSChartComponent } from './d3-jschart.component';

describe('D3JSChartComponent', () => {
  let component: D3JSChartComponent;
  let fixture: ComponentFixture<D3JSChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3JSChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3JSChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
