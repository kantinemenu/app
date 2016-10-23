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
      console.log("getting fresh");

      
      $http.get(canteen.apiUrl)
        .success(function (data) {
          if (!menu) {
            menu = data.menus;
          }
          else {
            // Update the menu.
            for (var i = 0; i < data.menus.length; i++) {
              for (var j = 0; j < menu.length; j++) {
                if (menu[j].name === data.menus[i].name && menu[j].date === data.menus[i].date) {
                  data.menus[i].star = menu[j].star;
                  break;
                }
              }
            }

            menu = data.menus;
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
      console.log("saving: " + JSON.stringify(menu));
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
          for (var i = 0; i < menu.length; i++) {
            if (menu[i].date === date) {
              deferred.resolve(menu[i]);
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
