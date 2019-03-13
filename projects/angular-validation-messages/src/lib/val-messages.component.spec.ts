import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValMessagesComponent } from './val-messages.component';

describe('AngularValidationMessagesComponent', () => {
  let component: ValMessagesComponent;
  let fixture: ComponentFixture<ValMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
