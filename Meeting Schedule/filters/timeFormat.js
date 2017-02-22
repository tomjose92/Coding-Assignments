app.filter('timeFormat', function() {
    return function(x) {
    	if(x>=12)
    	{
    		return "pm";
    	}		
        else
        {
        	return "am";
        }
    };
});