import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform)
   {

   }

}
