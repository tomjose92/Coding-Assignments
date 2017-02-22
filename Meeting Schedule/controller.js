app.controller("CalendarController", function($scope,loadJSON,$timeout) {
	$scope.jsonURL = "json/calendar.json";
	$scope.data = [];
	$scope.setMeetings = [];
	$scope.calendarHeight=0;
	$scope.timeticks;
	$scope.showApp = false;
	$scope.noOfColumns = 0;	
	$scope.loading=false;
	$scope.fileMessage=false;	
	
	getViewPort = function() {
 		var windowDetails={};
 		windowDetails.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
 		windowDetails.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
 		return windowDetails;
	}

	$scope.windowDetails = getViewPort();
	
	$scope.maxWidth=Math.max($scope.windowDetails.width,500)-35-20;
	console.log($scope.maxWidth);

	console.log($scope.windowDetails);

	

	getTimeTicks = function(){
		var timetickArr = [];
		for(var i=0;i<=720;i+=30)
		{
			var obj={};
			obj.value = i;
			obj.minutes = i%60;
			obj.hours = i/60;
			obj.hours = (obj.minutes==30)?obj.hours-0.5:obj.hours;
			if(obj.minutes.toString().length==1)
			{
				obj.minutes+="0";
			}
			timetickArr.push(obj);
		}
		$scope.timeticks = timetickArr;
	}

	setLeftValue=function(meeting)
	{
		var position = 0;
		var setMeetings = angular.copy($scope.setMeetings);
		for(var i=0;;i++)
		{
			var setMeeting = setMeetings[i];
			var filteredMeetings = setMeetings.filter(function(a){
	   				return a.position == i;
   			});
   			if(filteredMeetings.length==0)
   			{
   				position=i;
   				break;
   			}
   			var lastMeeting = filteredMeetings[filteredMeetings.length-1];
   			if(lastMeeting.end <= meeting.start)
   			{
   				position=i;
   				break;
   			}
		}
		meeting.position = position;
		return meeting;
	}

	getCalendar = function(response)
	{
		var noOfColumns = 0;
		var data=[];
		$scope.setMeetings = [];
		response.sort(function(a, b){
        	startA = parseInt(a.start);
        	startB = parseInt(b.start);
        	if(startB < startA)
        	{
        		return 1
        	}

        	if(startB > startA)
        	{
        		return -1
        	}
        	
    	});

		for(var i=0;i<response.length;i++)
		{
			var meeting = response[i];
			meeting.meeting_id =i+1;
			meeting.start=parseInt(meeting.start);
			meeting.end=parseInt(meeting.end);
			var start = meeting.start;
			var end = meeting.end;

			if(start<0 || end>720 || start>end)
			{
				meeting.message = "Invalid Timings";
				data.push(meeting);
				continue;
			}

			if($scope.calendarHeight<end)
			{
				$scope.calendarHeight=end;
			}
			
			var mins = end-start;
			meeting.mins=mins;
			meeting.top = start+15+"px";
			meeting.height = mins + "px";
			meeting.text_height = (mins-15)/2 + 'px';
			meeting.endMinutes = Math.floor(end%60);
			meeting.endHours = Math.floor(end/60);
			if(meeting.endMinutes.toString().length==1)
			{
				meeting.endMinutes+="0";	
			}

			meeting.startHours = Math.floor(start/60);
			meeting.startMinutes = Math.floor(start%60);
			if(meeting.startMinutes.toString().length==1)
			{
				meeting.startMinutes+="0";
			}

			meeting = setLeftValue(meeting);
			if(noOfColumns<meeting.position)
			{
				noOfColumns=meeting.position;
			}

			meeting.isValid=true;
			data.push(meeting);
			$scope.setMeetings.push(meeting);
		}
		$scope.columnWidth = ($scope.maxWidth-100)/(noOfColumns+2);
		console.log($scope.columnWidth);
    	return data;
	}

	getJSON = function()
	{
		$scope.loading=true;
		loadJSON($scope.jsonURL).success(function(response){
			$scope.data = getCalendar(response);
			$timeout(function () {
       			$scope.loading=false;
			},2000);
        }).error(function(){
         
        });
	}

	$scope.importAgenda = function(){
		$scope.fileMessage="";
    	var files = document.getElementById('selectCalendar').files;

    	if (files.length <= 0 || files[0].name.indexOf(".json")<0) {
  			$scope.fileMessage="Please choose a JSON file";
    		return false;
  		}
  		
  		$scope.loading=true;

	  	var fr = new FileReader();
	  	fr.readAsText(files.item(0));
  		fr.onload = function(e) { 
  			var result; 
  			try{
    			result = JSON.parse(e.target.result);
    			var formatted = getCalendar(result);
        		$scope.data=formatted;
        		$timeout(function () {
        			$scope.loading=false;
        		},5000);
    		}
    		catch(e)
    		{
    			$scope.fileMessage="Error Parsing JSON File";
    			$timeout(function () {
        			$scope.loading=false;
        		},0);
    			console.log($scope.loading);
    		}
    		var selectElement = angular.element(document.getElementById('selectCalendar'));
    		selectElement.val('');
  		}  		
	};

	getTimeTicks();
	getJSON();
});
