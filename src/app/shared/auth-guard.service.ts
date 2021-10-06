import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth-service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild { //interface provided by Angular
    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

                    return this.authService.isAuthenticated().then( //handle the promise
                        (authenticated: boolean) => { //the promise will return a boolean
                            // returns true(gives access) or just navigates us away
                            if (authenticated) {
                                return true;
                            } else {
                                //if not authenticated we return to homepage
                                this.router.navigate(['/']);
                            }
                        }
                    );
                } 
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.canActivate(route, state);
        }
}