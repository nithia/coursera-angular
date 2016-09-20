(function () {
  "use strict";

  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyShoppingController', ToBuyShoppingController)
      .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.checkOffItem = function (itemIndex) {
      ShoppingListCheckOffService.checkOffItem(itemIndex);
    };

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var checkOffService = this;

    var itemsToBuy = [
      {
        name: "Cookies",
        quantity: "10 bags"
      },
      {
        name: "Coffee beans",
        quantity: "10 kg"
      },
      {
        name: "Chocolate",
        quantity: "6 bars"
      },
      {
        name: "Chips",
        quantity: "5 bags"
      },
      {
        name: "Beer",
        quantity: "99 bottles"
      }
    ];

    var boughtItems = [];

    checkOffService.checkOffItem = function(itemIndex) {
      var bought = itemsToBuy.splice(itemIndex, 1);
      boughtItems.push(bought[0]);
    };

    checkOffService.getItemsToBuy = function () {
      return itemsToBuy;
    };

    checkOffService.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();
