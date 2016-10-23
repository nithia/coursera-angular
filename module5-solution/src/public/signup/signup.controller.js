(function () {
  "use strict";

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['UserInfoService'];
  function SignupController(UserInfoService) {
    var signupCtrl = this;

    signupCtrl.favouriteInvalid = false;

    signupCtrl.user = UserInfoService.user;

    signupCtrl.submit = function () {
      var favourite = signupCtrl.user.favourite;
      if (favourite && favourite.trim()) {
        favourite = favourite.toUpperCase();
        UserInfoService.getFavourite(favourite).then(function (menuItem) {
          signupCtrl.user.favouriteItem = menuItem;
          signupCtrl.signupDone = !!menuItem;
          signupCtrl.favouriteInvalid = !menuItem;
        });
      }
      else {
        signupCtrl.favouriteInvalid = false;
        signupCtrl.signupDone = true;
      }
    }
  }
})();
