// JavaScript Document
$(document).ready(function()
{
			
			
		$(".use_camera").click(function(event){

				navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType : navigator.camera.PictureSourceType.CAMERA,
				correctOrientation : true });
			
				function onSuccess(imageURI) {
					//var image = document.getElementById('myImage');
					//image.src = imageURI;
					image = imageURI;
					alert(image + "image url");
					$("#report_issue #takenImage").attr('src',imageURI);
				}
				
				function onFail(message) {
					alert('Failed because: ' + message);
				}

			}); // camera fxn end 
		
		$(".insert_picture").click(function(event){

				navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
				correctOrientation : true });
			
				function onSuccess(imageURI) {
					image = imageURI;
					alert(image + "image url");
					$("#report_issue #takenImage").attr('src',imageURI);
				}
				
				function onFail(message) {
					alert('Failed because: ' + message);
				}

			}); // camera fxn end 
			
			
				$(".report_issue").on("tap", function(){
					$.mobile.changePage("#report_issue", {
						transition : "none"
					});
				}); // report_issue end.
				
				
		$(".iss_true").click(function(event) 
			{
				$.mobile.loading("show", {
				text : "Loading please wait...",
				textVisible : true,
				theme : "c"
		});

		var issueType = $("#report_issue #drop_down option:selected").text();
		var additional_info = $("#add_info").val();
		//alert(issueType +"===="+ gpsLatitude +"===="+ gpsLongitude +"===="+ image + "====" + country +" ====" + additional_info);
	
		var html='';
			$.ajax({
					type:"GET", 
					url:"http://192.168.1.43/gov311/?json=get_nonce&controller=posts&method=create_post", 
					dataType: "jsonp",
					success: function(data) {
							 	create_nonce = data.nonce;
								//alert(JSON.stringify(create_nonce));
							
							// Verify server has been entered
						  server = "http://192.168.1.43/gov311/?json=posts/create_post&api_key=123!@$&dev=1&nonce="+create_nonce+"&categories=gov-311&title=hello%20world%204&content="+encodeURI(additional_info)+"&status=publish&custom[issue_type]="+issueType+"&custom[lat]="+gpsLatitude+"&custom[long]="+gpsLongitude+"&custom[location]="+encodeURI(country);
		  
		  
				if (server) {
				
					// Specify transfer options
					var options = new FileUploadOptions();
					options.fileKey="file";
					options.fileName="test2.jpg";
					options.mimeType="image/jpeg";
					options.chunkedMode = false;
					
					// Transfer picture to server
					var ft = new FileTransfer();
					ft.upload(image, server, function(r) {
							//alert("Data successfully posted to server..." + JSON.stringify(r));
							$("#add_info").val('');
							$("#report_issue #takenImage").attr('src','');
							$("#full_address").html('ADDRESS');
							$("#gpsLat").html('00.00');
							$("#gpsLong").html('00.00');
							$("#map-canvas-FindMe").html('');
							$("#map-canvas-FindMe_Pin").html('');
							$("report_issue .issue_dropdown_select select").html('SELECT ISSUE TYPE');
							window.location="#home";
					
					}, function(error) {
					   alert("Upload failed: Code = "+error.code);
					   $.mobile.loading('hide');
					}, options);
					}
								} , 
							error: function(jqXHR) {
									alert(jqXHR.status);
								}
						}); // ajax end here
		
		}); // file transfer code ends
		$.mobile.loading('hide');						 
}); //document ready end

function cleardata() 
	{
		$("#add_info").val('');
		$("#full_address").html('ADDRESS');
		$("#report_issue #takenImage").attr('src','');
		$("#gpsLat").html('00.00');
		$("#gpsLong").html('00.00');
		$("#map-canvas-FindMe").html('');
		$("#map-canvas-FindMe_Pin").html('');
		$('select').each(function() { this.selectedIndex = 0 }); // $("#drop_down select").html('');
	}	
		
