import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { nameData } from '../../nameData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mailid: string = "";
  pass: string = "";
  title: string = 'Login Page';
  @Output() btnClick = new EventEmitter();
  submitted = false;

  loginForm = this.fb.group({
    mailid: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    pass: ['', [Validators.minLength(8), Validators.pattern('^(?=.*[@])(?=.*[A-Z]).*$'), Validators.required]],
  });

  dataService: DataService[] = [];

  ngOnInit() {
    // this.httpService.getDataa().subscribe(data=>{console.log(data);})
  }

  constructor(private fb: FormBuilder, private httpService: DataService) { }


  onSubmit() {
    this.btnClick.emit(); {
      console.log(this.loginForm.value);
    }
    if (!this.mailid || !/^[a-zA-Z]+$/.test(this.mailid)) {
      alert('please add your first name containing only alphabets');
      return;
    }
    if (!this.pass || !/^(?=.*[@])(?=.*[A-Z])[a-zA-Z@]{8,}$/.test(this.pass)) {
      alert('Enter password that should be at least 8 characters long, one @ symbol and one CAPITAL letter');
      return;
    }
    this.httpService.getData(this.loginForm.value).subscribe(data => { console.log(data); })
  }

}

  // to disable submit button if firm not valid. add this to html
  // [disabled]="!loginForm.valid"
