import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestServicePage } from './request-service-page';

describe('RequestServicePage', () => {
  let component: RequestServicePage;
  let fixture: ComponentFixture<RequestServicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestServicePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestServicePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
