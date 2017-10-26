import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {

  toDo: string;
  usersNewTask : string;
  currentLoggedEmail: string;
  currentLoggedUsername: string;
  allTask = [];
  newTask = {};
  constructor(public navCtrl: NavController, private toast: Toast, private databaseprovider: DatabaseProvider, public navParams: NavParams)
  {
    //get user email and username from the parameters
      this.currentLoggedEmail = navParams.get('email');
      this.currentLoggedUsername = navParams.get('userName');

      this.databaseprovider.GetDatabaseState().subscribe(rdy => 
        {
       if (rdy) 
       {
         //if the database is ready load the users task
         this.GetAllUserTaskData();
       }
          })
          
  }


  //add a new task
  AddNewTask()
  {

    //check to make sure todo is null so we can process it 
    if(this.toDo == null)
    {
      this.toast.show('Please enter your new task', '5000', 'center').subscribe(
        toast => {
      
        console.log(toast);
        }
        );

    }
    else
    {
        this.databaseprovider.AddNewTask(this.toDo, this.currentLoggedEmail)
        .then(data => 
        {
          
          this.toast.show(this.toDo, '5000', 'center').subscribe(
            toast => {
            
            console.log(toast);
            });
            //reload the task table
            this.GetAllUserTaskData();
        });
    }
  }

//get the current logged users task
  GetAllUserTaskData() {
    this.databaseprovider.GetUserTask(this.currentLoggedEmail).then(data => {
      this.allTask = data;
    })
  }

  //remove the selected task from the database
  Remove($event, list)
  {

    var deleteUserId = JSON.stringify(list.id);
    this.databaseprovider.UserDeleteTask(deleteUserId).then(data => {
      this.GetAllUserTaskData();
      this.toast.show('todo item has been deleted', '5000', 'center').subscribe(
        toast => {
      
        console.log(toast);
        }
        );
    })
  }

}
