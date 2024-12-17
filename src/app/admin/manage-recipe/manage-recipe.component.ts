import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !: string
  recipeDetails:RecipeModel = {}
  cuisineArray:any = []
  mealArray:any=[]
  ingredients:any = []
  instructions:any = []
  mealTypeArray:any = []

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealTypeArray = this.recipeDetails.mealType
      }
      res.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);
      const dummyMeal = res.map((item:any)=>item.mealType)
      // console.log(dummyMeal);
      const flatedDummyArray = dummyMeal.flat(Infinity)
      // console.log(flatedDummyArray);
      flatedDummyArray.forEach((item:any)=>{
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);
      
      
      
      
    })
  }

  

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value = ""
      console.log(this.ingredients);
      
    }
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstructions(instructionInput:any){
    if(instructionInput.value){
      this.instructions.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructions);
      
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  mealTypeSelect(event:any){
    if(event.target.checked){
     !this.mealTypeArray.includes(event.target.name) && this.mealTypeArray.push(event.target.name)
    }else{
      this.mealTypeArray = this.mealTypeArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealTypeArray);
    
  }

  removeMealType(meal:string){
    this.mealTypeArray = this.mealTypeArray.filter((item:string)=>item!=meal)

  }

  addRecipe(){
    console.log(this.recipeDetails);
    // add ingredients, instructions and mealArray to recipedetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealTypeArray

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    
    // check all fields have values in recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      // alert("API call")
      // if all values are present make api call
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
    // if api call success, then clear all fields, alert "recipe added" , redirect to all recipe page
    next:(res:any)=>{
      alert("Recipe successfully added to our collection")
      this.recipeDetails = {}
      this.ingredients = []
      this.instructions =[]
      this.mealTypeArray = []
      this.router.navigateByUrl("admin/recipe-list")
    }
      })
    error:(reason:any)=>{
      alert(reason.error)
      this.recipeDetails.name ="" 

    }
    // if api call failed then alert failed msg, and clean name filed of recipe details
    
    }else{
          // if all values are not present then alert "Please fill the form."
      alert("Please fill the form completely!!!")
    }
    

  }

  editRecipe(){
    console.log(this.recipeDetails);
    // add ingredients, instructions and mealArray to recipedetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealTypeArray

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    
    // check all fields have values in recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      // alert("API call")
      // if all values are present make api call
      this.api.updateRecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>{
        // if api call success, then clear all fields, alert "recipe updated" , redirect to all recipe page
        
          alert("Recipe Details Updated Successfully !!!")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions =[]
          this.mealTypeArray = []
          this.router.navigateByUrl("admin/recipe-list")
        
          })
        
    }else{
          // if all values are not present then alert "Please fill the form."
      alert("Please fill the form completely!!!")
    }
    

  }
 

}
