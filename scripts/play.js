app = angular.module('juegoApp', []);

app.controller('JuegoCtrl', ['$scope', '$timeout', '$rootScope',  function($scope, $timeout, $rootScope){

  window.open('controles.html', this.target, 'width=400,height=600');  

  $scope.rondaActualIndex = 0;
  $scope.preguntaActualIndex = 0;
  $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
  $scope.finPregunta = false;

  $scope.strikeActive = false;

  $scope.strikeCount = 0;
  $scope.aciertos = 0; 
  $scope.turnoTeam = 0;
  $scope.puntosTeam1 = 0;
  $scope.puntosTeam2 = 0;
  $scope.puntosPregunta = 0;
  $scope.robo = false;

  var audioEntrada = new Audio('audios/entrada.mp3');
  var audioRespuestaCorrecta = new Audio('audios/correcto.mp3');
  var audioRespuestaIncorrecta = new Audio('audios/incorrecto.mp3');
  var audioGana = new Audio('audios/gana.wav');

  $scope.openRespuesta = function(index){
    var respuesta = $scope.preguntaActual.respuestas[index];
    if(!respuesta.opened){
      audioRespuestaCorrecta.play();    
      $timeout(function(){      
        respuesta.opened = true;
        $scope.aciertos ++;
        updatePuntosPregunta(respuesta.numero);
        if(!$scope.finPregunta && ($scope.aciertos == $scope.preguntaActual.respuestas.length || $scope.robo)){
          setPuntos();
          audioGana.loop = true;
          audioGana.play();
          $timeout(function(){ audioGana.loop = false; }, 2000);
          $scope.finPregunta = true;
        }
      }, 1000);    
    }
  }

  $scope.strike = function(){
    if($scope.finPregunta) return;

    if($scope.strikeCount < 3){
      $scope.strikeCount = $scope.strikeCount + 1;      
      audioRespuestaIncorrecta.play();
      $timeout(function(){
        $scope.strikeActive = true;
        $timeout(function(){
          $scope.strikeActive = false;

          if($scope.aciertos == 0){
            $scope.strikeCount = 0;
          }

          if($scope.strikeCount == 3){
            cambioTurno();
            $scope.robo = true;
            $scope.strikeCount = 0;
          }else if($scope.robo){
            cambioTurno();
            setPuntos();
            audioGana.loop = true;
            audioGana.play();
            $timeout(function(){ audioGana.loop = false; }, 2000);
            $scope.finPregunta = true;
          }
        }, 1000); 
      }, 750);   
    }
  }

  $scope.setRonda = function(index){
    $scope.rondaActualIndex = index;
    restartCounters();    
    $scope.puntosTeam1 = 0;
    $scope.puntosTeam2 = 0;
  }

  $scope.setPregunta = function(index){
    $scope.preguntaActualIndex = index;
    restartCounters();
    $scope.preguntaActual = rondas[$scope.rondaActualIndex].preguntas[$scope.preguntaActualIndex];
  }

  $scope.setTurnoTeam = function(team){
    $scope.turnoTeam = team;
  }

  $scope.iniciar = function(){
    audioEntrada.play();
  }

  var cambioTurno = function(){
    $scope.turnoTeam = $scope.turnoTeam == 1 ? 2 : 1;
  }

  var setPuntos = function(){       
    $scope['puntosTeam' + $scope.turnoTeam] += ($scope.puntosPregunta) * ($scope.preguntaActualIndex + 1);
  }

  var updatePuntosPregunta = function(puntos){
    if(!$scope.finPregunta){
      $scope.puntosPregunta += puntos;
    }
  }

  var restartCounters =  function(){
    $scope.strikeCount = 0;
    $scope.aciertos = 0; 
    $scope.turnoTeam = 0;
    $scope.puntosPregunta = 0;
    $scope.robo = false;
    $scope.finPregunta = false;
  }

  }]);


events = {

  strike: function(){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.strike();
    });
  },

  openRespuesta: function(index){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.openRespuesta(index);
    });
  },

  setRonda: function(index){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.setRonda(index);
    });    
  },

  setPregunta: function(index){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.setPregunta(index);
    });
  },

  setTurnoTeam: function(team){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.setTurnoTeam(team);
    });
  },

  inicio: function(){
    var scope = angular.element(document.getElementById("container")).scope();
    scope.$apply(function () {
      scope.iniciar();
    });
  }

}