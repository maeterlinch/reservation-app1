import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test : Date = new Date();
    focus: any;
    focus1: any;
    errors: any = []
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {}

    login(loginForm: { value: any; }) {
        this.authService.login(loginForm.value).subscribe(
            (token) => {
                console.log(token)
                this.router.navigate(['/products'])
              },
              (err: HttpErrorResponse) => {
                console.error(err)
                this.errors = err.error.errors
              }
            )
        }
    }