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
      console.log(JSON.stringify(data));
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
        text: menuItem.description,
        at: (new Date(menuItem.date)).getTime() - 5 * 60 * 60 * 1000,
        data: menuItem.date
      });
    }
    else {
      console.log('cancel 1');

      cordova.plugins.notification.local.cancel(1);
    }

    console.log(Menu.save());
  };
})

.controller('PromptCtrl', function($scope, $location, Canteen, Menu, localStorageService) {
  if (localStorageService.get('canteen')) {
    $location.path('/tab/menu');
    return;
  }

  Canteen.all().then(
    function (data) {
      $scope.canteens = data;
    },
    function (err) {
      console.log(err);
    }
  );

  $scope.run = function run() {
    if (!$scope.selectedCanteen) {
      alert('Vælg kantine')
    }

    for (var canteen in $scope.canteens) {
      canteen = $scope.canteens[canteen];

      if (canteen.name === $scope.selectedCanteen) {
        Menu.setCanteen(canteen);
        break;
      }
    }

    $location.path('/tab/menu');
  };
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
