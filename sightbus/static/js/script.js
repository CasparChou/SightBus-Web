var mapStyle = {
	day:[{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#a1f199"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#e4dfd9"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#84b09e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#fafeb8"},{"weight":"1.25"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#5ddad6"}]}],
	night:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]}]
};

var map;
var clipboard = new Clipboard('.copybtn');
clipboard.on('success', function(e) {
   Materialize.toast(e.text+' 已複製', 1000);
   copy_id = e.text;
   getMarker(copy_id).infoWindow.close()
   e.clearSelection();
});
var copy_id = "";
var pre_xp = 0;
var curr_lvl = 0;
var curr_progress = 0;
if( $.cookie("lat") ){
    cent = [$.cookie('lat'), $.cookie('lng')]
    zoom = $.cookie('zoom')
} else {
    cent = ['25.0364555','121.4322167']
    zoom = 18
}
$('.map').tinyMap({
    'center': cent,
    'zoom'  : 18,
    'event' : {
        created: function () {
            loadProgress();
            getStopsOnMap();
    	},
    	// @Unnecessary
    	dragend: function () {
	        getStopsOnMap();
            map = $('.map').tinyMap('get', 'map');
            $.cookie('lat', map.getCenter().lat());
            $.cookie('lng', map.getCenter().lng());
            $.cookie('zoom', map.getZoom());
            window.location.hash=map.getCenter().lat()+","+ map.getCenter().lng()
  		},
  		//zoom_changed: function(){
		//	scale = 0.25 + ($('.map').tinyMap("get","map").zoom - 17)*0.10;
  		//	console.log(scale)
  		//}
    },
    'disableDefaultUI':true,
    'mapTypeControl':false,
    styles:mapStyle.day
});
function loadProgress(){
    $.ajax({
        url:"/stopsedit/progress",
        success:function(data){
            percent = parseInt(data["results"]["finish"])/parseInt(data["results"]["total"])
            $(".determinate").width( $(".progress").width() * 0.01*(data["results"]["finish"]%100) )
            if( curr_lvl != Math.floor(data["results"]["finish"]/100) ) {
                $('#level-up').openModal();
                levelUp(data["results"]["finish"])
            }
            curr_lvl = Math.floor(data["results"]["finish"]/100)
            pre_xp = (data["results"]["finish"]%100)

            if( curr_progress != data["results"]["finish"] || curr_progress == 0){
                $(".progress_toast").fadeOut();
                Materialize.toast( "<p class=center>"+
                    Math.round(percent*100)+" %<br>"+
                    data["results"]["finish"] + " / " + data["results"]["total"]+"</p>",
                    3600000,"progress_toast")
                curr_progress = data["results"]["finish"]
            }
        }
    });
}
function getStopsOnMap( ){
    map = $('.map').tinyMap('get', 'map');
    lat = map.getBounds()["f"]
    lng = map.getBounds()["b"]
	$.ajax({
		url:"/stopsedit/nearby?lat0="+lat["f"]+"&lng0="+lng["f"]+"&lat1="+lat["b"]+"&lng1="+lng["b"]+"&cate=0",
		success:function(data){
            loadStops(data)
		}
	})
	$.ajax({
		url:"/stopsedit/nearby?lat0="+lat["f"]+"&lng0="+lng["f"]+"&lat1="+lat["b"]+"&lng1="+lng["b"]+"&cate=1",
		success:function(data){
            loadStops(data)
		}
	})

}
function loadStops(data){
    stops = [];
    console.log(data["stops"])
	$.each(data["stops"],function(i,d){
		if( getMarker(d["id"]) )return; // if is already on map !
	    stops.push({
		   	id  : d["id"],
			addr: [d["lat"], d["lng"]],
			text: "<p class='center'><b>"+d["name"]+"</b><br>" + d["routes"] +
                    (d["cate"] > 0?"<form class='center' action='/stopsedit/update' target=_update><input name='id' value='"+d["id"]+"' type='hidden' /><input name='place_id' id='p_in_"+d['id']+"' value='"+ d["place_id"]+ "' /><br><button class='waves-effect btn' onclick='$(\"#p_in_"+d['id']+"\").val(copy_id),submit()'>貼上&更新</button></from><br>"
                     :"<br><button data-clipboard-text='"+d["place_id"]+"' class='waves-effect waves-light btn copybtn' style='text-transform: none;'>"+d["place_id"]+"</button>")+
                   "</p>",
			icon: {
                url: '/static/images/pin'+ (d["cate"]?(d["place_id"]?"3":"2"):"") +'.png',
			},
            'newLabel':d["routes"],
            'newLabelCSS':(d["cate"]>0?'labels':'labelsg'), 
            'markerWithLabel': 1000,
            'draggable': true,
        });
	})
    $(".map").tinyMap('modify', {
        marker: stops
    });
    $(".loading").fadeOut();
}
function getMarker(id){
	markers = getAllMarkers(); // refresh markers
	index = -1;
	$.each(markers, function(i,d){
		if(markers[i].id == id){
			index = i;
			return true;
		}
	});
	return index > -1?markers[index]:false;
}
function getAllMarkers(){
	return $(".map").tinyMap('get', {'marker':[]}).marker;
}
function getAllMarkersAsArray(category){
	m = $(".map").tinyMap('get', {'marker':[]}).marker;
	ml = [];
	$.each(m, function(i,d){
		if( typeof category !== 'undefined' ){
			if( d.category == category ){
				ml.push(d)
			}		
		} else {
			ml.push(d);			
		}
	});
	return ml;
}
function ok_pin(id){
    getMarker(id).set("icon",{url:"/static/images/pin3.png"})
    getMarker(id).infoWindow.close()
}
function err_pin(id){
    getMarker(id).set("icon",{url:"/static/images/pin4.png"})
}

function f_success(){
//    Materialize.toast('<a onclick="$(\'.success-toast\').fadeOut();">Success!', 800);
    loadProgress();
}
function f_fail(){
    Materialize.toast('Fail!', 800);
}
function f_invaild(){
    Materialize.toast('Invaild!', 800);
}
function f_not_exist(){
    Materialize.toast('Place ID Not Exist!', 800);
}

function levelUp(desxp){
  $('.cur-xp').html(desxp - 800)
  $('.curr-level').html(Math.round(desxp/100)-1)
  $('.target-lvl').html(Math.round(desxp/100))
  $('.progress_level').animate({
    width: "152px"
  }, 800, function() {
    $('.target-lvl').addClass('lvl-animate');
    $('#initial-lvl').fadeOut('800');
    $('.line').fadeOut('800');
  });
  $('.cur-xp').each(function() {
    $(this).prop('Counter', 800).animate({
      Counter: 800
    }, {
      duration: 800,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  setTimeout(function(){
      $('#level-up').closeModal();
      levelreset()
  },5000);
}
function levelreset(){
  $('.progress_level').animate({
    width: "114px"
  }, 500, function() {
    $('.target-lvl').removeClass('lvl-animate');
    $('#initial-lvl').fadeIn('500');
    $('.line').fadeIn('500');
    $('.cur-xp').html("1500");
  });
}

setInterval(function(){
    loadProgress();
},5000);
