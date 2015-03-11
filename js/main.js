$(document).ready(function(){
	
//All pages============================================

	//Display user IP address in footer
	$.ajax({
		url: 'https://httpbin.org/get',
		type: 'GET',
		dataType: 'json'
	})
	  .done(function( data ) {
	      console.log(data.origin);
		  var userIP = $('#ip');
		  userIP.append( 
				'<p>'
				+ 'Your IP Address: '
				+ data.origin
				+ '</p>'
				);	
	})


//Index Page=====================================================

	//Use local storage to store and retrieve first/last name and course title
	localStorage.setItem('me', JSON.stringify({
    firstName: 'Melissa',
    lastName: 'Thompson',
    courseTitle: 'ICT 4510 - Advanced Website Design'
}));

	$('#locStorageA').click(function(event){
		event.preventDefault();
		var locStorageDiv = $('#locStorageDiv');
		var locStorageValues = JSON.parse(localStorage.getItem('me'));
		console.log(locStorageValues);
		locStorageDiv.append( 
							'<div class = "locStorageValues">'
							+ locStorageValues.firstName
							+ ' '
							+ locStorageValues.lastName
							+ ' says '
							+ locStorageValues.courseTitle
							+ ' ROCKS!'
							+ '</div>'
							);
	});







//Contact Page JS================================================

	//Listen for user to submit form
	$('#form').submit(function(event) {//make sure you're calling the form, not the button. :)
		event.preventDefault();

		//store both field value
		var myName = $("input#name").val();

		//store email field value
	 	var myEmail = $("input#email").val();

	 	//store option field value
	  	var myOptions = $("input:radio[name=options]:checked").val();

	  	/*store professional field value
	  	if( $("input:radio[name=professional]:checked" ).val()){
	  		var myProfessional = 'Professional';
	  	}

	  	//store both field value
	  	 if($("input:radio[name=both]:checked" ).val()){
	  	 	var myBoth = "Both personal and professional";
	  	 }
	  	 */

	  	//store interest field value
	  	var myInterest = $("select#interest").val();

		//store description field value
	  	var myDescription = $("textarea#description").val();

		//submit form
	  	submitForm(myName, myEmail, myDescription, myOptions, myInterest);
	 	//console.log(myName, myEmail, myDescription, myPersonal, myProfessional, myBoth, myInterest);

	 });



	//Send/post form values to httpbin
	function submitForm(myName, myEmail, myDescription, myOptions, myInterest) {

		$.ajax({ 
			url:'https://httpbin.org/post', 
			type: 'POST', 
			data:{ description:myDescription,interest:myInterest,options:myOptions,email:myEmail,name:myName },
			dataType: 'json',
			success: function(response){				

				function render(form){

					var formThanks = $('.formThanks');
					var formResults = $('.formResults');
					formResults.empty();//replaces the results each time the form is submittted.
					formThanks.append('<div><h2>Here\'s what you submitted...</h2></div><div><h2>I\'ll be in touch soon!</h2></div>');
					$.each(response.form, function(key, val){ 
						formResults.append(
							'<div class = "formName">'
							+ val
							+ '</div>'
							);

						console.log(key + ": " + val);
						
					})

				}				

				render(response);

			}
		})

	};



//Solutions Page============================

	var flickrUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=snowboard&format=json&jsoncallback=?'


	window.addEventListener('load', function () {
		retrieveImages(flickrUrl);
	}, false);

	//Retrieve and parse flickr API
	function retrieveImages(query) {
		var url = encodeURI(flickrUrl);
		$.ajax({
			url: url,
			dataType: 'jsonp'
		})
		.done(function(response){
			console.log(response);
			render(response);
		})

	};

	//Render Images on HTML page
	function render(response) {
		var results = $('.flickrResults');
		$.each(response.items, function(key, val){
			console.log(val);
			results.append(
				 '<div class  = "pic">'
				+ '<div class = "picTitle">'
				+ val.title
				+ '</div>'
				+ '<div class = "picLink">'
				+ '<a href="'
				+ val.link
				+ '">'
				+ val.link
				+ '</a>'
				+ '</div>'
				+'<div class = "picDesc">'
				+ val.description
				+ '</div>'
				+'<div class = "picPub">'
				+ val.published
				+ '</div>'
				+'<div class = "picAuthor">'
				+ val.author
				+ '</div>'
				+ '</div>'
				);
		})
	};

	
				

// END $(document).ready(function(){
});



