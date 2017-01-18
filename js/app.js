/* setup your angular app here */

// debug stuff to show the app is loading and fruit / veggies are available
console.log('App Started');
console.log('Fruit count', fruits.length);
console.log('Veggie count', vegetables.length);
console.log(vegetables.sort());
console.log(fruits.sort());

var app = angular.module('myApp', []);

app.controller('myCtrl', ['$scope', function($scope){
  var sortedVeggies = vegetables.sort();
  var sortedFruits = fruits.sort();
  console.log(sortedVeggies.length);
  console.log(sortedFruits.length);
  $scope.fruits = [];
  $scope.veggies = [];
  $scope.pool = shuffle(fruits.concat(vegetables));

  $scope.click = function(destination, idx, current){
    $scope[destination].push($scope[current][idx]);
    $scope[current].splice(idx, 1);
  }

  $scope.check = function(currentArray, currentItem){
    if(currentArray === 'fruits'){
      if(fruits.indexOf(currentItem) === -1){
        return true;
      }
    } else {
      if(currentArray === 'vegetables'){
        if(vegetables.indexOf(currentItem) === -1){
          return true;
        }
      }
    }
  }

  $scope.moveUp = function(currentArray, idx, identity){
    if(idx === 0){
      return;
    }
    var temp = currentArray[idx - 1];
    currentArray[idx - 1] = currentArray[idx]; 
    currentArray[idx] = temp;
  }

  $scope.moveDown = function(currentArray, idx, identity){
    if(idx === currentArray.length - 1){
      return;
    }
    var temp = currentArray[idx + 1];
    currentArray[idx + 1] = currentArray[idx]; 
    currentArray[idx] = temp;
  }

  $scope.checkAnswers = function(){
    if($scope.pool.length > 0){
      alert('you still have unsorted foods!');
    } else {
      var fruits = compare($scope.fruits, sortedFruits, 'fruits');
      var veggies = compare($scope.veggies, sortedVeggies, 'veggies');
      if(fruits === true && veggies === true){
        alert('You did it!!!!!');
      }
    }

  }
}]);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function compare(array, sortedArray, name){
  console.log('compare!!');
  for(var i = 0; i < array.length; i++){
    if(array[i] !== sortedArray[i]){
      alert(name +' Not in alphabetic order!!');
      return false;
    } 
  }
  alert(name + ' have been sorted! good work.');
  return true;
}
