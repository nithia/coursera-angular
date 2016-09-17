(function () {
  "use strict";

  angular.module('LunchChecker', [])
      .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.message = "";
    $scope.textClass = "";
    $scope.inputClass = "";

    $scope.checkLunch = function () {
      var lunchState = getLunchState(countItems($scope.lunchItems));
      $scope.message = stateMessage(lunchState);
      $scope.textClass = stateText(lunchState);
      $scope.inputClass = stateInput(lunchState);
    };


    function countItems(csString) {
      var items = csString.split(',');
      items = removeEmpty(items);
      return items.length;
    }

    function stateMessage(lunchState) {
      if (lunchState == "NoData") {
        return "Please enter data first";
      }
      else if (lunchState == "OK") {
        return "Enjoy!";
      }
      else if (lunchState == "TooMuch") {
        return "Too much!";
      }
      else {
        return "";
      }
    }

    function stateText(lunchState) {
      if (lunchState == "NoData") {
        return "text-danger";
      }
      else if (lunchState == "OK" || lunchState == "TooMuch") {
        return "text-success";
      }
      else {
        return "";
      }
    }

    function stateInput(lunchState) {
      if (lunchState == "NoData") {
        return "has-error";
      }
      else if (lunchState == "OK" || lunchState == "TooMuch") {
        return "has-success";
      }
      else {
        return "";
      }
      
    }

    function getLunchState(itemCount) {
      if (itemCount == 0) {
        return 'NoData';
      }
      else if (itemCount <= 3) {
        return 'OK';
      }
      else {
        return 'TooMuch';
      }
    }
  }

  function removeEmpty(array) {
    var cleaned = [];
    for (var i = 0; i < array.length; i++) {
      var item = array[i].trim();
      if (item != "") {
        cleaned.push(item);
      }
    }
    return cleaned;
  }
})();
