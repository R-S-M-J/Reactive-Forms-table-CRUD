import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title: string='SignUp Page';
  mailid: string = "";
  pass: string = "";
  @Output() btnClick = new EventEmitter();
  submitted = false;

  signupForm = this.fb.group({
    fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    date: ['', [Validators.required]],
    mailid: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    pass: ['', [Validators.minLength(8), Validators.pattern('^(?=.*[@])(?=.*[A-Z]).*$'), Validators.required]],
    cpass: ['', [Validators.minLength(8), Validators.pattern('^(?=.*[@])(?=.*[A-Z]).*$'), Validators.required]],
  });

  ngOnInit() {
    // this.httpService.getDataa().subscribe(data=>{console.log(data);})
  }

  constructor(private fb: FormBuilder) { }


  onSubmit() {
    this.btnClick.emit(); {
      console.log(this.signupForm.value);
    }
    if (!this.mailid || !/^[a-zA-Z]+$/.test(this.mailid)) {
      alert('please add your first name containing only alphabets');
      return;
    }
    if (!this.pass || !/^(?=.*[@])(?=.*[A-Z])[a-zA-Z@]{8,}$/.test(this.pass)) {
      alert('Enter password that should be at least 8 characters long, one @ symbol and one CAPITAL letter');
      return;
    }
    // this.httpService.getData(this.signupForm.value).subscribe(data => { console.log(data); })
  }
}
