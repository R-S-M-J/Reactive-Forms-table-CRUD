import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.css']
})
export class AutomobileComponent {
  vehno: string = "";
  owno: string = "";
  dat: string = "";
  @Output() btnClick = new EventEmitter();
  submitted = false;
  countries: string[] = ['INDIA', 'UNITED STATES', 'FRANCE', 'ITALY'];
  states: string[] = ['MAHARASTRA', 'KERALA', 'MANIPUR', 'GOA'];
  cities: string[] = ['DELHI', 'WASHINGTON DC', 'PARIS', 'ROME'];
  countryName:string='';


  vehicleForm= this.fb.group({
    // vehno: ['', Validators.required],
    // owno: ['', Validators.required],
    // dat: ['', Validators.required],
    countryName: ['', Validators.required], 
    states: ['', Validators.required],
    cities: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {

  }

  onSubmit() {
    this.submitted = true;
    this.btnClick.emit();
    console.log(this.vehicleForm.value);
  }
}
