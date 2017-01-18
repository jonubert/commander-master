myApp.controller('addQuestionController', addQuestionController);
myApp.controller('LoadAllQuestionsController', LoadAllQuestionsController);

/************** Start LoadAllQuestionsController  ***************/
function LoadAllQuestionsController( $scope, $http) {
  var qNumber=0;
  var response;
  loadTheQuestions();

  /* function: loadTheQuestions()
   *  This is called when the screen view is shown abd loads
   *  all the questions from the database.
   *  The questions are returned as an array in the 'response' variable.
   *  They can be accessed by going two more levels
   *  response->data[]->json_returned_key_name
   */
  function loadTheQuestions(){
      var myData = $http({
          method: 'POST',
          url: "php/load_all_questions.php",
          headers:{'Content-type': "application/x-www-form-urlencoded"},
      })
      .then(
        //if it worked
      function (retData){
        response=retData;
        $scope.id=response.data[0]._ID;
        $scope.QN=response.data[0].QuestionNumber;
        $scope.QT=response.data[0].QuestionText;
        $scope.A1=response.data[0].Answer1;
        $scope.A2=response.data[0].Answer2;
        $scope.A3=response.data[0].Answer3;
        $scope.A4=response.data[0].Answer4;
        $scope.A5=response.data[0].Answer5;
        $scope.CA=response.data[0].CorrectAnswer;
        $scope.TS=response.data[0].TimeStamp;
        console.log("loadTheQuestions response:");
        console.log(response.data);
      },
      function (error){
        //handle the error - often it is a quote in a string
        $scope.theResponse = "Error = " + error;
        console.log($scope.theResponse);
      });
    }
/*End************************************************************/


/* function: revealAnswer()
* This function pushed the currently viewed question's answer
* to the player database column CurrentQuestionCorrectAnswer.
* This event should trigger the player view to reveal the answer
* and whether or not they were correct.
*/

$scope.revealAnswer = function(){
      var myData = $http({
          method: 'POST',
          url: "php/reveal_the_answer.php",
          headers:{'Content-type': "application/x-www-form-urlencoded"},
          data: {
            'CA': $scope.CA
          }
      })
      .then(
      function (response){
        console.log("revealAnswer() Response =");
        console.log(response.data);
      },
      function (error){
        $scope.theResponse = "Error = " + error;
        console.log($scope.theResponse);
        //handle the error
      });
  }
/*End************************************************************/

/* function: pushQuestion()
* This function pushed the currently viewed question's multiple choice
* answers to the player database so that the next poll of the player
* database by the player app will load the current question's answers.
*/

$scope.pushQuestion = function(){
      var myData = $http({
          method: 'POST',
          url: "php/push_the_question.php",
          headers:{'Content-type': "application/x-www-form-urlencoded"},
          data: {
            'A1': $scope.A1,
            'A2': $scope.A2,
            'A3': $scope.A3,
            'A4': $scope.A4,
            'QT': $scope.QT,
            'QN': $scope.QN
          }
      })
      .then(
      function (response){
        console.log("pushQuestion Response =");
        console.log(response.data);
      },
      function (error){
        $scope.theResponse = "Error = " + error;
        console.log($scope.theResponse);
        //handle the error
      });
  }
/*End************************************************************/

/**
* function: clearQuestion()
* This function clears all the answers for all the players in
* the playertable.
UPDATE playertable SET answer1 = 0;
**/
$scope.clearQuestion = function(){
  var myData = $http({
      method: 'GET',
      url: "php/clear_the_question.php",
      headers:{'Content-type': "application/x-www-form-urlencoded"},
  })
  .then(
  function (retData){
    $scope.response=retData;
    console.log("Response = " + $scope.response.data);
  },
  function (error){
    $scope.theResponse = "Error = " + error;
    console.log($scope.theResponse);
    //handle the error
  });
}
/*End************************************************************/


/*function: update()
* This is the function that is used to update an existing question in the database.
*  It also updates the existing reponse data array so that toggling thru will not
* show the old values.
*/
  $scope.update = function(){
    //Below updates the  existing data in the local stored array
    response.data[qNumber].QuestionNumber=$scope.QN;
    response.data[qNumber].QuestionText=$scope.QT;
    response.data[qNumber].Answer1=$scope.A1;
    response.data[qNumber].Answer2=$scope.A2;
    response.data[qNumber].Answer3=$scope.A3;
    response.data[qNumber].Answer4=$scope.A4;
    response.data[qNumber].CorrectAnswer=$scope.CA;
    console.log("in update");
    //"theData" below is the data passed to the php file
    var myData = $http({
        method: 'POST',
        url: "php/update_question.php",
        headers:{'Content-type': "application/x-www-form-urlencoded"},
        data: {
          'QN': $scope.QN,
          'QT': $scope.QT,
          'A1': $scope.A1,
          'A2': $scope.A2,
          'A3': $scope.A3,
          'A4': $scope.A4,
          'CA': $scope.CA,
          'QID': $scope.id

        }
    })
    .then(
    function (response){
      console.log(" Update Question Response =");
      console.log(response.data);
    },
    function (error){
      console.log("Error");
      $scope.theResponse = "Error = " + error;
      console.log($scope.theResponse);
      //handle the error
    });
  }
/*End************************************************************/

  /*  function:getPrevious()
  *    Steps thru the data returned from the database in reverse order
  */
    $scope.getPrevious = function(){
        qNumber=qNumber-1;
        if(qNumber<0){
          qNumber=0;
        }
        $scope.getQuestionNumber();
    }

    /*  function:getNext()
    *  Steps thru the data returned from the database in forward order
    */
    $scope.getNext = function(){
      qNumber=qNumber+1;
      if(qNumber>response.data.length-1){
        qNumber=response.data.length-1;
      }
      $scope.getQuestionNumber();
    }

  /*
  * This function loads the view with the data associated with the
  * array element "qNumber".  qNumber is a global variable in this
  * controller. It is called by the getPrevious() and getNext() functions.
  */
  $scope.getQuestionNumber=function(){
    $scope.id=response.data[qNumber]._ID;
    $scope.QN=response.data[qNumber].QuestionNumber;
    $scope.QT=response.data[qNumber].QuestionText;
    $scope.A1=response.data[qNumber].Answer1;
    $scope.A2=response.data[qNumber].Answer2;
    $scope.A3=response.data[qNumber].Answer3;
    $scope.A4=response.data[qNumber].Answer4;
    $scope.CA=response.data[qNumber].CorrectAnswer;
    $scope.TS=response.data[qNumber].TimeStamp;
  }

  /* FunctionL loadPlayers:
   *
   */
  $scope.loadPlayers = function(){
      var myData = $http({
          method: 'GET',
          url: "php/load_all_players.php",
          headers:{'Content-type': "application/x-www-form-urlencoded"},
      })
      .then(
        //if it worked
      function (playerList){
        $scope.players=playerList.data;
        console.log($scope.players);
      },
      function (error){
        //handle the error - often it is a quote in a string
        $scope.players = "Error = " + error;
        console.log($scope.players);
      });
    }
/********End of loadplayers() function ******/
/********************************************/



}
/************** End of LoadAllQuestionsController  ***************/
/****************************************************************/


