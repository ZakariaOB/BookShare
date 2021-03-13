import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadDemoComponent } from './typeahead-demo.component';

describe('TypeaheadDemoComponent', () => {
  let component: TypeaheadDemoComponent;
  let fixture: ComponentFixture<TypeaheadDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeaheadDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
