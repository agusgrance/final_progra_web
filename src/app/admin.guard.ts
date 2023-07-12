import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private dataService: ApiService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any {
        let rol = Number(this.dataService.getRol());
        return rol == 1

    }
}