import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ClickOutsideDirective, MultiSelectComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
