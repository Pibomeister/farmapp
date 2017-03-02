import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f){
    let form = f.value;
    if(form.password === form.password2){
      this.auth.createUser(f.value.name, f.value.email, f.value.password).subscribe((data)=> {
      f.reset();
      let usermail = data.mail;
      this.auth.secondStep(usermail).subscribe((info) => {
        console.log(info);
        this.router.navigateByUrl('/');
      })
      //this.router.navigateByUrl('/login');
    }, (err)=> {
      alert(err);
      f.reset();
    });
    } else {
      alert('Passwords must match');
      f.reset();
    }
    
  }

}
