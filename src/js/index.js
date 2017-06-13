import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import '../css/main.less';
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: '/src/form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: '/src/form-profile.html'
        })
        .state('form.profile.hello', {
            url: '/hello',
            template:`<h1>hello<h1>
            <a ui-sref="form.profile.hello.ok" class="btn btn-block btn-info">
            ok
            </a>
            <div ui-view></div>`
        })
        .state('form.profile.hello.ok', {
            url: '/ok',
            template: '<h1>ok</h1>'
        })
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: '/src/form-interests.html'
        })

        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: '/src/form-payment.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/form/profile');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };

});
