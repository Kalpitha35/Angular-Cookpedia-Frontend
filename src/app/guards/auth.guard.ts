import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    //authorised user
    return true;
  }else{
    // unauthorized access
    alert("Unauthorized Access.........Please login")
    // navigate to login page
    router.navigateByUrl("/login")
    return false;
  }
 
};
