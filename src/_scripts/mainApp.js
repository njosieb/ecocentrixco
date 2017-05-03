'use strict'

// Import third-party libraries
import angular from 'angular'
import ngResource from 'angular-resource'
import ngMessages from 'angular-messages'
import uiRouter from 'angular-ui-router'

const ngModule = angular.module('vf-app', [
  'ngResource',
  'ngMessages',
  'ui.router'
])

ngModule.config(/*@ngInject*/ function ($urlRouterProvider, $stateProvider) {
  // ...

  $urlRouterProvider.otherwise('/')
})

ngModule.controller('MainCtrl', /*@ngInject*/ function($rootScope, $state) {
  const ctrl = this

  ctrl.$onInit = function() {

  }

  $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
    // TODO: Handle 401 rejection/redirects from admin
    if(error === "Not Authorized") {
      $state.go("login")
    }
  })
})

ngModule.constant('baseUrl', '/api')
