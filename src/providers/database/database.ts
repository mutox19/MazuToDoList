import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider
{
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage,
  private sqlite: SQLite, private platform: Platform, private http: Http, private toast: Toast)
  {
      this.databaseReady = new BehaviorSubject(false);
      //check to make sure that the platform is ready
      this.platform.ready().then(() => {
      //create a new todo databse if there is not one already
        this.sqlite.create({
        name: 'todo.db',
        location: 'default'
        }).then((db: SQLiteObject) =>
        {
          this.database = db;
          this.storage.get('database_filled').then(val =>
          {
            if (val)
            {
              
              this.databaseReady.next(true);
            } 
            else
            {
              this.FillDatabase();
            }
          });
        });
      });
  }

//fill database with data, creating tables and inserting a few dummy data
  FillDatabase() 
  {
   this.http.get('assets/dummyDump.sql')
     .map(res => res.text())
     .subscribe(sql => {
       this.sqlitePorter.importSqlToDb(this.database, sql)
         .then(data => {
           this.databaseReady.next(true);

           this.storage.set('database_filled', true);
         
         })
         .catch(e => console.error(e) );
     });
 }

  //insert a new user on registration
  AddNewUser(userName, email, password) 
  {
      let data = [userName, email, password]
      return this.database.executeSql("INSERT INTO Users (userName, email, password) VALUES (?, ?, ?)", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
   }

   //get all the users in the user table
 getAllUsers() {

    return this.database.executeSql("SELECT * FROM Users", []).then((data) => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ username: data.rows.item(i).userName, email: data.rows.item(i).email, password: data.rows.item(i).password });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  //log user in with email and password
 GetUser(loggedEmail, loggedPassword)
 {
  //query the database for the user credentials and return user info
   return this.database.executeSql("SELECT * FROM Users WHERE email='"+loggedEmail+"'"+"AND password='"+loggedPassword+"'", []).then((data) => {
     let users = [];
     if (data.rows.length > 0) 
    {
       for (var i = 0; i < data.rows.length; i++) 
       {
         users.push({ userName: data.rows.item(i).userName, email: data.rows.item(i).email, password: data.rows.item(i).password });
       }
     }
     return users;
   }, err => {
     console.log('Error: ', err);
     return err;
   });
 }

  //add a new task for the current logged user
  AddNewTask(name, email) {
      let data = [name, email];
      return this.database.executeSql("INSERT INTO Todo (name, email) VALUES (?, ?)",data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
    }

    //get the logged in users task
    GetUserTask(loggedEmail)
    {

      //return task that equal to the current logged email
      return this.database.executeSql("SELECT * FROM Todo WHERE email='"+loggedEmail+"'", []).then((data) => {
        let alltasks = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            alltasks.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, email: data.rows.item(i).email });
          }
        }
        return alltasks;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
    }
    
    //deletes currently logged in users task
    UserDeleteTask(toDeleteTask)
    {
      //deletes task for the specific id
      return this.database.executeSql("DELETE FROM Todo WHERE id='"+toDeleteTask+"'", []).then((data) => {
        let alltasks = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            alltasks.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, email: data.rows.item(i).email });
          }
        }
        return alltasks;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
    }

    //return the state of the database
  GetDatabaseState() 
  {
    return this.databaseReady.asObservable();
  }

}
