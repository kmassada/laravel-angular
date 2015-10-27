## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

## Angular Framework

## Official Laravel Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Official Angular Documentation

Documentation for the framework can be found on the [Angular website](https://angularjs.org).

## PROJECT

We've created a [full CRUD Laravel App](https://github.com/kmassada/laravel-angular/tree/basic-laravel)

We made Laravel an [API serving app ](https://github.com/kmassada/laravel-angular/tree/basic-laravel-api)

We imported angular resources into our [hybrid app ](https://github.com/kmassada/laravel-angular/tree/angular-init)

We've built the [angular app ](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.0)where we can leverage laravel for crud operations. As discussed

Our [Laravel App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.1) is now capable of creating a task, with tags, and priorities.

The [Full App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.2) is now capable of submitting a task, that contain a list of tags, and one priority.

[Our Full Laravel/Angular CRUD App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.3) is now capable of creating and editing a Task (Model), with schema variables that have a one to many and many to many structure

[Our Full Laravel/Angular CRUD App with user authentication and ownership](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.4) is now capable of creating and editing a Task (Model), assigned to a specific user.

We perform a lot of cleanup.

- alerts
First we create an alertService.js file, `showAlert: function (type, title, message, timeout)` to flash error messages based on timeout length.
inside `index.html` we create bootstrap class to handle this `class="alert alert-{{alert.type}} " ng-show="alert.show"`

- view cleanup
We add `ng-cloak` to elements that we do not want user to view on reload. such as the alert div or `<ul class="nav navbar-nav navbar-right" ng-if="userLoggedIn()" ng-cloak>`

- rootScope
we learn also about proper use of `$rootScope`. On the Nav Menu, we had [Log In|Register] vs [Log out|Restricted] these items are shown based on $rootScope.userLoggedIn() which used to be $scope.userLoggedIn(), i've been stingy with using rootScope but fits well this case.

- ui-router
we learned about ui router states in this portion. using `$state.go('state-name')` to navigate instead of `window.location`
- form Validation
we created a custom directive to handle ng-model, also so that we could do error validation in the `link:` function for directives. this process has taught us quite a deal about $parent.scope, we [had problems binding ng-scope](http://stackoverflow.com/questions/32740565/angular-directive-with-ng-model-not-binding) but thankfully we learned and now have a solution [we've implemented](http://plnkr.co/edit/lpAWQm?p=info)

- security
ng-cloak is great but, let's protect non Auth routes, this we achieve with `$rootScope.run()`.
as an extension to ui router, we also [learn to protect our routes](http://stackoverflow.com/questions/25872219/confusing-locationchangesuccess-and-statechangestart) by taking advantage of `$locationChangeSuccess`, preventing state to be loaded before user is confirmed to be authenticated

- bootstrap - ui
we remove ui-bootstrap, we originally thought bootstrap ui would be a great idea, but after following a post on performance, we noticed, it replaces elements, that is an extra call. It could potentially slow us down.

- code cleanup
I've been sharing this code to more and more people, and have noticed how different my angular coding style is, it seems to make more sense and appear clearer when I use [John Papa's style guide](https://github.com/johnpapa/angular-styleguide)

- $q.
while making requests like login, then fetching task, I've noticed when a promise is being return, it not only adds clarity to the workflow, but speeds up and improve the experience on the frontend, where I can generate items and wait for them to be resolved. [Angular's $q guide](https://docs.angularjs.org/api/ng/service/$q) isn't as thorough but it seems like it's been around for a while. this [networking centric post](http://www.peterbe.com/plog/angularjs-$q-notify-resolve-local-get-proxy) on using promises to retrieve resources help a lot. [this guide was also very helpful](http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/) his approach of $q is to use it for loading files, geolocation, and checking for duplicate username.

- storing token to localStorage
I came across a dilemma, we were protecting the routes but on login, we could not redirect to a tasks state. $window.sessionStorage was not getting stored fast enough, we've surely switched to $window.localStorage, and even wrote a service for storing tokens, [inspired by this developer](http://www.undefinednull.com/2014/02/25/angularjs-real-time-model-persistence-using-local-storage/), but the question persist, we've [discovered that using localStorage](http://time2hack.com/2014/12/browser-storage-and-angularjs.html), we can monitor when an element gets added to the storage and '$rootScope.apply()' through our application.

- Usage of log
using [$log](https://docs.angularjs.org/api/ng/service/$log) is  clean and convenient way to keep logs tidy.

- Primitives do not `$apply`.
I've been running into the constant problem of having primitives not able to display, despite setting the value. [I've come across](https://github.com/angular/angular.js/wiki/Understanding-Scopes) it already twice before but this time I paid really paid attention, after User's name will not get set in nav bar.

- `ng-init`
I've also discovered ng-init as a way to run a function, under a given scope for an element. this has also shown me, how angular loads element, and how important initialization is.

- bootstrap theming edits

- Others:
There has been a lot of information unconvered especially trying to tidy the login/logout function in the app. from the `$scope.on` listeners, to the `$scope.watch` to monitor changed variables, but I will address more of them in the next version.


### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

### Credits LongList

- AUTH
  + [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
  + [barryvdh/laravel-cors](https://github.com/barryvdh/laravel-cors)
  + [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
  + [AUTH0 starter NodeJS/Angular AUTH app](https://github.com/auth0/angular-token-auth)
  + [Cookie free auth with jwt](http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs)
  + [JWT Debugger](http://jwt.io)

- DEV HELPERS
  + [fzaninotto/Faker](https://github.com/fzaninotto/Faker)
  + [laracasts/Laravel-5-Generators-Extended](https://github.com/laracasts/Laravel-5-Generators-Extended)
  + **irc**: Spot__, epimeth, icebox

- LARAVEL RESOURCES

- ANGULAR RESOURCES
  + [Interceptors in angularjs](http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/)
  + [Angular UI Router](https://github.com/angular-ui/ui-router/wiki/Quick-Reference)
  + [John Papa Style Guide](https://github.com/johnpapa/angular-styleguide)
