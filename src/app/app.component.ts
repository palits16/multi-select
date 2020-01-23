import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public selectMultipleValues = ['apple', 'orange', 'banana'];
  title = 'dev';
  elementsFormGroup: FormGroup;
  public selections: string[];
  selectOptions = [
    {
      value: 'apple',
      text: 'Apple',
    },
    {
      value: 'orange',
      text: 'Orange',
    },
    {
      value: 'banana',
      text: 'Banana',
    },
  ];
  formBuilder: FormBuilder;
  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.elementsFormGroup = this.formBuilder.group({
      selectMultiple: this.formBuilder.array([], []),
    });
  }

  onSelectMultipleChanges(value: string[]): void {
    this.selections = value;
  }
}
