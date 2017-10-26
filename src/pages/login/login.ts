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
  allUsers = [];

  constructor(public navCtrl: NavController,private databaseprovider: DatabaseProvider, private toast: Toast)
  {
       //could check to see if user is already logged in, by getting the local storage value
      //if user logged in redirect user to todo page
      //if a log out button was implemented that it

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

  LoginUser()
  {
    //get the user data
    this.GetUserData();
  }

  isEmpty(value){
    return (value == null || value.length === 0);
  }

  GetUserData() {

      
    var userEmailErr = false;
    var userPassErr = false;
    //check to see if user filled out all information
    
    if(this.isEmpty(this.email))
    {
        userEmailErr = true;
    }
    if(this.isEmpty(this.userPassword))
    {
        userPassErr = true;
    }
    //check to see if there is an error
    if(userEmailErr == true  || userPassErr == true)
    {
      this.toast.show(`Sorry you have to fill in all information`, '5000', 'center').subscribe(
        toast => {
        console.log(toast);
        });
    }
    else
    {
      this.databaseprovider.GetUser(this.email, this.userPassword).then(data =>
        {
          this.userInfo = data;
          var currentUsername = "";
          var currentEmail = "";

        
          if(this.userInfo.length > 0)
          {
            //loop over data to get user values
            for(var key in data)
            {
                currentUsername = data[key].userName;
                currentEmail = data[key].email;
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
            //no user was found 
            this.toast.show("no user found", '5000', 'center').subscribe(
              toast => {
              console.log(toast);
              });
          }
          
        }, err => {
          console.log('Error: ', err);
          this.toast.show(err, '5000', 'center').subscribe(
            toast => {
            console.log(toast);
            });
        });
    }
   }
}
