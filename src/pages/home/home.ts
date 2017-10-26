import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

developer = {};
developers = [];
  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform)
   {
      /*this.databaseprovider.GetDatabaseState().subscribe(rdy => {
       if (rdy) 
       {
          this.loadDeveloperData();
       }
      });*/
  }
/*
  loadDeveloperData() {


    this.databaseprovider.getAllUsers().then(data =>
    {
      this.developers = data;
      console.log(this.developers);
    })
  }*/

}
