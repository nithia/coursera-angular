(function () {
  "use strict";

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('MenuApiUrl', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nidCtrl = this;


    nidCtrl.narrowSearch = function () {

      MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm).then(function (result) {
        nidCtrl.found = result;
      });
    };

    nidCtrl.removeItem = function (index) {
      nidCtrl.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'MenuApiUrl'];
  function MenuSearchService($http, MenuApiUrl) {
    var service = this;

    var makeFilter = function (searchTerm) {
      var lowerSearch = searchTerm ? searchTerm.toLowerCase() : searchTerm;
      return function (item) {
        return searchTerm && searchTerm.length > 0 ?
               item.description.toLowerCase().indexOf(lowerSearch) > -1  || item.name.toLowerCase().indexOf(lowerSearch) > -1 :
               false;
      }
    };

    var compareNames = function (a, b) {
      var aName = a.name.toLowerCase();
      var bName = b.name.toLowerCase();

      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
    };

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: MenuApiUrl
      })
      .then(function (response) {
        console.log("HTTP response", response);
        return response.data.menu_items.filter(makeFilter(searchTerm)).sort(compareNames);
      })
      .catch(function (error) {
        console.log("Something went wrong", error);
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }


  function FoundItemsDirectiveController() {
    var list = this;

    list.logItems = function () {
      console.log("Items", list.foundItems);
    };

  }

})();
