import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider  } from './database';
import { NavController, NavParams } from 'ionic-angular';
//import { PlatFormMock } from './../../pages/home/home';
import { MyApp } from './../../app/app.component';
import { TodoPage } from './../../pages/todo/todo';
import { HomePage } from './../../pages/home/home';

import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { HttpModule } from '@angular/http';

//import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
//import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
//import { DatabaseProvider } from './../../providers/database/database';

/*import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';*/

describe('Database Provider', () => {
  let fixture;
  let component : TodoPage;
  let dataProvider: DatabaseProvider;
  let SqLitePorter;
  let home;
  let storage;
  let Sqlite;
  let platform;
  let http;
  let toast;
  let navCtr;
  let params;
  
  class MockNavParams{
    data = {
        email:'anyting',
        userName:'anything'
    };
  
    get(param){
      return this.data[param];
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp,TodoPage, HomePage], 
      imports: [
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DatabaseProvider,
        NavController, 
        Toast,
        SQLitePorter,
        SQLite,
        {provide: NavParams, useClass: MockNavParams},
        { provide: Http, useClass: HttpModule }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    
    navCtr = NavController;
    toast = Toast;
    params = new MockNavParams();
    SqLitePorter = SQLitePorter;
    storage = Storage;
    Sqlite = SQLite;
    platform = Platform;
    http = Http;
    
  });

  afterEach(() => {
    //fixture = null;
    component = null;
    dataProvider = null;
});

it('is created', () => {
    
           expect(fixture).toBeTruthy();
           expect(component).toBeTruthy();
    
       });

  it('Get a users task that has no task', () => {
     
    
    expect(component.GetAllUserTaskData.length).toEqual(0);
    
});

  it('should return a non empty array', () => 
  {
        component.allTask.push(["anything","anything"],["anything2","anything2"]);
        let result = component.allTask.length;
        expect(result).toBe(2);
 });


});
