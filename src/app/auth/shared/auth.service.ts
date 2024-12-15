import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';
import { Router } from '@angular/router';


interface UserData {
  username: string;
  password: string;
}

const jwt = new JwtHelperService()

class DecodedToken{
  userId: string = ''
  username: string = ''
  password: string =''
  exp: number = 0
}

@Injectable()
export class AuthService {
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient,
        private router: Router
  ) {
    // localStorage.getItem が null の場合、初期値として新しい DecodedToken を使用
    const storedToken = localStorage.getItem('app-meta');
    this.decodedToken = storedToken ? JSON.parse(storedToken) : new DecodedToken();
  }

  getToken() {
    return localStorage.getItem('app-auth')
  }

  isAuthenticated() {
    // 現在時刻とexpの時刻を比較判定する
    return moment().isBefore(moment.unix(this.decodedToken.exp))
  }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData)
  }

  login(userData: UserData): Observable<string> {
    return this.http.post<string>('/api/v1/users/login', userData).pipe(
      map((response: string) => {
        const token = response; // JWT トークンを直接取得
        if (!token) {
          throw new Error('Token is missing from the response');
        }
        this.decodedToken = jwt.decodeToken(token)
        localStorage.setItem('app-auth', token); // トークンをローカルストレージに保存
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken)); // デコード済みトークンを保存
        return token; // トークンを返す
      })
    );
  }

  logout() {
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedToken = new DecodedToken()
    this.router.navigate(['/login'])
  }
}
