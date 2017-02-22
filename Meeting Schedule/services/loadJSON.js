app.service('loadJSON', function($http) {
	return loadData = function(url){
	  	return $http({
    		url: url, 
    		method: "GET",
 		})
    	.success(function(data) { 
    		return data; 
    	}) 
    	.error(function(err) { 
    		return err; 	
    	});
    }
});
