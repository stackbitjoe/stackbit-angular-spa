import { enableProdMode, ÉµresetCompiledComponents } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var module: any;
if(module.hot) {
  module.hot.accept();
  module.hot.dispose(()=> ÉµresetCompiledComponents())
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// import { hmrBootstrap } from './hmr';

// if (environment.production) {
//   enableProdMode();
// }

// const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

// console.log(environment);
// if (environment.hmr) {
//   if (module['hot']) {
//     hmrBootstrap(module, bootstrap);
//   } else {
//     console.error('HMR is not enabled for webpack-dev-server!');
//     console.log('Are you using the --hmr flag for ng serve?');
//   }
// } else {
//   bootstrap().catch(err => console.log(err));
// }