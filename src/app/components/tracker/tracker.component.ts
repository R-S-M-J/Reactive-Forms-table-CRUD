import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { VehicleService } from 'src/app/services/vehicle.service';

interface ApiResponse {
  title: string;
  vehicleData: any[];
}

interface vehicleD{
  id: number;
  ownerInfo: string; 
  date: string;
  phoneNo: string;
  vehicleNo: string;
  country: String;
  state: String;
  city: String;
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  trackerForm: FormGroup;
  editForm: FormGroup;

  vehicleService: VehicleService[] = [];

  ngOnInit() {
    this.connectToAPI();
  }

  rows: vehicleD[] = [];
  @Output() btnClick = new EventEmitter();
  idTracker = 1;
  submitted = false;
  showModal = false;
  showModalEdit = false;
  selectedRowIndex: number = -1;

  selectedRow: any = null;

  faPlus = faPlus;
  faPencil = faPencil;


  constructor(private fb: FormBuilder, private httpService: VehicleService, private http: HttpClient) {
    this.trackerForm = this.fb.group({
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      ownerInfo: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      vehicleNo: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      ownerInfo: ['', [Validators.required]],
      date: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      vehicleNo: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const newTask = {
      id: this.idTracker++,
      ownerInfo: this.trackerForm.value.ownerInfo,
      date: this.trackerForm.value.date,
      phoneNo: this.trackerForm.value.phoneNo,
      vehicleNo: this.trackerForm.value.vehicleNo,
      country: this.trackerForm.value.country,
      state: this.trackerForm.value.state,
      city: this.trackerForm.value.city
    };
    this.http.post('http://localhost:5000/vehicles/add', newTask).subscribe(
    (response) => {
      console.log(response);
      this.rows.splice(0, this.rows.length);    //delete all rows
      this.connectToAPI();                      //as this function adds all rows in sql table again
    },
    (error) => {
      console.error(error);
    }
  );
    this.toggleModal();
    this.trackerForm.reset();
  }

  onSubmitEdit() {
    console.log("selected row index: ", this.selectedRowIndex);
    const updatedTask = {
      id: this.selectedRowIndex,
      ownerInfo: this.editForm.value.ownerInfo,
      date: this.editForm.value.date,
      phoneNo: this.editForm.value.phoneNo,
      vehicleNo: this.editForm.value.vehicleNo,
      country: this.editForm.value.country,
      state: this.editForm.value.state,
      city: this.editForm.value.city
    };
    this.updateData(updatedTask);
    this.rows.splice(0, this.rows.length);
    this.connectToAPI();
    this.toggleModalEdit();
    this.selectedRowIndex = -1;
    this.editForm.reset();
  }

  editRow(index: number) {
    this.editForm.patchValue({
      country: this.rows[index].country,
      state: this.rows[index].state,
      city: this.rows[index].city,
      ownerInfo: this.rows[index].ownerInfo,
      phoneNo: this.rows[index].phoneNo,
      vehicleNo: this.rows[index].vehicleNo
    });
    this.selectedRowIndex = index+1;
    const selectedRow = this.rows[index];
    this.editForm.patchValue(selectedRow);
    this.toggleModalEdit();
    console.log('Editing row:', this.selectedRowIndex);
  }

  connectToAPI() {
    this.http.get<ApiResponse>('http://localhost:5000/vehicles/vehicle-list').subscribe(
      (response) => {
        console.log(response);

        const vehicleData = response.vehicleData;
        for (const item of vehicleData) {
          this.rows.push(item);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
updateData(updatedTask: any) {
  const vehicleId = this.selectedRowIndex; 

  this.http.put(`http://localhost:5000/vehicles/edit/${vehicleId}`, updatedTask).subscribe(
    (response) => {
      console.log(response);
      const index = this.rows.findIndex((task) => task.id === vehicleId);

      if (index > -1) {
        this.rows[index] = updatedTask;
      }
    },
    (error) => {
      console.error(error);
    }
  );
}

toggleModal() {
  this.showModal = !this.showModal;
}

toggleModalEdit() {
  this.showModalEdit = !this.showModalEdit;
}

  countryList = [
    {
      id: 1,
      label: 'India',
      states: [
        {
          id: 11,
          label: 'Maharashtra'
        },
        {
          id: 12,
          label: 'Kerala'
        },
        {
          id: 13,
          label: 'Arunachal Pradesh'
        }
      ]
    },
    {
      id: 2,
      label: 'United States',
      states: [
        {
          id: 21,
          label: 'California'
        },
        {
          id: 22,
          label: 'Texas'
        },
        {
          id: 23,
          label: 'Florida'
        }
      ]
    },
    {
      id: 3,
      label: 'France',
      states: [
        {
          id: 31,
          label: 'Alsace'
        },
        {
          id: 32,
          label: 'normandy'
        },
        {
          id: 33,
          label: 'Corsicia'
        }
      ]
    }
  ]

  stateList = [
    {
      id: 11,
      label: 'Maharashtra',
      cities: [
        {
          id: 111,
          label: 'Nagpur'
        },
        {
          id: 112,
          label: 'Pune'
        },
        {
          id: 113,
          label: 'Bhandara'
        },
        {
          id: 114,
          label: 'Ramtek'
        }
      ]
    },
    {
      id: 12,
      label: 'Kerala',
      cities: [
        {
          id: 121,
          label: 'Kannur'
        },
        {
          id: 122,
          label: 'Kochi'
        },
        {
          id: 123,
          label: 'Thiruvananthpuram'
        },
        {
          id: 124,
          label: 'Malappuram'
        }
      ]
    },
    {
      id: 13,
      label: 'Arunachal Pradesh',
      cities: [
        {
          id: 131,
          label: 'Seppa'
        },
        {
          id: 132,
          label: 'Wakro'
        },
        {
          id: 133,
          label: 'Rupa'
        },
        {
          id: 134,
          label: 'Zemithang'
        }
      ]
    },
    {
      id: 21,
      label: 'California',
      cities: [
        {
          id: 211,
          label: 'San Francisco'
        },
        {
          id: 212,
          label: 'San Diego'
        },
        {
          id: 213,
          label: 'Oakland'
        },
        {
          id: 213,
          label: 'Irvine'
        }
      ]
    },
    {
      id: 22,
      label: 'Texas',
      cities: [
        {
          id: 221,
          label: 'Houston'
        },
        {
          id: 222,
          label: 'Dallas'
        },
        {
          id: 223,
          label: 'Austin'
        },
        {
          id: 224,
          label: 'Arlington'
        }
      ]
    },
    {
      id: 23,
      label: 'Florida',
      cities: [
        {
          id: 231,
          label: 'Miami'
        },
        {
          id: 232,
          label: 'Naples'
        },
        {
          id: 233,
          label: 'Orlando'
        },
        {
          id: 234,
          label: 'Destin'
        }
      ]
    },
    {
      id: 31,
      label: 'Alsace',
      cities: [
        {
          id: 311,
          label: 'Colmar'
        },
        {
          id: 312,
          label: 'Eguishem'
        },
        {
          id: 313,
          label: 'Strasbourg'
        },
        {
          id: 314,
          label: 'Obernai'
        }
      ]
    },
    {
      id: 32,
      label: 'Normandy',
      cities: [
        {
          id: 321,
          label: 'Rouen'
        },
        {
          id: 322,
          label: 'Bayeux'
        },
        {
          id: 323,
          label: 'Deauville'
        },
        {
          id: 324,
          label: 'Caeen'
        }
      ]
    },
    {
      id: 33,
      label: 'Corsica',
      cities: [
        {
          id: 331,
          label: 'calvi'
        },
        {
          id: 332,
          label: 'Ajacio'
        },
        {
          id: 333,
          label: 'Corte'
        },
        {
          id: 334,
          label: 'Bastia'
        }
      ]
    }
  ]

  cityList = [
    {
      id: 111,
      label: 'Nagpur'
    },
    {
      id: 112,
      label: 'Pune'
    },
    {
      id: 113,
      label: 'Bhandara'
    },
    {
      id: 114,
      label: 'Ramtek'
    },
    {
      id: 121,
      label: 'Kannur'
    },
    {
      id: 122,
      label: 'Kochi'
    },
    {
      id: 123,
      label: 'Thiruvananthpuram'
    },
    {
      id: 124,
      label: 'Malappuram'
    },
    {
      id: 131,
      label: 'Seppa'
    },
    {
      id: 132,
      label: 'Wakro'
    },
    {
      id: 133,
      label: 'Rupa'
    },
    {
      id: 134,
      label: 'Zemithang'
    },
    {
      id: 211,
      label: 'San Francisco'
    },
    {
      id: 212,
      label: 'San Diego'
    },
    {
      id: 213,
      label: 'Oakland'
    },
    {
      id: 213,
      label: 'Irvine'
    },
    {
      id: 221,
      label: 'Houston'
    },
    {
      id: 222,
      label: 'Dallas'
    },
    {
      id: 223,
      label: 'Austin'
    },
    {
      id: 224,
      label: 'Arlington'
    },
    {
      id: 231,
      label: 'Miami'
    },
    {
      id: 232,
      label: 'Naples'
    },
    {
      id: 233,
      label: 'Orlando'
    },
    {
      id: 234,
      label: 'Destin'
    },
    {
      id: 311,
      label: 'Colmar'
    },
    {
      id: 312,
      label: 'Eguishem'
    },
    {
      id: 313,
      label: 'Strasbourg'
    },
    {
      id: 314,
      label: 'Obernai'
    }, {
      id: 321,
      label: 'Rouen'
    },
    {
      id: 322,
      label: 'Bayeux'
    },
    {
      id: 323,
      label: 'Deauville'
    },
    {
      id: 324,
      label: 'Caeen'
    },
    {
      id: 331,
      label: 'calvi'
    },
    {
      id: 332,
      label: 'Ajacio'
    },
    {
      id: 333,
      label: 'Corte'
    },
    {
      id: 334,
      label: 'Bastia'
    }
  ]
}
