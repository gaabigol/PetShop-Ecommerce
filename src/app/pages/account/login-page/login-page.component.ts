import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/service/data.service';
import { Security } from 'src/app/util/security.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(private service: DataService, private fb: FormBuilder,   private router: Router
    ) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (error) => {
          localStorage.clear();
          this.busy = false;
        }
      );
    }
  }

  submit(): void {
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe(
      (data: any) => {
        console.log(data);
        this.busy = false;
        this.setUser(data.customer, data.token);
      },
      (error) => {
        console.log(error);
        this.busy = false;
      }
    );
  }

  setUser(user: User, token: string): void {
    Security.set(user, token);
    this.router.navigateByUrl('/');
  }
}
