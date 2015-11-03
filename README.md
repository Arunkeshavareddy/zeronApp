# Angular Starting App
Hello World App for AngularJS with Gulp. Stand alone project for working with gulp and angular.


## Starting Fresh

Install node and npm  
Run `npm install`  
Run `gulp`  
Browse to `http://localhost:5000/`

If all is well, you should be greeted.  

## Gulp Tasks

Gulp tasks download bower prerequisites, compile, minifiy and inject all the files. They also watch the files for any changes and automatically recompile and inject.  

To have the browser automatically refresh you can use the [livereload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) for chrome.
### Running Gulp

`gulp` - runs default gulp task. Compiles the client app, starts a livereload server and refreshes when the files change.  
`gulp build` - builds the client app without starting the watcher   

Running any task with `--env release` will run a production build of the client app. This includes minifying and concatinating both client and vendor files

## Gulp Config and Vendor Packages

Bower can be used to install any additional 3rd party packages for the frontend. Any packages installeda re not automatically added to the pipeline. In order to have the new pakcages consumed edit `gulp.config.js` and add appropriate vendor files to `vendorcss` and `vendorjs` properties.

``` json
"vendorcss": [
    "bower_components/semantic-ui/*.min.css"
  ],
"vendorjs": [
    "bower_components/angular/angular.min.js"
  ]
```
