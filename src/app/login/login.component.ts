import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioSeguridad } from '../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    LoginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public seguridad: ServicioSeguridad,
        private router: Router
    ) {
        this.LoginForm = this.formBuilder.group({
            identifier: '',
            password: ''
        })
    }

    ngOnInit() {
    
    }

    login = () => {
        this.seguridad.Login(this.LoginForm.value).subscribe(
            res => {
                if (res) this.router.navigate(['/pacientes/lista']);
            }
        );
    }
}
