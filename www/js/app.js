// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    window.sqlitePlugin.selfTest(function() {
      alert('SELF test OK');
    });

    var db = $cordovaSQLite.openDB({ name: "sqlitonic.db" });
    db.sqlBatch([
      'DROP TABLE IF EXISTS listes',
      'CREATE TABLE listes (id integer primary key, nom text)',
      [ 'INSERT INTO listes(nom) VALUES(?)', ['Are'] ],
      [ 'INSERT INTO listes(nom) VALUES(?)', ['Hac'] ]
    ]);

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('defController', function () {

})

.factory('ListeDBService', function () {

})
