import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  jwToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:44314';
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser') == null) return;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject?.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.apiUrl + '/api/Account/authenticate', {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          localStorage.setItem('jwToken', user.data.jwToken);
          this.currentUserSubject.next(user.data);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwToken'); // Pamiętaj, aby usunąć token przy wylogowaniu
    this.currentUserSubject.next({} as User);

    this.router.navigate(['/login']);
  }
}
