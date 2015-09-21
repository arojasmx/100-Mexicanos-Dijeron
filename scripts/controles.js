app = angular.module('juegoApp', []);

app.controller('ControlJuegoCtrl', ['$scope', '$timeout', '$rootScope',  function($scope, $timeout, $rootScope){

  $scope.rondaActualIndex = 0;
  $scope.preguntaActualIndex = 0;
  $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];

  $scope.sendStrike = function(){
    window.opener.events.strike();
  }

  $scope.sendOpenRespuesta = function(index){
    window.opener.events.openRespuesta(index);
  }

  $scope.sendNextRonda = function(){
    if($scope.rondaActualIndex < rondas.length - 1){
      $scope.rondaActualIndex = $scope.rondaActualIndex + 1;
      $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
      window.opener.events.setRonda($scope.rondaActualIndex);
      setPreguntaInicialDeRonda();
    }
  }

  $scope.sendPrevRonda = function(){
    if($scope.rondaActualIndex > 0){
      $scope.rondaActualIndex = $scope.rondaActualIndex - 1;
      $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
      window.opener.events.setRonda($scope.rondaActualIndex);
      setPreguntaInicialDeRonda();
    }
  }

  $scope.sendNextPregunta = function(){
    if($scope.preguntaActualIndex < rondas[$scope.rondaActualIndex].preguntas.length - 1){
      $scope.preguntaActualIndex = $scope.preguntaActualIndex + 1;
      $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
      window.opener.events.setPregunta($scope.preguntaActualIndex);
    }
  }

  $scope.sendPrevPregunta = function(){
    if($scope.preguntaActualIndex > 0){
      $scope.preguntaActualIndex = $scope.preguntaActualIndex - 1;
      $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
      window.opener.events.setPregunta($scope.preguntaActualIndex);
    }
  } 

  $scope.sendTurnoTeam = function(team){
    window.opener.events.setTurnoTeam(team);
  }  

  $scope.sendInicio = function(){
    window.opener.events.inicio();
  } 

  var setPreguntaInicialDeRonda = function(){
    $scope.preguntaActualIndex = 0;
    $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
    window.opener.events.setPregunta($scope.preguntaActualIndex);
  }

  }]);

/*
window.onbeforeunload = function (e) {
  e = e || window.event;
  if (e) {
    e.returnValue = 'Sure?';
  }
  return 'Sure?';
};*/