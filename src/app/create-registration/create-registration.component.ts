import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GYM } from '../models/GYM';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  obj:GYM=new GYM();
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]

  public registerForm!: FormGroup;
  constructor(private fb: FormBuilder,private service:DataServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      date: ['']
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
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
