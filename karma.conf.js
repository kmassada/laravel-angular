// Karma configuration
// Generated on Tue Oct 27 2015 13:53:00 GMT-0400 (EDT)


// base path, that will be used to resolve files and exclude
basePath = 'public/';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'bower_components/angular/angular.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular-loading-bar/build/loading-bar.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular-messages/angular-messages.min.js',
  'js/app.js',
  'js/app*.js',
  'js/**/*.js',
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS', 'Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
