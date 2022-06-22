import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiUrl: string;
  headers = new HttpHeaders(
    {'Content-Type': 'application/json;charset=UTF-8'}
  );
  emailControl = new FormControl('', Validators.email);
  passControl = new FormControl('', Validators.maxLength(50));
  options: FormGroup;
  
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.apiUrl = environment.apiUrl + '/usuario';
    this.options=new FormGroup({
      emailControl: this.emailControl,
      passControl: this.passControl,
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authenticate(this.emailControl.value, this.passControl.value).subscribe(data=>{
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('nombre', data.nombre);
      this.router.navigate(['pieces'])
    });
  }

  authenticate(email: string, password:string): Observable<any>{
    return this.httpClient.post<any>( this.apiUrl+'/autenticar', {email:email, password:password} ,{headers: this.headers, params: {}} )
  }

}
