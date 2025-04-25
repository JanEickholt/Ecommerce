import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Router } from "@angular/router";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  private mockUsers = [
    {
      id: "1",
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      token: "mock-jwt-token",
    },
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    const user = this.mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;

      return of(userWithoutPassword as User).pipe(
        delay(1000),
        tap((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
      );
    }

    return throwError(() => new Error("Username or password is incorrect"));
  }

  register(user: any): Observable<User> {
    if (this.mockUsers.find((u) => u.email === user.email)) {
      return throwError(() => new Error("User already exists"));
    }

    const newUser = {
      id: (this.mockUsers.length + 1).toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      token: "mock-jwt-token-" + Date.now(),
    };

    this.mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;

    return of(userWithoutPassword as User).pipe(
      delay(1000),
      tap((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    const user = this.mockUsers.find((u) => u.email === email);

    if (!user) {
      return throwError(() => new Error("User not found"));
    }

    return of(true).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
