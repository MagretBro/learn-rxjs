import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderRxjsComponent } from './slider-rxjs.component';

describe('SliderRxjsComponent', () => {
  let component: SliderRxjsComponent;
  let fixture: ComponentFixture<SliderRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderRxjsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
