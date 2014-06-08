define(
    'project', 
    ['../bower_components/knockout/dist/knockout.debug',
     'underscore',
     'map', 'storage', 'point'],
    function(ko, _, mapModule, storageModule, pointModule) {

        var app = {

            menuItems: ko.observableArray([
                {text: "Добавить новую", href:"#detail"},
                {text: "Список точек", href:"#listpoints"},
            ]),

            listPoints: ko.observableArray([]),

            edit: ko.observable(false),
            new: ko.observable(false),

            showMenu: ko.observable(true),
            showListPoints: ko.observable(false),
            showDetailPoint: ko.observable(false),

            currentPoint: ko.observable(pointModule.createPoint()),

            editUrl: function(point) {
                return '#edit' + point.id;
            },
            titleHref: function(point) {
                return point.nameAttr();
            },

            savePoint: function() {
                storageModule.setPoints(app.listPoints());
                location.hash = '';
            },

            addPoint: function() {
                var pnt = app.currentPoint();

                app.listPoints.push(pnt);
                var marker = mapModule.copyMarker(pnt.getMarker());

                mapModule.addMarkerToMap(marker);
                mapModule.infoWindowToMarker(marker,
                    infoWindowContent(pnt));

                storageModule.setPoints(app.listPoints());

                app.currentPoint(pointModule.createPoint());
                location.hash = '';
            }
        };

        function locatePoints() {
            var pnts = storageModule.getPoints();
            app.listPoints(pnts);
            _.each(
                pnts,
                function(pnt) {
                    mapModule.infoWindowToMarker(pnt.getMarker(),
                        infoWindowContent(pnt));
                    mapModule.addMarkerToMap(pnt.getMarker());
                }
            );
        };

        function infoWindowContent(point) {
            return "<div>" + 
                   "<div>" +
                   "Название: " + 
                   point.nameAttr() + 
                   "</div>" +
                   "<div>" + 
                   "Описание: " + 
                   point.descAttr() + 
                   "</div>" +
                   "<a href='#edit" + 
                   point.id + 
                   "'>Редактировать</a>" + 
                   "</div>"
        };

        function showPanelCreatePoint() {
            app.currentPoint(pointModule.createPoint());
            app.showListPoints(false);
            app.showDetailPoint(true);
            app.new(true);
            app.edit(false);
            mapModule.statePlaceMarker();
        };

        function showPanelListPoints() {
            app.showListPoints(true);
            app.showDetailPoint(false);
            mapModule.stateEmpty();
        };

        function showPanelMainMenu() {
            app.showMenu(true);
            app.showListPoints(false);
            app.showDetailPoint(false);
            mapModule.stateEmpty();
        };

        function getPointById(id) {
            return _.find(app.listPoints(), function(item) { return item.id == id});
        };

        function showPanelEditPoint(id) {
            var point = getPointById(id);
            if (point) {
                app.showListPoints(false);
                app.showDetailPoint(true);
                app.edit(true);
                app.new(false);
                mapModule.closeinfoWindows();
                app.currentPoint(point);
                mapModule.statePlaceReplaceMarker(point.getMarker());
            }
            else {
                location.hash = '';
            }
        };

        mapModule.addCallbackClick(function(event) {
            var marker = mapModule.placeMarker(event.latLng);
            app.currentPoint().setMarker(marker);
        });

        //расставляем все точки из стора, если есть ;)
        locatePoints();

        ko.applyBindings(app);

        return {
            showCreatePoint: showPanelCreatePoint,
            showListPoints: showPanelListPoints,
            showEditPoint: showPanelEditPoint,
            showMain: showPanelMainMenu
        };
    }
);