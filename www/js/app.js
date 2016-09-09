// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {

    var db = $rootScope.db = $cordovaSQLite.openDB({ name: "sqlitonic.db", location: "default" });

    db.sqlBatch([
      'DROP TABLE IF EXISTS listes',
      'CREATE TABLE listes (id integer primary key, nom text)',
      [ 'INSERT INTO listes(nom) VALUES(?)', ['Are'] ],
      [ 'INSERT INTO listes(nom) VALUES(?)', ['Hac'] ]
    ] , function() {
      alert('OKAY');
    }, function(error) {
      alert('Populate table error: ' + error.message);
    });

    db.transaction(function(tr) {
      tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
        alert('Got upperString result: ' + rs.rows.item(0).upperString);
      });
    });

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

.controller('defController', function ($scope, ListeDBService, $cordovaSQLite) {
  $scope.listes = ListeDBService.query();

  // document.addEventListener('deviceready', function () {
  //   // var db = $cordovaSQLite.openDB({ name: "sqlitonic.db", location: "default" });
  //
  //   $rootScope.db.transaction(function(tr) {
  //     tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
  //       alert('ADAA - Got upperString result: ' + rs.rows.item(0).upperString);
  //     });
  //   });
  // }, false)

  $scope.select = function () {
    var query = "SELECT * FROM listes";
    $scope.listes = [];
    $cordovaSQLite.execute($scope.db, query, []).then(
      function (result) {
        if (result.rows.length > 0) {
          for (var i = 0; i < result.rows.length; i++) {
            $scope.listes.push(
              {
                id: result.rows.item(i).id,
                nom: result.rows.item(i).nom
              }
            );
          }
        }
      }, function (error) {
        alert(error.message);
      }
    );
  }


})

.factory('ListeDBService', function () {

  var listes = [];

  return {
    query: function () {
      listes = [
        {
          id: 1,
          nom: "Arecgh"
        },
        {
          id: 2,
          nom: "Hacha"
        }
      ];

      return listes;

      // var query = "SELECT * FROM listes";
      //
      // var db = $cordovaSQLite.openDB({ name: "sqlitonic.db", location: "default" });
      //
      // $cordovaSQLite.execute(db, query).then(
      //   function (result) {
      //     if (result.rows.length > 0) {
      //       for (var i = 0; i < result.rows.length; i++) {
      //         var liste = {
      //           id: result.rows.item(i).id,
      //           nom: result.rows.item(i).nom
      //         };
      //         listes.push(liste);
      //       }
      //     }
      //     return listes;
      //   },
      //   function (error) {
      //     alert(error.message);
      //   }
      // );
    }
  }
})
