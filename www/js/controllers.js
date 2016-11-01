angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, Menu, $filter, localStorageService) {
  $scope.$on('$ionicView.enter', function(e) {
    Menu.all().then(
      function (data) {
        $scope.menu = data;

        $scope.colors = [ '#deb959', '#d54444', '#d874a2', '#ed885f', '#9783b7', '#090916', '#2a2447'];
      },
      function (err) {
        //console.log(err);
      }
    );

    // Load stars
    $scope.stars = localStorageService.get('stars');
    if (!$scope.stars) {
      $scope.stars = [];
    }
  });

  $scope.star = function (date, menu) {
    if ($scope.stars.indexOf(date) !== -1) {
      $scope.stars.splice($scope.stars.indexOf(date), 1);
      cordova.plugins.notification.local.cancel(date);
    }
    else {
      $scope.stars.push(date);

      var menuTitles = [];
      for (var i = 0; i < menu.length; i++) {
        menuTitles.push(menu[i].name);
      }

      if (localStorageService.get('enabled_notifications')) {
        cordova.plugins.notification.local.schedule({
          id: date,
          title: "Husk maden i kantinen i morgen!",
          text: "På menuen i morgen: " + menuTitles.join(', '),
          at: date - 5 * 60 * 60 * 1000,
          data: date
        });
      }
    }

    localStorageService.set('stars', $scope.stars);
  };
})

.controller('PromptCtrl', function($scope, $location, Canteen, Menu, localStorageService) {
  $scope.$on('$ionicView.enter', function(e) {
    if (localStorageService.get('canteen')) {
      $location.path('/tab/menu');
      return;
    }

    Canteen.all().then(
      function (data) {
        $scope.canteens = data;
      },
      function (err) {
        //console.log(err);
      }
    );
  });

  $scope.run = function run() {
    if (!$scope.selectedCanteen) {
      alert('Vælg kantine');
      return;
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
  $scope.$on('$ionicView.enter', function(e) {
    $scope.date = $stateParams.menuId;

    Menu.get($scope.date).then(
      function (data) {
        $scope.menu = data;
      },
      function (err) {
        //console.log(err);
      }
    );
  });
})

.controller('SettingsCtrl', function($scope, localStorageService, $location) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.notificationsEnabled = localStorageService.get('enabled_notifications');
  });

  $scope.resetCanteen = function () {
    localStorageService.set('canteen', null);
    $location.path('/prompt');
  };

  $scope.toggleNotifications = function () {
    $scope.notificationsEnabled = !$scope.notificationsEnabled;
    localStorageService.set('enabled_notifications', $scope.notificationsEnabled);
  }
});
