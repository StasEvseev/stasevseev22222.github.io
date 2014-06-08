define(['point', 'map'], function(pointModule, mapModule) {
	var storage = window.localStorage;
	var KEY = "POINTS";

	return {

		setPoints: function(points) {
			res = [];
			for(var i = 0; i < points.length; i++) {
				var pnt = points[i];
				res.push({
					id: pnt.id,
					name: pnt.nameAttr(),
	                description: pnt.descAttr(),
	                marker: {Lat: pnt.getLat(), Lng: pnt.getLng()}
				});
			}
			storage.setItem(KEY, JSON.stringify(res));
		},

		getPoints: function() {
			var points = storage.getItem(KEY);
			var res = [];
			if (points) {
				points = JSON.parse(points);

				for(var i = 0; i < points.length; i++) {
					var pointSer = points[i];
					res.push(pointModule.createPoint(
						pointSer.id,
						pointSer.name, pointSer.description,
						mapModule.createMarker(pointSer.marker.Lat, pointSer.marker.Lng)));
				}

			}
			return res;
		}
	};
});