(function () {
  "use strict";

  angular.module('common')
  .service('UserInfoService', UserInfoService);


  UserInfoService.$inject = ['MenuService'];
  function UserInfoService(MenuService) {
    var service = this;

    service.user = {};

    service.getFavourite = function (favourite) {
      return MenuService.getMenuItem(favourite).then(function (menuItem) {
        return menuItem;
      });
    }

  }


})();
