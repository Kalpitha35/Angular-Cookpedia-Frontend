import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:4001"

  constructor(private http:HttpClient) { }


  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  //add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  //register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  //login
 loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  //appendToken in req header
  appendToken(){
    let headers = new HttpHeaders
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // /recipe/:id/view'
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  //related-recipe - related-recipes?cuisine=Italian
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  ///recipe/:id/download
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  // /recipe/:id/save
 saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

 // get-save-recipes
 getUserSaveRecipesAPI(){
  return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
 }

//deleteSaveRecipeAPI
deleteSaveRecipeAPI(id:string){
  return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
 }

// user-downloads
getUserDownloadRecipesAPI(){
  return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())

}

// user/edit
editUserAPI(reqBody:any){
  return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())

}

// all-users
allUsersAPI(){
  return this.http.get(`${this.server_url}/all-users`,this.appendToken())
}

// download-list
allDownloadListAPI(){
  return this.http.get(`${this.server_url}/download-list`,this.appendToken())
}

// all-feedback
getAllFeedbackAPI(){
  return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
}

// http://localhost:4001/feedback/67505a34cbdae7a8fba288b9/update?status=Approved
updateFeedbackStatusAPI(feedBackId:string,status:string){
  return this.http.get(`${this.server_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
}

// all-approved-feedbacks
getAllApprovedFeedbackAPI(){
  return this.http.get(`${this.server_url}/all-approved-feedback`)
}

// add-recipe
addRecipeAPI(reqBody:any){
  return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())

}

// recipe/675bf370a33115d1e38617e1/edit
updateRecipeAPI(id:string,reqBody:RecipeModel){
  return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())

}

// recipes/:id/remove
deleteRecipeAPI(id:string){
  return this.http.delete(`${this.server_url}/recipes/${id}/remove`,this.appendToken())
 }

}
