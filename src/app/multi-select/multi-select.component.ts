import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.less']
})
export class MultiSelectComponent implements OnInit {
  @Input() itemsFormArray: FormArray;

  /**
   * The list of options to be selected.
   */
  @Input() options: Option[];

  /**
   * The list of options that have been selected.
   */
  @Input() values: string[] = [];

  @Input() label: string = null;

  /**
   * The event carrying the updated values.
   */
  @Output() valueChanges = new EventEmitter<string[]>();

  public isOptionsVisible = false;
  formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    //  console.log(this.itemsFormArray);
    // this.values = this.values.concat(this.itemsFormArray.value);
    // Emit the initial values to the host:
    this.valueChanges.emit(this.itemsFormArray.value.map(item => item.name));
  }

  /**
   * Add a given option to the values.
   * @param option The option to add to the list of values.
   */
  public select(option: Option): void {
    if (!this.values.includes(option.value)) {
      this.values.push(option.value);
    }

    this.valueChanges.emit(this.values);
  }

  /**
   * Toggle an option as selected or not selected.
   * @param option The option to toggle its selection.
   */
  public toggleSelect(option: Option): void {
    if (!this.values.includes(option.value)) {
      this.values.push(option.value);
    } else {
      this.deselect(option.value);
    }

    this.valueChanges.emit(this.values);
  }

  public toggleSelect2(option: Option) {
    const itemForm = this.formBuilder.group({
      name: this.formBuilder.control(option.value, [])
    });
    (this.itemsFormArray as FormArray).push(itemForm);
    console.log(
      this.itemsFormArray.controls,
      this.itemsFormArray.controls[0].value.name
    );

    // if (!this.itemsFormArray.controls.includes(option.value)) {

    //   const itemForm = this.formBuilder.group({
    //     name: this.formBuilder.control(option.value, [])
    //   });

    //   (<FormArray>this.itemsFormArray).push(itemForm);
    // } else {

    // }
  }

  public isChecked(value): string {
    // console.log('isCheked', value, !!this.itemsFormArray.value.filter(x => x.name === value)[0]);
    return !!this.itemsFormArray.value.filter(x => x.name === value)[0]
      ? 'csm-selector-selected'
      : 'csm-selector-unselected';
  }

  /**
   * Remove a given selection from the list of values.
   * @param selection The selection to remove from values.
   */
  public deselect(index): void {
    this.itemsFormArray.removeAt(index);
    this.valueChanges.emit(this.values);
  }

  actionItem(value: string) {
    if (!!this.itemsFormArray.value.filter(x => x.name === value)[0]) {
      const index = this.removeItem(value);
      console.log(index);
      this.itemsFormArray.removeAt(index);
    } else {
      const itemFormGroup = this.formBuilder.group({
        name: this.formBuilder.control(value, [])
      });
      this.itemsFormArray.push(itemFormGroup);
    }

    // Emit the updated value to the parent host.
    const updatedValue = this.itemsFormArray.value.map(item => {
      return item.name;
    });
    this.valueChanges.emit(updatedValue);
    // (<FormArray>this.elementsFormGroup.controls.cebSelectMultiple).push(cebSelectMultiple);
  }

  removeItem(value: string): number {
    let i = 0;
    let holdI: number;
    this.itemsFormArray.controls.forEach((item: FormGroup) => {
      const itemControl = item.controls;
      if (itemControl.name.value === value) {
        holdI = i;
      }
      i++;
    });
    return holdI;
  }

  public toggleOptions(): void {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

  public showOptions(): void {
    this.isOptionsVisible = true;
  }

  public hideOptions(): void {
    this.isOptionsVisible = false;
  }
}

interface Option {
  value: string;
  text: string;
}
