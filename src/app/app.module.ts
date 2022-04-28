import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { StackbitPageComponent } from './stackbit-page/stackbit-page.component';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import sourceBitPages from '../../.sourcebit-angular-cache.json';

import { AppInitService } from './app-init.service';
 
export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

let paths = [
  { path: 'crisis-list', component: CrisisListComponent },
  { path: 'stackbit-page', component: StackbitPageComponent },
  { path: 'sample', component: DynamicPageComponent },
  { path: '', redirectTo: '/stackbit-page', pathMatch: 'full' }
];

for (var x = 0; x < sourceBitPages.pages.length; x++) {
  let page: any = sourceBitPages.pages[x];

  if (page.__metadata.urlPath.charAt(0) == "/") {
    page.__metadata.urlPath = page.__metadata.urlPath.substr(1);
  }

  paths.push({
    path: page.__metadata.urlPath,
    component: DynamicPageComponent
  })
}

paths.push({ path: '**', component: PageNotFoundComponent })

@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    StackbitPageComponent,
    PageNotFoundComponent,
    DynamicPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(paths),
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
