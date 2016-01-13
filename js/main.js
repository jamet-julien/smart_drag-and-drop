
var oOption, map;

oOption = {
	onDrop : {

		file : function( data){
			for( var i = 0 ; i < data.length; i++){
				document.getElementById('result').innerHTML += "<div>"+data[i].name+"</div>";
			}
		},

		link : function( data){
			var aData;
			if( data.indexOf('youtube.com/watch?v=')>0){

				aData = data.split('v=');
				sData = "<iframe width=\"600\" height=\"450\" src=\"https://www.youtube.com/embed/"+aData[1]+"\" frameborder=\"0\" allowfullscreen></iframe>";
				document.getElementById('result').innerHTML += "<div>" + sData + "</div>";

			}else if( data.indexOf('google.fr/maps/place/')>0){

				aData = data.split('/');

				var aLatLon = aData[6].split(',');



				var mapOptions = {
				    zoom: 18,
				    center: new google.maps.LatLng(aLatLon[0].replace('@',''), aLatLon[1])
				  };

				mapDiv = document.createElement('div');
				mapDiv.id = "carte";

				document.getElementById('result').appendChild( mapDiv);

				map    = new google.maps.Map(mapDiv,mapOptions);

			}else{

				sData = "<a href=\""+data+"\" target=\"_blank\"> voir le lien </a>";
				document.getElementById('result').innerHTML += "<div>"+sData+"</div>";

			}
			this.target.classList.remove( 'dragover');
		},

		image : function( data){


			if( data.indexOf('ressource/module')>0){

				var aModuleInfo = data.split('ressource/');
				var sNameModule = aModuleInfo[1].replace('.png', '');

				document.getElementById('result').innerHTML += "<div>Ajout du module : "+sNameModule+"</div>";
				this.target.classList.remove( 'dragover');
			}else{
				var img     = document.createElement("img");
	            img.src     = data;
				document.getElementById('result').appendChild( img);
				this.target.classList.remove( 'dragover');
			}
		},

		default : function( data, type){}
	}
};

if( typeof Droppable !== 'undefined'){
	var oDrag  = Draggable( {});
	var oDrop  = Droppable( document.querySelectorAll('.drop'), oOption);


	oDrop.addEvent('dragover', function(e){
		this.target.classList.add('dragover');
	});

	oDrop.addEvent('dragleave', function(e){
		this.target.classList.remove('dragover');
	});
}

if( document.getElementById('tool')){
	document.getElementById('tool').addEventListener('click', function(){
		oToolPopup.open();
		oYoutubePopup.open();
	});
}


if( document.getElementById('map')){
	document.getElementById('map').addEventListener('click', function(){

		if(  sTypeTool == 'youtube'){

			oYoutubePopup.open('https://www.google.fr/maps/place/');
			sTypeTool = 'map';

		}else if(sTypeTool == 'image') {

			oYoutubePopup.open('https://www.youtube.com/feed/subscriptions');
			sTypeTool = 'youtube';

		}else{

			oYoutubePopup.open('https://www.google.com/search?hl=fr&site=imghp&tbm=isch&source=hp&biw=1234&bih=1318&q=lapin&oq=lapin&gs_l=img.3..0l10.7432.7927.0.8141.5.5.0.0.0.0.164.620.0j5.5.0....0...1ac.1.64.img..0.5.618.cjggCKeQ2dM');
			sTypeTool = 'image';

		}

	});
}


var oOtherPopup, oToolPopup, myWorker, oYoutubePopup;
var sTypeTool = 'youtube';

oToolPopup    = Popup('tool');
oYoutubePopup = Popup('youtube');

window.addEventListener('load', function(){

	oToolPopup.open('tool.html', 600, 1000, 'right,top');
	oSmallPopup.open('small.html', 600, 310, 'right,bottom');
	oYoutubePopup.open('https://www.youtube.com/feed/subscriptions', 600, null, 'center').moveTo(1360,0);

});
