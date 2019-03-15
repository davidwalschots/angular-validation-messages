import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValMessageComponent } from './val-message.component';
import { Component, ViewChild } from '@angular/core';

describe('ValMessageComponent', () => {
  @Component({
    template: `
      <val-message #withoutDefault></val-message>
      <val-message #withDefaultWithoutValue default></val-message>
      <val-message #withDefaultWithFalseValueAsString default="false"></val-message>
      <val-message #withDefaultWithFalseValueAsBoolean [default]="false"></val-message>
      <val-message #withDefaultWithTrueValueAsString default="true"></val-message>
      <val-message #withDefaultWithTrueValueAsBoolean [default]="true"></val-message>
      <val-message #withDefaultWithSomeValue default="bladiebla"></val-message>
    `
  })
  class TestHostComponent {
    @ViewChild('withoutDefault') withoutDefault: ValMessageComponent;
    @ViewChild('withDefaultWithoutValue') withDefaultWithoutValue: ValMessageComponent;
    @ViewChild('withDefaultWithFalseValueAsString') withDefaultWithFalseValueAsString: ValMessageComponent;
    @ViewChild('withDefaultWithFalseValueAsBoolean') withDefaultWithFalseValueAsBoolean: ValMessageComponent;
    @ViewChild('withDefaultWithTrueValueAsString') withDefaultWithTrueValueAsString: ValMessageComponent;
    @ViewChild('withDefaultWithTrueValueAsBoolean') withDefaultWithTrueValueAsBoolean: ValMessageComponent;
    @ViewChild('withDefaultWithSomeValue') withDefaultWithSomeValue: ValMessageComponent;
  }

  let component: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, ValMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`has a 'default' property, which when`, () => {
    it('not declared, makes the component not default', () => {
      expect(component.withoutDefault.default).toEqual(false);
    });

    it(`declared with the value 'false', makes the component not default`, () => {
      expect(component.withDefaultWithFalseValueAsBoolean.default).toEqual(false);
      expect(component.withDefaultWithFalseValueAsString.default).toEqual(false);
    });

    it('declared without a value, makes the component default', () => {
      expect(component.withDefaultWithoutValue.default).toEqual(true);
    });

    it(`declared with any value but 'false', makes the component default`, () => {
      expect(component.withDefaultWithTrueValueAsBoolean.default).toEqual(true);
      expect(component.withDefaultWithTrueValueAsString.default).toEqual(true);
      expect(component.withDefaultWithSomeValue.default).toEqual(true);
    });
  });
});
