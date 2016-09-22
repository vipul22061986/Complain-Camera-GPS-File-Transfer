$(document).ready(function(e){
	
	$(".my_reports").click(function(event){
		/*alert("hello");*/
		var html='';
		
			$.ajax({
					type:"GET", 
					url:"http://192.168.1.43/gov311/?json=get_posts", // "listing.json", //
					dataType: "jsonp",
					success: function(data) {
						var post_list = data.posts;
							
							$.each(post_list, function(i, post_list){
								/*alert('test.custom_fields.issue_type');*/	
							//	var x = test.id;
							var date = (post_list.date.split(" ", 1));
								html+='<ul onclick="getDetails(\''+post_list.id+'\');"><li class="issue_one report_one "><div class="li_upper"><span><i class="fa fa-exclamation-circle"></i></span>Report #:</div><div class="li_lower" >'+post_list.id+'</div></li><li class="issue_two report_two"><div class="li_upper"><span><i class="fa fa-calendar"></i></span>Date:</div> <div class="li_lower">'+date+'</div></li> <li class="issue_three report_three"> <div class="li_upper"><span><i class="fa fa-exclamation-circle"></i></span>ISSUE:</div><div class="li_lower" >'+post_list.custom_fields.issue_type+'</div></li><li class="issue_four no_border report_four"><div class="li_upper"><span><i class="fa fa fa-map-marker"></i></span>Location:</div><div class="li_lower" >'+post_list.custom_fields.location+'</div></li></ul>';
							});  // for each end for data

							$('.issue_listing_wrapper').html(html); 
						}, 
					error: function(jqXHR) {
							alert(jqXHR.status);
						}
				}); // ajax end here
		
	}); // click event end
function unserialize(data) {

  var that = this,
    utf8Overhead = function(chr) {
      // http://phpjs.org/functions/unserialize:571#comment_95906
      var code = chr.charCodeAt(0);
      if (code < 0x0080) {
        return 0;
      }
      if (code < 0x0800) {
        return 1;
      }
      return 2;
    };
  error = function(type, msg, filename, line) {
    throw new that.window[type](msg, filename, line);
  };
  read_until = function(data, offset, stopchr) {
    var i = 2,
      buf = [],
      chr = data.slice(offset, offset + 1);

    while (chr != stopchr) {
      if ((i + offset) > data.length) {
        error('Error', 'Invalid');
      }
      buf.push(chr);
      chr = data.slice(offset + (i - 1), offset + i);
      i += 1;
    }
    return [buf.length, buf.join('')];
  };
  read_chrs = function(data, offset, length) {
    var i, chr, buf;

    buf = [];
    for (i = 0; i < length; i++) {
      chr = data.slice(offset + (i - 1), offset + i);
      buf.push(chr);
      length -= utf8Overhead(chr);
    }
    return [buf.length, buf.join('')];
  };
  _unserialize = function(data, offset) {
    var dtype, dataoffset, keyandchrs, keys, contig,
      length, array, readdata, readData, ccount,
      stringlength, i, key, kprops, kchrs, vprops,
      vchrs, value, chrs = 0,
      typeconvert = function(x) {
        return x;
      };

    if (!offset) {
      offset = 0;
    }
    dtype = (data.slice(offset, offset + 1))
      .toLowerCase();

    dataoffset = offset + 2;

    switch (dtype) {
      case 'i':
        typeconvert = function(x) {
          return parseInt(x, 10);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'b':
        typeconvert = function(x) {
          return parseInt(x, 10) !== 0;
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'd':
        typeconvert = function(x) {
          return parseFloat(x);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'n':
        readdata = null;
        break;
      case 's':
        ccount = read_until(data, dataoffset, ':');
        chrs = ccount[0];
        stringlength = ccount[1];
        dataoffset += chrs + 2;

        readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 2;
        if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
          error('SyntaxError', 'String length mismatch');
        }
        break;
      case 'a':
        readdata = {};

        keyandchrs = read_until(data, dataoffset, ':');
        chrs = keyandchrs[0];
        keys = keyandchrs[1];
        dataoffset += chrs + 2;

        length = parseInt(keys, 10);
        contig = true;

        for (i = 0; i < length; i++) {
          kprops = _unserialize(data, dataoffset);
          kchrs = kprops[1];
          key = kprops[2];
          dataoffset += kchrs;

          vprops = _unserialize(data, dataoffset);
          vchrs = vprops[1];
          value = vprops[2];
          dataoffset += vchrs;

          if (key !== i)
            contig = false;

          readdata[key] = value;
        }

        if (contig) {
          array = new Array(length);
          for (i = 0; i < length; i++)
            array[i] = readdata[i];
          readdata = array;
        }

        dataoffset += 1;
        break;
      default:
        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
        break;
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)];
  };

  return _unserialize((data + ''), 0)[2];
}  // function end for serilsie
$(".general_info").on("tap", function(){
		$.mobile.loading("show", {
						text : "Loading please wait...",
						textVisible : true,
						theme : "c"
				});
					$.ajax({
					type:"GET", 
				//	url:'cat.json',
					url:"http://192.168.1.43/gov311/category/general-information/?json=get_posts&status=published", 
					dataType: "jsonp",
					cache:false,
					success: function(data) {
								var html='';
							$.each(data.posts, function(i, post){

									html+='  <div class="section_wrapper " >';
									html+='  <div class="section_upper ">Village hall</div>';
									html+='  <div class="section_lower ">';
									html+='      <div class="section_lower_one futura-medium sectortitle" >'+post.title+'</div>';
									html+='     <div class="section_lower_two futura-medium sectordesig" >'+post.custom_fields.designation+'</div>';
									html+='    <div class="section_lower_three common_grey futura-medium sectoraddress" >';
									html+=' <span><i class="fa fa-map-marker"></i></span>'+unserialize(post.custom_fields.address).address+'</div>';
									html+='   <div class="section_lower_four common_grey futura-medium sectortime" ><span>';
									html+=' <i class="fa fa-clock-o"></i></span>Hours : '+post.custom_fields.time+'</div>';
									html+=' <div class="section_lower_five common_grey futura-medium sectornumber" ><span>';
									html+=' <i class="fa fa-phone"></i></span>'+post.custom_fields.phone+'</div></div></div>';
							});  // for each end for data
							$('.general_info_content .content_inner').html(html); 
									$.mobile.loading('hide');		
									$.mobile.changePage("#general_info", {
											transition : "none"
									});				 

						}, 
					error: function(jqXHR) {
							alert('Might DatConnection Not Available...');
									$.mobile.loading('hide');						 

						}
				});
					
}); // report_issue end.

$(".contact_us").on("tap", function(){
var html='';
$.mobile.loading("show", {
						text : "Loading please wait...",
						textVisible : true,
						theme : "c"
				});
$.ajax({
type:"GET", 
//	url:'cat.json',
url:"http://192.168.1.43/gov311/category/contact-official/?json=get_posts&count=10&status=published", 
dataType: "jsonp",
cache:false,
success: function(data) {
				contact=data;

				$.each(data.posts,function(i,post)
				{

						html+='<option value="'+post.id+'">'+post.title+'</option>'
				});
				$('.official_drop_wrapper select').html(html);
				$('.contactusimg').attr('src',data.posts[0].custom_fields['mayer-pic']);
			$('.call_mail_inner .call').attr('href',data.posts[0].custom_fields['mayer-phone']);
			$('.call_mail_inner .mail').unbind('click.myEvents').bind('click.myEvents',function(){
					sendemail(data.posts[0].custom_fields['mayer-email']);				
			});
			$.mobile.changePage("#contact_official", {
						transition : "none"
					});
				$.mobile.loading('hide');		

	}, 
	error: function(jqXHR) {
			alert('Might DatConnection Not Available...');
					$.mobile.loading('hide');						 
	
		}
		});//error end
}); // contact_official page show end
$('.official_drop_wrapper select').on('change',function()
{
	$.each(contact.posts,function(i,post)
	{

		if(post.id==$('.official_drop_wrapper select').val())
		{

			$('.contactusimg').attr('src',post.custom_fields['mayer-pic']);
			$('.call_mail_inner .call').attr('href',post.custom_fields['mayer-phone']);
			$('.call_mail_inner .mail').unbind('click.myEvents').bind('click.myEvents',function(){
					sendemail(post.custom_fields['mayer-email']);				
			});
		}
	});
});				


}); // document ready end
function sendemail(to_contact) 
{   
  var options ={
	       to:[to_contact],
		   subject: 'Contact Us',
		   body:    '',
		   isHtml:  true }; 
		   var callbackFn = null,
		   options    = options || {};  
		   var defaults = {subject:null,body:null,to:null,cc:null,bcc:null,attachments: null,isHtml:true}
		   for (var key in defaults) { 
		           if (options[key] !== undefined) {  
				              defaults[key] = options[key]; 
				             }  
				   }       
		  cordova.exec(null, null, 'EmailComposer', 'open', [options]);     
 } // composeMail End


