import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css'],
})
export class LoginPanelComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (
      this.authService.currentUserValue != null &&
      this.authService.currentUserValue != undefined &&
      this.authService.currentUserValue.jwToken != null
    ) {
      this.router.navigate(['/kanban']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .pipe((x) => x.pipe(first()))
      .subscribe(
        (data) => {
          this.router.navigate(['/kanban']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
