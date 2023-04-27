import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { GYM } from '../models/GYM';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  obj:GYM=new GYM();
  req:string='';
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]
  ers:string[]=[];

  public registerForm!: FormGroup;
  constructor(private fb: FormBuilder,private service:DataServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(5)]],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      weight: ['',Validators.required],
      height: ['',Validators.required],
      bmi: ['',Validators.required],
      bmiResult: ['',Validators.required],
      gender: ['',Validators.required],
      requireTrainer: ['',Validators.required],
      package: ['',Validators.required],
      important: ['',Validators.required],
      haveGymBefore: ['',Validators.required],
      date: ['',Validators.required]
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
  }
  err:any;
    checkErrors(str:string)
  {
    this.ers=[];
    this.err='';
    console.log(this.registerForm.controls['firstName'].errors||this.registerForm.controls['firstName'].value.length===0);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    if(this.registerForm.controls[str].errors?.['required'])
    {
      console.log("Entered")
      this.ers.push(`${str} is required`);
    }
    console.log(this.registerForm.controls[str].errors?.['minlength']===undefined);
    if(this.registerForm.controls[str].errors?.['minlength'] || this.registerForm.controls[str].errors?.['minlength']===undefined)
    {
      
      this.ers.push(`${str} minLen should be 5`);
    }
    this.err = this.ers.join('\n');

  }
  handleSubmit()
  {
    console.warn(this.registerForm.value.date.toDateString()+" "+typeof this.registerForm.value.date.toDateString());
    this.obj=this.registerForm.value;
    this.obj.date=this.registerForm.value.date.toDateString()
    this.obj.important=this.registerForm.value.important.toString()
    console.log(this.obj);
    this.service.postData(this.obj).subscribe(res=>{
      alert(res);
    })
  }

  calculateBmi(value: number) {
    const weight = this.registerForm.value.weight; // weight in kilograms
    const height = value; // height in meters
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }
}
