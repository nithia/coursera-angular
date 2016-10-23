(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserInfoService'];
  function MyInfoController(UserInfoService) {
    var infoCtrl = this;

    infoCtrl.user = UserInfoService.user;
    infoCtrl.signupDone = !!infoCtrl.user.firstName;
  }

})();
