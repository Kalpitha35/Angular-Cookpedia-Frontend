import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  tesimonyForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){
    this.tesimonyForm = this.fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.email]],
      message:['',[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]],

    })
  }
  
  addTestimony(){
    if(this.tesimonyForm.valid){
      const name = this.tesimonyForm.value.name
      const email = this.tesimonyForm.value.email
      const message = this.tesimonyForm.value.message
      // alert(`${name},${email},${message}`)
      this.api.addTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        alert("Thank you for your valuable thoughts!!!")
        this.tesimonyForm.reset()
      })
    }else{
      alert("Invalid Form!!!")
    }
  }
}
