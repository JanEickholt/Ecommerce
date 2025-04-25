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

  // Mock user data - in a real app, this would be handled by a backend
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
    // Check if user is stored in localStorage on service init
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // In a real app, this would make an HTTP request to a backend
    const user = this.mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      // Omit password from the user object
      const { password, ...userWithoutPassword } = user;

      // Add a delay to simulate network request
      return of(userWithoutPassword as User).pipe(
        delay(1000),
        tap((user) => {
          // Store user details and jwt token in local storage to keep user logged in
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
      );
    }

    return throwError(() => new Error("Username or password is incorrect"));
  }

  register(user: any): Observable<User> {
    // In a real app, this would make an HTTP request to a backend
    // Check if user already exists
    if (this.mockUsers.find((u) => u.email === user.email)) {
      return throwError(() => new Error("User already exists"));
    }

    // Create new user
    const newUser = {
      id: (this.mockUsers.length + 1).toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      token: "mock-jwt-token-" + Date.now(),
    };

    this.mockUsers.push(newUser);

    // Omit password from the user object
    const { password, ...userWithoutPassword } = newUser;

    // Add a delay to simulate network request
    return of(userWithoutPassword as User).pipe(
      delay(1000),
      tap((user) => {
        // Store user details and jwt token in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    // In a real app, this would send a password reset email
    const user = this.mockUsers.find((u) => u.email === email);

    if (!user) {
      return throwError(() => new Error("User not found"));
    }

    // Simulate API call
    return of(true).pipe(delay(1000));
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
