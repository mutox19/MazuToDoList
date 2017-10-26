import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {TodoPage} from '../todo/todo';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
selector: 'page-login',
templateUrl: 'login.html'
})
export class LoginPage
{
  HomePage = HomePage;
  RegisterPage = RegisterPage;
  TodoPage = TodoPage;
  email: string;
  userPassword: string;
  userInfo = [];
  newRegistration = {};

  constructor(public navCtrl: NavController,private databaseprovider: DatabaseProvider, private toast: Toast)
  {
      //could check to see if user is already logged in, by getting the local storage value
      //if user logged in redirect user to todo page
      //if a log out button was implemented that it
  }


  LoginUser()
  {
    //get the user data
    this.GetUserData();
  }


  GetUserData() {

    //check to see if both email and password are filled out
    if(this.email != null && this.userPassword != null)
    {
      this.databaseprovider.GetUsers(this.email, this.userPassword).then(data =>
        {
          this.userInfo = data;
          var currentUsername = "";
          var currentEmail = "";
          var currentPassword = "";

         
          if(this.userInfo.length > 0)
          {
            //loop over data to get user values
            for(var key in data)
            {
                currentUsername = data[key].userName;
                currentEmail = data[key].email;
                currentPassword = data[key].password;
            }

              this.toast.show("Login Successful", '5000', 'center').subscribe(
                toast => {
                console.log(toast);
                });
      
                //navigate to the todo page providing username and email as parameters
                this.navCtrl.push(TodoPage, {
                userName: currentUsername, email: currentEmail
                });
            
          }
          else
          {
            this.toast.show("no user found", '5000', 'center').subscribe(
              toast => {
              console.log(toast);
              });
          }
        });
    }
    else
    {
      this.toast.show("Sorry you must provide both email and password", '5000', 'center').subscribe(
        toast => {
        console.log(toast);
        });
    }
   }
}
