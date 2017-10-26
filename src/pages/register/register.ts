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


  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private toast: Toast)
  {
    this.databaseprovider.GetDatabaseState().subscribe(rdy => 
      {
     if (rdy) 
     {
       //if the database is ready load the users table
       this.GetAllUsers();
     }
        });
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

  isEmpty(value){
    return (value == null || value.length === 0);
  }
  AddNewUser()
  {
    var userNameErr = false;
    var userEmailErr = false;
    var userPassErr = false;

    //check to see if user filled out all information
    if(this.isEmpty(this.userName))
    {
        userNameErr = true;
    }
    if(this.isEmpty(this.email))
    {
        userEmailErr = true;
    }
    if(this.isEmpty(this.userNewPassword))
    {
        userPassErr = true;
    }
    
    //check to see if there is a error in the form
    if(userNameErr == true || userEmailErr == true  || userPassErr == true)
    {
      this.toast.show(`Sorry you have to fill in all information`, '5000', 'center').subscribe(
        toast => {
        console.log(toast);
        });
    }
    else
    {
      //insert new user
      this.databaseprovider.AddNewUser(this.userName, this.email, this.userNewPassword)
      .then(data => 
        {

          this.toast.show("New User Added", '5000', 'center').subscribe(
          toast => {
          console.log(toast);
          });
          //navigate to the login page
          this.navCtrl.push(LoginPage, {
            
            });
  
      });
    }
    
  }

}
