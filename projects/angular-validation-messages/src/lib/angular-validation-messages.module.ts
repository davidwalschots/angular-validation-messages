import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValMessagesComponent } from './val-messages/val-messages.component';
import { ValMessageComponent } from './val-message/val-message.component';
import { AngularValidationMessagesModuleConfiguration } from './angular-validation-messages-module-configuration';
import { AngularValidationMessagesModuleConfigurationToken } from './angular-validation-messages-module-configuration-token';
import { CommonModule } from '@angular/common';
import { AngularValidationSupportModule } from 'angular-validation-support';

@NgModule({
  declarations: [
    ValMessagesComponent,
    ValMessageComponent
  ],
  imports: [
    CommonModule,
    AngularValidationSupportModule
  ],
  exports: [
    ValMessagesComponent,
    ValMessageComponent,
    AngularValidationSupportModule
  ]
})
export class AngularValidationMessagesModule {
  static forRoot(configuration?: AngularValidationMessagesModuleConfiguration): ModuleWithProviders {
    return {
      ngModule: AngularValidationMessagesModule,
      providers: [{
        provide: AngularValidationMessagesModuleConfigurationToken, useValue: configuration
      }]
    };
  }
}
