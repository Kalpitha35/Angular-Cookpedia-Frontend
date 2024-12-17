import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string = "https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg"
  allUserDownloadList:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getUserDownloads(){
    this.api.getUserDownloadRecipesAPI().subscribe((res:any)=>{
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);
      
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      
    }
  }

  updateProfile(){
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated Successfully!!!")
    })
  }
}
