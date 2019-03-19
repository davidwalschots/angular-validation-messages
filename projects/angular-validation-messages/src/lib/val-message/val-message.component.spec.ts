import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ValMessageComponent } from './val-message.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ValMessageComponent', () => {
  describe(`has a 'default' property, which when`, () => {
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

  describe('', () => {
    let component: ValMessageComponent;
    let fixture: ComponentFixture<ValMessageComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ValMessageComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ValMessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`shows itself when the 'show' property is true`, () => {
      component.show = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.val-message'))).not.toBeNull();
    });

    it(`hides itself when the 'show' property is false`, () => {
      component.show = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.val-message'))).toBeNull();
    });

    describe(`canShow`, () => {
      it(`returns true when there is an error with a key equal to the 'for' attribute`, () => {
        component.for = 'required';

        expect(component.canShow({ minlength: true, required: true })).toEqual(true);
      });

      it(`returns true when it is a 'default' component`, () => {
        component.default = true;

        expect(component.canShow({ minlength: true, required: true })).toEqual(true);
      });

      it(`returns false when there is no key equal to the 'for' attribute, and it isn't default`, () => {
        component.default = false;
        component.for = 'maxlength';

        expect(component.canShow({ minlength: true, required: true })).toEqual(false);
      });
    });
  });
});
