var app = angular.module('TarefasApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('principal', {
        url: '/',
        templateUrl: 'views/principal.html'
    });

    $stateProvider.state('novaTarefa', {
        url: '/',
        templateUrl: 'views/NovaTarefa.html'
    });

    $urlRouterProvider.otherwise('/');


});

app.controller('PrincipalCtrl', function ($scope, $tarefaDao) {

    $scope.tarefas = $tarefaDao.getTarefas();
    $scope.mostrarTerminadas = true;
    
    $tarefaDao.getTarefas().then(function (tarefas) {
        $scope.tarefas = tarefas;
    });
    
    $scope.filtroTarefas = function(tarefa) {
        if (tarefa.status == true && $scope.mostrarTerminadas == false) {
            return false;
        }
        return true;
    };
    
    $scope.filtrarTarefasTerminadas = function () {
        $tarefaDao.filtroTarefas();
    };
    
});

//app.controller('TarefaCtrl', function ($scope, $tarefaDao, $stateParams) {
//
//    $scope.produto = $tarefaDao.getTarefaById($stateParams.id);
//
//});


app.factory('$tarefaDao', function ($http, $q) {

    var tarefas = [];
    
    function getTarefas() {
        return $q(function (resolve, reject) {
            $http.get('tarefas.json').then(function (response) {
                tarefas = response.data;
                resolve(tarefas);
            });
        });
    }

    function getTarefaById(id) {
        for (var i = 0; i < tarefas.length; i++) {
            var tarefa = tarefas[i];
            if (tarefa.id == id) {
                return tarefa;
            }
        }
        return null;
    }

    return {
        getTarefas,
        getTarefaById
    };


    function removeTarefasTerminadas() {
        var temp = tarefas.filter((tarefa) => {
            return (!tarefa.status);
        });
        tarefas = temp;

    }

});