function CreateMap()
{
	$.mobile.loading("show", {
						text : "Loading please wait...",
						textVisible : true,
						theme : "c"});
	var options = {maximumAge: 30000, timeout: 50000, enableHighAccuracy: false };
	navigator.geolocation.getCurrentPosition(onSuccessFindMe, onFailFindMe, options);
} // this function will create map either from current location or from user enter locaiton...

		
function onSuccessFindMe(position){
			var mapOptions;
			var geocoder;
			var yourLatLng;
			var contentString;
			var map;
			var marker;
			 gpsLatitude = position.coords.latitude;
			 gpsLongitude = position.coords.longitude;
				
				//alert(gpsLatitude + " : " + gpsLongitude);
			 document.getElementById('gpsLat').innerHTML = gpsLatitude;
	 		 document.getElementById('gpsLong').innerHTML = gpsLongitude;
			 
			 
			 var html='';
				 $.ajax({
					type:"GET", 
					url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+gpsLatitude + "," +gpsLongitude+"&sensor=true", 
					dataType: "json",
					success: function(data) {
							var address = data.results;
							country = address[0].formatted_address;
							//alert(country);
							document.getElementById('full_address').innerHTML = country;
								$.mobile.loading("hide");
							},
					error: function(jqXHR) {
									alert("erro"+JSON.stringify(jqXHR));
									$.mobile.loading("hide");
							}
				 });
			
			    var currentLagLng = new google.maps.LatLng(gpsLatitude,gpsLongitude);
    var myOptions = {
    zoom: 8,
    center: currentLagLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   			
			var map = new google.maps.Map(document.getElementById("map-canvas-FindMe"), myOptions);
  
           var latlong = new google.maps.LatLng(gpsLatitude,gpsLongitude);
           var marker = new google.maps.Marker({
                                              position: latlong,
												map: map,
                                               icon: 'img/pin.png',
                                               title: "Current Location",
                                               animation: google.maps.Animation.DROP
                                               }); //marker end
     $('#map-canvas-FindMe').css('display','block');
    setTimeout(function(){
               $(this).trigger('resize');
               },500);
		}
	
function Create_Pin_Map()
{
	$.mobile.loading("show", {
						text : "Loading please wait...",
						textVisible : true,
						theme : "c"});
	var options = {maximumAge: 30000, timeout: 50000, enableHighAccuracy: false };
	navigator.geolocation.getCurrentPosition(onSuccessFindMe_Pin, onFailFindMe, options);
} // this function will create map either from current location or from user enter locaiton...

		
function onSuccessFindMe_Pin(position){
			var mapOptions;
			var geocoder;
			var yourLatLng;
			var contentString;
			var map;
			var marker;
			 gpsLatitude = position.coords.latitude;
			 gpsLongitude = position.coords.longitude;
				
				//alert(gpsLatitude + " : " + gpsLongitude);
			 document.getElementById('gpsLat').innerHTML = gpsLatitude;
	 		 document.getElementById('gpsLong').innerHTML = gpsLongitude;
			 
			 
			 var html='';
				 $.ajax({
					type:"GET", 
					url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+gpsLatitude + "," +gpsLongitude+"&sensor=true", 
					dataType: "json",
					success: function(data) {
							var address = data.results;
							country = address[0].formatted_address;
							//alert(country);
							document.getElementById('full_address').innerHTML = country;
								$.mobile.loading("hide");
							},
					error: function(jqXHR) {
									alert("erro"+JSON.stringify(jqXHR));
									$.mobile.loading("hide");
							}
				 });
			
			    var currentLagLng = new google.maps.LatLng(gpsLatitude,gpsLongitude);
    var myOptions = {
    zoom: 8,
    center: currentLagLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   			
			var map = new google.maps.Map(document.getElementById("map-canvas-FindMe_Pin"), myOptions);
  
           var latlong = new google.maps.LatLng(gpsLatitude,gpsLongitude);
           var marker = new google.maps.Marker({
                                              position: latlong,
												map: map,
                                               icon: 'img/pin.png',
                                               title: "Current Location",
											   draggable: true,
                                               animation: google.maps.Animation.DROP
                                               }); //marker end
     $('#map-canvas-FindMe_Pin').css('display','block');
    setTimeout(function(){
               $(this).trigger('resize');
               },500);
		}
		
		function initialize() {
			var myLatLng = new google.maps.LatLng(globalPosition.coords.latitude, globalPosition.coords.longitude);
			  var mapOptions = {
				zoom: 8,
				center: myLatLng
			  };

	
		  google.maps.event.addListener(map, 'tilesloaded', function(evt) {
			  $.mobile.loading( "hide" );
		  });
		}

		function onFailFindMe(){
			$.mobile.loading("hide");
			//alert(1);
			 navigator.notification.confirm(
						'GPS is not enable, do you want to start it?',  // message
						onConfirmForGPS,              // callback to invoke with index of button pressed
						'You are here!',            // title
						'Yes,No'          // buttonLabels
			);
		}
function onConfirmForGPS(buttonIndex){
		if(buttonIndex==1){
			 window.Sherman.onGPS();
		}else{
			
		}
}
function pinlocation()
{		
	var geocoder = new google.maps.Geocoder();
	var latitude;
	var longitude;
	var address = $("#issue_location").val();
	
geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
	$('#gpsLat').html(latitude);
	$('#gpsLong').html(longitude);
		 
	 var LagLng = new google.maps.LatLng(latitude,longitude);
    var myOptions = {
    zoom: 8,
    center: LagLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   			
			var map = new google.maps.Map(document.getElementById("map-canvas-FindMe_Pin"), myOptions);
  
          
           var marker = new google.maps.Marker({
                                              position: LagLng,
												map: map,
                                               icon: 'img/pin.png',
                                               title: "Location",
											   draggable: true,
                                               animation: google.maps.Animation.DROP
                                               }); //marker end
    $('#map-canvas-FindMe_Pin').css('display','block');
    setTimeout(function(){
               $(this).trigger('resize');
               },500); 
	 
  } // if end
});

		
$('#full_address').html($("#issue_location").val());
$("#PinPopUp").popup( "close" );return false;
}	
