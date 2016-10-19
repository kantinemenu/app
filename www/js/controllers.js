angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, Menu, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.menu = Menu.all();
})

.controller('PromptCtrl', function($scope) {
})

.controller('MenuDetailCtrl', function($scope, $stateParams, Menu) {
  console.log($stateParams);
  $scope.menuItem = Menu.get($stateParams.menuId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
  };
  var now = new Date().getTime();
  var _5_SecondsFromNow = new Date(now + 5 * 1000);

  cordova.plugins.notification.local.schedule({
    id: 1,
    title: 'Super',
    text: 'Duper',
    at: _5_SecondsFromNow,
    data: '2016-10-19'
  });
});
