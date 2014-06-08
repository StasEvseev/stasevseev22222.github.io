define(
    'point', ['../bower_components/knockout/dist/knockout.debug', 'map', 'helper'],
    function(ko, mapModule, helperModule) {

        //Конструктор точки
        function Point(id, name, desc, marker) {


            this.id = id || helperModule.generateUUID();
            this.nameAttr = ko.observable(name);
            this.descAttr = ko.observable(desc);
            this.marker = ko.observable(marker);
            this.markerCoords = ko.observable('');

            this.setMarker = function(marker) {
                if (marker) {
                    this.marker(marker);
                    this.markerCoords(mapModule.markerCoordToString(marker));
                }
            };

            this.getMarker = function() {
                return this.marker();
            };

            this.getLat = function() {
                return this.marker().position.lat();
            };

            this.getLng = function() {
                return this.marker().position.lng();
            };

            this.setMarker(marker);
        }

        return {
            createPoint: function(id, name, desc, marker) {
                return new Point(id, name, desc, marker);
            }
        }

    }
);