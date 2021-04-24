import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LoginService } from './shared/login.service';
import { Login } from './shared/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ErroService } from 'src/app/shared/services/erro.service';
import { NotificacaoService } from 'src/app/shared/components/notificacao/notificacao.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: Date = new Date();

  Login: any = {};
  dadosForm: FormGroup;

  checkFullPageBackgroundImage() {
    const $page = $('.full-page');
    const imageSrc = $page.data('image');

    if (imageSrc !== undefined) {
      const imageContainer = '<div class="full-page-background" style="background-image: url(' + imageSrc + ') "/>';
      $page.append(imageContainer);
    }
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toast: ToastrService,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService
  ) { }

  ngOnInit() {

    this.checkFullPageBackgroundImage();
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);

    this.formulario();
  }

  formulario() {
    this.dadosForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  logar() {
    if (this.dadosForm.valid) {
      const obj = Object.assign(new Login(), this.dadosForm.value);
      this.loginService.login(obj).subscribe(
        (res) => {
          if (res  && res.userToken != null) {

            this.loginService.setLocalStorage(res);
            this.router.navigate(['/']);            
          }
        },
        (error) => this.erroService.setError(error)
      );
    }
  }
}
