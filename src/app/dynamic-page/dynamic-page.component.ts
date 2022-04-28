import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import sourceBitData from '../../../.sourcebit-angular-cache.json';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})

export class DynamicPageComponent implements OnInit {
  public page:any= {};

  constructor(private router:Router) { 
    for(var x = 0; x < sourceBitData.pages.length; x++) {
      let sourceBitPage: any = sourceBitData.pages[x];

      if(`/${sourceBitPage.__metadata.urlPath}` == router.url) {
        this.page = sourceBitData.pages[x];
      }
    }
  }

  ngOnInit(): void {
  }
}
