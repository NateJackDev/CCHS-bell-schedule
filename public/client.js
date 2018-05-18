// client-side js
$(document).ready(function() { // When the DOM loads, Then the JS
  // =================
  // ALL THE FUNCTIONS
  // =================

  // Moment.js input => Date or Time
  function Dates(config){
    return moment().format(config)
  }

  // Takes an integer and adds a zero if it is 0-9
  function zero_out(n){
    return n > 9 ? "" + n: "0" + n;
  }

  // Spaces => Understore | Uppercase => Lowercase
  function spaceU(str){
    // Placeholder initiated
    var string = str
    // 3,2,1, TAKEOFF
    return(string.replace(/[^A-Z0-9]/ig, "_").toLowerCase());
  }

  // Pushs the computed time duration to the DOM
  function dom_format(time,counter,obj,condit,text){ // Alot of inputs cause why not
    // Grabbing the element from the DOM
    var dom_e = document.querySelector("." + spaceU(counter) + '-' + time);
    // Grabbing the Bells from the DOM
    var noti = document.querySelector('.bell-' + time + '-' + spaceU(counter))
    // Condition if miliseconds are positive
    if(condit == true){
      // Lights, Camera, ACTION!
      dom_e.innerHTML = zero_out(obj._data.hours) + ":" + zero_out(obj._data.minutes) + ":" + zero_out(obj._data.seconds)
    }else if(condit == false){
      // And, Action!
      dom_e.innerHTML = text
      // You can ring my bell
      noti.innerHTML = '<i class="fas fa-bell fa-lg"></i>'
    }else{
      // Only here if things really go wrong
      console.log("If you let my error go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will error you.")
    }
  }

  // Output the time to the begin time
  function begin_format(obj,counter){
    var begin = find_time(([obj.begin.hour,obj.begin.min,0]).toString())
    if(check_time(begin._milliseconds) == true){
      dom_format('start',counter,begin,true)
    }else if(check_time(begin._milliseconds) == false){
      dom_format('start',counter,begin,false,"Started")
    }else{
      console.log("We’re gonna need a bigger boat!")
    }
  }

  // Output the time to the end time
  function end_format(obj,counter){
    var end = find_time(([obj.end.hour,obj.end.min,0]).toString())
    if(check_time(end._milliseconds) == true){
      dom_format('end',counter,end,true)
    }else if(check_time(end._milliseconds) == false){
      dom_format('end',counter,end,false,"Ended")
    }else{
      console.log("Luke, I am your father.")
    }
  }

  // The inputted unix time => negative or positive
  // If so positive returns true
  // and negative returns false
  function check_time(time){ // Input the unix difference
    // Condition if it is >= to 0(+)
    if(time >= 0){
      // Deployed
      return true
    // Condition if it is < 0(-)
    }else if(time < 0){
      // Mission Complete
      return false
    // When bad things happen
    }else{
      // Yelling
      console.log("Play it again, Sam.")
    }
  }
  
  // Finds the schedule and initializes its protocal
  // Inputs the day and grabs the schedule. Then we runs the loops on the functions
  function schedule_time(type,json){
    // Condition for the regular schedule
    if(type == 'r'){
      // For looping the schedule to fun functions of the begin and end time
      for(var a in json.regular){
        // Begining Time 
        begin_format(json.regular[a],a)
        end_format(json.regular[a],a)
      }
    // Condition for the Chapel/Pep Schedule
    }else if(type == 'c'){
      for(var b in json.chapel_pep){
        begin_format(json.chapel_pep[b],b)
        end_format(json.chapel_pep[b],b)
      }
    // Condition for the Weekend
    }else if(type == 'w'){
      console.log("It's the Weekend")
    }else{
      console.log("Houston, I think we have a problem")
    }
  }
  
  // Function that inputs the current time and tells how long away it is
  function find_time(time) {
    // Saving Private Input
    var event = moment(time, 'H,m,s').unix(), // In Unix so you can do some operations
      // Getting the current time in unix time
      current = moment().unix(),
      // Computer is calculating the difference of the two
      diffTime = moment.duration((event - current) * 1000, 'milliseconds')
    // Are you kidding me, I'm still gonna send it
    return(diffTime)
  }

  // The Top on Clock
  function clock(){
    // Grab the clock selector
    var clock = document.querySelector('.time')
    // Output to the selector 
    clock.innerHTML = Dates('MMMM Do YYYY, h:mm:ss A')
  }
  
  // Everyone needs an answer and I am here to answer
  // It just tells you what today's schedule is going to be
  function schedule_name(c){ // Input Day as integer
    // Shorten the day grabber 'cuz I ain't gonna type the whole thing out
    var o = Dates('d')
    // Condition for the Regular Schedule
    if(o == 1 || o == 3 || o == 4 || o == 5){
      // Long Version
      if(c == true){
        // Rereturn the schedule
        return("regular")
      // Short Version
      }else if(c == false){
        // Returned
        return('r')
      // What happens when you don't listen
      }else{
        // Consequences of not working
        console.log("Not what I was expecting")
      }
    // Condition for the Chapel/Pep Days
    }else if(o == 2){
      if(c == true){
        // "Return to Sender"
        return("chapel_pep")
      // Condition for the short Chapel/Pep Days
      }else if(c == false){
        // The itty bitty version
        return('c')
      }else{
        // When I say Error, I mean Error
        console.log("Not what I was expecting")
      }
    // THE WEEKEND
    }else if(o == 0 || o == 6){
      // Condition for the long weekend
      if(c == true){
        // Long Weekend
        return("Weekend")
      // Condition for the short weekend
      }else if(c == false){
        // Shorter version of the weekend
        return('w')
      }else{
        // Sometimes referensed as an airbag
        console.log("Not what I was expecting")
      }
    }else{
      // And the Errors go to this guy
      console.log("Error")
    }
  }

  // create a sequence of variable names | ex. a1, a2, a3
  function muliVar(name,num){
    // For loop the number of time
    for (var i = 0; i < num; ++i) {
      // equal them to undefined
      var _var = name + i + " = undefined";
      // Eval expression
      eval(_var);
    }
  }

  // Error the User If no Start and End Output
  function error(){ // Input the selector and logging condition
    // Find the Selector
    var begin_to_end = document.querySelectorAll('.lab')
    // For loop the error to array of selectors
    for(var i in begin_to_end){
      // This is what happens when the countdown doesn't work, Timeout!
      if(begin_to_end[i].innerHTML == ""){
        // Put the Error in RED
        begin_to_end[i].innerHTML = "<span style='color: #f94e4e'>Error</span>"
      }
    }
  }

  // ====================
  // LET THE CODING BEGIN
  // ====================

  // Calling the Schedule, I hope it answers
  $.get("/schedule", function(sch){
    // Looking up the schedule and setting global schedule
    var s = eval("sch." + schedule_name(true))
    // School Name
    document.querySelector('.school_name').innerHTML = sch.info.name

    // Moments.js library shortcut
    var time = moment()
    
    // Find .per-out class
    var dom_output = document.querySelector('.per-out');

    // Display a column for every period
    for(var i in s){
      // Add to the DOM for every period
      dom_output.innerHTML += '<div class="row"><div class="col-md-4 p-4" align="center"><i>Starts:</i> <b><span class="' + spaceU(i) + '-start lab"></span></b></div><div class="col-md-4 p-4" align="center"><span class="bell-start-' + spaceU(i) + '"></span> <b class="per">' + i + '</b> <span class="bell-end-' + spaceU(i) + '"></span></div><div class="col-md-4 p-4" align="center"><i>Ends:</i> <b><span class="' + spaceU(i) + '-end lab"></span></b></div></div></span><hr />';
    };

    // When the ball drops it begins
    // Or when the page loads it starts
    (function interval(){

      // The clock uptop
      clock();

      // Schedule
      schedule_time(schedule_name(false),sch)

      // Error out if the Countdown doesn't show up
      error()

      // Updating every second
      setTimeout(interval,1000);
    })();


  });
});