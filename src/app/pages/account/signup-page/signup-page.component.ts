import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ]),
      ],
      document: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(130),
          Validators.required,
          CustomValidator.EmailValidator
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ]),
      ],
    });
  }

  ngOnInit() {}

  submit(): void {
    this.busy = true;
    this.service.create(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Bem-Vindo!');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
        this.busy = false;
      }
    );
  }
}