/************** Start of addQuestionController ***************/
function addQuestionController($scope, $http, $httpParamSerializerJQLike){
  $scope.addIt = function(){
    var theData ="q_number="+$scope.q_number
                +"&q_text="+$scope.q_text
                +"&q_a1="+$scope.q_a1
                +"&q_a2="+$scope.q_a2
                +"&q_a3="+$scope.q_a3
                +"&q_a4="+$scope.q_a4
                +"&correct_answer="+$scope.correct_answer;
    var myData = $http({
        method: 'POST',
        url: "php/add_question.php",
        headers:{'Content-type': 'application/x-www-form-urlencoded'},
        data: theData
    })
    .then (function (response){
      $scope.questionData=response.data;
      $scope.theResponse=response.data;
      console.log(response.data);

    }, function (error){
    //  $scope.theResponse = "Error = " + error;
      //handle the error
      console.log(response.data);
    });
  }
}

/************** httpFetchQuestionController   ***************/
/*
This controller (should be a service) is used to fetch a single question from
        DB: wintercamp, TABLE:questiontable

*/

/************** NOT VALID addQuestionControllerOld  ***************/
/*
  This was for testing purposes
*/
function addQuestionControllerOld($scope, $http){
  $scope.addIt = function(){
      var tryThis="222";
      var someNum="111";
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $http.post("php/add_question.php", "q_number=" + encodeURIComponent(someNum)+"&q_text="+encodeURIComponent(tryThis))
      .then(function(response){
        alert("name - " + response.data);
      }, function (error){
        alert(error);
      });
  }
}
/************** End of NOT VALID addQuestionControllerOld  ***************/
