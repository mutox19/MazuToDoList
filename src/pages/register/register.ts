import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import { DatabaseProvider } from './../../providers/database/database';
import { Toast } from '@ionic-native/toast';

@Component({
selector: 'page-register',
templateUrl: 'register.html'
})
export class RegisterPage
{
  HomePage = HomePage;
  LoginPage = LoginPage;
  userName: string;
  userNewPassword: string;
  email: string;
  allUsers = [];
  newRegistration = {};

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private toast: Toast)
  {

  }

  GetAllUsers()
  {
     return this.databaseprovider.getAllUsers().then(data => {
      this.allUsers = data;
    })
  }

  Register()
  {
    //register the new user
      this.AddNewUser();
  }

  AddNewUser()
  {

    //check to see if user filled out all information
    if(this.userName == null || this.email == null || this.userNewPassword == null)
    {
      this.toast.show(`Sorry you have to fill in all information`, '5000', 'center').subscribe(
        toast => {
        console.log(toast);
        });
  
    }
    else if (this.userName!= null || this.email != null || this.userNewPassword != null)
    {

      this.toast.show(this.userName + " " + this.email + " " + this.userNewPassword, '5000', 'center').subscribe(
        toast => {
        console.log(toast);
        });
      
      this.databaseprovider.AddNewUser(this.userName, this.email, this.userNewPassword)
      .then(data => 
        {
          this.toast.show(`New User Registered`, '5000', 'center').subscribe(
          toast => {
          console.log(toast);
          });
          
          //navigate to the home page
          this.navCtrl.push(LoginPage, {
            
            });
  
      });
      this.GetAllUsers();
      this.newRegistration = {};
    }
    
  }

}
