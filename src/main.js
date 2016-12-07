// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

//authConfig
//import authConfig from './authConfig';
const API_URL = 'http://localhost:3000/api';

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation')
    .plugin('aurelia-plugins-tabs')
    .plugin('aurelia-dialog')
    .plugin('aurelia-api', config => {
      // Register an authentication hosts
      config
        .registerEndpoint('auth', API_URL)
        .registerEndpoint('articles', API_URL + '/Articles')
        // .registerEndpoint('public-api', API_URL + '/public-api')
        .setDefaultEndpoint('auth');
    })
    .plugin('aurelia-computed', { // install the plugin
      enableLogging: true // enable debug logging to see aurelia-computed's observability messages.
    })
    /* configure aurelia-authentication */
    .plugin('aurelia-authentication', baseConfig => {
        baseConfig.configure({
          endpoint: 'auth',                   // '' for the default endpoint
          configureEndpoints: ['auth'], // '' for the default endpoint
          loginUrl: '/Users/login',
          accessTokenProp: 'id'
        });
    });


  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}