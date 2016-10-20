angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, Menu, $filter) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Menu.all().then(
    function (data) {
      $scope.menu = data;
    },
    function (err) {
      console.log(err);
    }
  );

  $scope.star = function (menuItem) {
    menuItem.star = !menuItem.star;

    if (menuItem.star) {
      console.log('Schedule til: ', $filter('date')((new Date(menuItem.date)).getTime() - 5 * 60 * 60 * 1000, 'medium'));

      cordova.plugins.notification.local.schedule({
        id: 1,
        title: menuItem.name,
        text: menuItem.details,
        at: (new Date(menuItem.date)).getTime() - 5 * 60 * 60 * 1000,
        data: menuItem.date
      });
    }
    else {
      console.log('cancel 1');

      cordova.plugins.notification.local.cancel(1);
    }
  };
})

.controller('PromptCtrl', function($scope) {
})

.controller('MenuDetailCtrl', function($scope, $stateParams, Menu) {
  Menu.get($stateParams.menuId).then(
    function (data) {
      $scope.menuItem = data;
    },
    function (err) {
      console.log(err);
    }
  );
})

.controller('SettingsCtrl', function($scope) {

});
