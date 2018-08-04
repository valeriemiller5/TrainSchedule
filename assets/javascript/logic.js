var config = {
    apiKey: "AIzaSyDkjrMM6fBwm5kMNozqJAc9RINx_xpTPP8",
    authDomain: "train-schedule-af397.firebaseapp.com",
    databaseURL: "https://train-schedule-af397.firebaseio.com",
    projectId: "train-schedule-af397",
    storageBucket: "train-schedule-af397.appspot.com",
    messagingSenderId: "373917250161"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("LT");
    var trainFrequency = $("#freqTime").val().trim();
    var newTrain = {
      name: trainName,
      destination: destinationInput,
      time: trainTime,
      frequency: trainFrequency
    };
    
    database.ref().push(newTrain);

    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  $("#trainName").val("");
  $("#destinationInput").val("");
  $("#trainTime").val("");
  $("#freqTime").val("");
  });

  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var trainName = snapshot.val().name;
    var destinationInput = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;
  
    console.log(trainName);
    console.log(destinationInput);
    console.log(trainTime);
    console.log(trainFrequency);

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("LT"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);
    var timeUntilTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + timeUntilTrain);
    var nextTrain = moment().add(timeUntilTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("LT");
    console.log("NEXT TRAIN ARRIVES AT: " + nextTrainTime);
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destinationInput),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrainTime),
      $("<td>").text(timeUntilTrain)
    );
    $("#trainTable > tbody").append(newRow);
  });