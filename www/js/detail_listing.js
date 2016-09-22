
		$(document).ready(function(){$(".issue_listing_wrapper").click(function(event){
			
			$.mobile.changePage("#issue_report_detail", {transition : "none"});
			});
		});
		
		function getDetails(id) {
		/*alert(id + " : id ");*/

		var html='';
		
			$.ajax({
		
					type:"GET", 
					url: "http://192.168.1.43/gov311/?json=get_post&id="+id+"" , //"listing_detail.json",   // 
					dataType: "jsonp",
					success: function(data) {
						var listDetails = data.post;
								
								 var add_info = (listDetails.date.split(" ", 1));
								 var add_time = listDetails.date.split(" ");
								 						
								/* alert('test.custom_fields.issue_type'); */	

								html+='<ul><li class="issue_one detail_one"> <div class="li_upper" ><span><i class="fa fa-exclamation-circle"></i></span>Issue Type:</div><div class="li_lower" >'+listDetails.custom_fields.issue_type+'</div> </li><li class="issue_two detail_two"><div class="li_upper"><span><i class="fa fa-file-text"></i></span>Additional Information:</div><div class="li_lower">'+listDetails.content+'</div></li><li class="issue_three detail_three "><div class="li_upper"><span><i class="fa fa-map-marker"></i></span>Location:</div><div class="li_lower" >'+listDetails.custom_fields.location+'</div></li><li class="issue_four  detail_four"><div class="li_upper"><span><i class="fa fa-compass"></i></span>latitude:</div><div class="li_lower" >'+listDetails.custom_fields.lat+'</div></li><li class="issue_five  detail_five"><div class="li_upper"><span><i class="fa fa-compass"></i></span>longitude:</div><div class="li_lower" >'+listDetails.custom_fields.long+'</div></li><li class="issue_six  detail_six"><div class="li_upper"><span><i class="fa fa-calendar"></i></span>Date:</div><div class="li_lower" >'+add_info+'</div></li><li class="issue_seven  detail_seven"><div class="li_upper"><span><i class="fa fa-clock-o"></i></span>Time:</div><div class="li_lower" >'+add_time[1]+'</div></li><li class="issue_seven  detail_seven"><div class="li_upper"><span><i class="fa fa-exclamation-circle"></i></span>Report #:</div><div class="li_lower" >'+listDetails.id+'</div></li><li class="issue_eight  detail_eight"><div class="li_upper"><span><i class="fa fa-clipboard"></i></span>Status:</div><div class="li_lower" >'+listDetails.custom_fields.status+'</div></li><li class="issue_ten no_border detail_ten"><div class="li_upper"><span><i class="fa fa-comment-o"></i></span>village Comments:</div><div class="li_lower" >'+listDetails.custom_fields.comments+'</div></li></ul>';
							

							$('.detail_listing_wrapper').html(html); 
						}, 
					error: function(jqXHR) {
							alert(jqXHR.status);
						}
	
	}); // function getdetails end
	
	}
