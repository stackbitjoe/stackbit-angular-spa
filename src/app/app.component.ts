import { Component } from '@angular/core';
import { Router } from '@angular/router';

import sourceBitPages from '../../.sourcebit-angular-cache.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pages:Array<any> = [];

  constructor(private router:Router) {   
    this.pages = sourceBitPages.pages;
  }
  
  title = 'stackbit-angular-spa';
}
