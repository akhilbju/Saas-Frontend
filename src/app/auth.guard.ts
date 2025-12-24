import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('AccessToken');
  if (token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
