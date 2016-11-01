angular.module('starter.services', [])

.factory('Canteen', function($http, $q) {
    var canteens = null;

    function getCanteens() {
      var deferred = $q.defer();

      if (!canteens) {
        $http.get('http://skaljeghavemadpakkemedidag.mikkelricky.dk/.json')
          .success(function (data) {
            canteens = data;
            deferred.resolve(canteens);
          })
          .error(function (err) {
            deferred.reject(err);
          });
      }
      else {
        deferred.resolve(canteens);
      }

      return deferred.promise;
    }

    return {
      all: function() {
        return getCanteens();
      },
      get: function(date) {
        var deferred = $q.defer();

        getCanteens().then(
          function () {
            for (var i = 0; i < canteens.length; i++) {
              if (canteens[i].date === date) {
                deferred.resolve(canteens[i]);
              }
            }
            deferred.reject('Not found');
          },
          function error(err) {
            deferred.reject(err);
          }
        );

        return deferred.promise;
      }
    };
})

.factory('Menu', function($http, $q, localStorageService) {
  var canteen = localStorageService.get('canteen');
  var menu = localStorageService.get('menu');

  function getMenu(refresh) {
    var deferred = $q.defer();

    if (canteen && (refresh || !menu)) {
      $http.get(canteen.apiUrl)
        .success(function (data) {
          var oldMenu = angular.copy(menu);
          menu = {};

          for (var i = 0; i < data.menus.length; i++) {
            var date = new Date(data.menus[i].date);
            date = date.getTime();
            if (!menu[date]) {
              menu[date] = [];
            }

            data.menus[i].date = date;

            menu[date].push(data.menus[i]);
          }

          localStorageService.set('menu', menu);

          deferred.resolve(menu);
        })
        .error(function (err) {
          deferred.reject(err);
        });
    }
    else {
      deferred.resolve(menu);
    }

    return deferred.promise;
  }

  // Refresh.
  getMenu(true);

  return {
    save: function () {
      return localStorageService.set('menu', menu);
    },
    setCanteen: function (selectedCanteen) {
      canteen = selectedCanteen;
      localStorageService.set('canteen', canteen);
      getMenu(true);
    },
    all: function() {
      return getMenu();
    },
    get: function(date) {
      var deferred = $q.defer();

      getMenu().then(
        function () {
          for (var key in menu) {
            if (key === date) {
              deferred.resolve(menu[key]);
              return;
            }
          }
          deferred.reject('Not found');
        },
        function error(err) {
          deferred.reject(err);
        }
      );

      return deferred.promise;
    }
  };
});
