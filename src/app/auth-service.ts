import { OnInit } from "@angular/core";

/* fake server */
export class AuthService {
    loggedIn = true;

    // check the state 
    isAuthenticated() {
        //to fake that it takes some time to connect to the server
        const promise = new Promise (
            (resolve, reject) => {
                resolve(this.loggedIn);
            }
        );
        return promise;
    }

    login() {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
}