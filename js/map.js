define(
	'map',
	['jquery', 'async!http://maps.google.com/maps/api/js?key=AIzaSyDcpwYUxTU87HUXQbnV1oAe77gSmDlcZq8'],
	function($) {

      function State() {
          this.clickToMap = function(location) {

              console.log("EMPTY STATE");

          };
          this.after = function() {
              console.log("EMPTY AFTER");
          };
      }

      function StateAddOneMarker() {
          var mark;
          this.clickToMap = function(location) {
              //debugger
              if ( mark ) {
                  mark.setPosition(location);
              } else {
                  mark = new google.maps.Marker({
                      position: location,
                      map: map
                  });
              }
              return mark;
          };
          this.after = function() {
              if (mark) {
                  mark.setMap(null);
                  mark = null;
              }
              
          }
      }

      function StateReplaceMarker() {
          var mark;
          this.clickToMap = function(location) {
              if ( mark ) {
                  mark.setPosition(location);
              } else {
                  mark = new google.maps.Marker({
                      position: location,
                      map: map
                  });
              }
              return mark;
          };
          this.setMarker = function(marker) {
              mark = marker;
          };
          this.after = function() {
              if (mark) {
                  //mark.setMap(null);
                  mark = null;
              }
              
          };
      }

    	var map;
      var infowindow;

      var state_empty = new State();
      var state_add_one_marker = new StateAddOneMarker();
      var state_replace_marker = new StateReplaceMarker();
      var current_state = state_empty;

  		function initialize() {
  	        var mapOptions = {
  	          center: new google.maps.LatLng(55.7456660, 37.610836),
  	          zoom: 8,
  	          mapTypeId: google.maps.MapTypeId.ROADMAP
  	        };
  	        map = new google.maps.Map(document.getElementById("map_canvas"),
  	            mapOptions);
            infowindow = new google.maps.InfoWindow();
      }

      $(document).ready(initialize);

      return {
      	  addCallbackClick: function(callback) {
      	      google.maps.event.addListener(map, 'click', callback);
      	  },

          stateEmpty: function() {

              current_state.after();
              current_state = state_empty;

          },

          statePlaceMarker: function() {

              current_state.after();
              current_state = state_add_one_marker;

          },

          statePlaceReplaceMarker: function(marker) {
              current_state.after();
              current_state = state_replace_marker;
              current_state.setMarker(marker);
          },

          infoWindowToMarker: function(marker, contentInfo, callback) {
              var content = contentInfo;
              var clbk = callback || function() {};
              google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                  clbk();
              });
          },

          closeinfoWindows: function() {
              if (infowindow) {
                  infowindow.close();
              }
          },

          copyMarker: function(marker) {
              return this.createMarker(
                  marker.position.lat(),
                  marker.position.lng()
              );
          },

          placeMarker: function(location) {
              return current_state.clickToMap(location);
          },
      	  markerCoordToString: function(marker) {
        	  	var lat = marker.getPosition().lat();
        			var lng = marker.getPosition().lng();
        			return lat + " " + lng;
          },
          createMarker: function(lat, lng) {
              var location = new google.maps.LatLng(lat, lng);
              return new google.maps.Marker({
                 position: location
              });
          },
          addMarkerToMap: function(marker) {
              marker.setMap(map);
          },
      };
	}
);