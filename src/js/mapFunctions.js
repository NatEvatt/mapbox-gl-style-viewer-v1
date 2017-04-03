"use strict";

var MapConfig = require("./mapConfig");
var AppConfig = require("../../appConfig");

var MapFunctions = function () {
    
    var map;

    var initializeMap = function () {
        mapboxgl.accessToken = "@MapboxApiKey@";
        map = new mapboxgl.Map({
            container: 'map',
            style: 'styles/klokantech_terrain.json',
            center: [-121.998869, 36.972969],
            pitch: 1,
            zoom: 11
        });
        map.addControl(new mapboxgl.NavigationControl());
    };

    var changeBasemap = function (selectedItem) {
        var selectedBasemap = $(selectedItem).text();
        var basemapId = $(selectedItem).attr('id');
        var dataSource = $(selectedItem).attr('data-source');
        console.log("The data source is " + dataSource);
        if (typeof dataSource !== 'undefined') {
            handleMyMapbox(dataSource);
        } else if (basemapId.charAt(0) == "_") {
            handleMapboxBasemap(basemapId);
        } else {
            map.setStyle("styles/" + basemapId + ".json");
        }
        var mapOptions = MapConfig.getMapDetails(basemapId);
        $("#basemapSpan").text(selectedBasemap);
        updateMapOptions(mapOptions);
    };

    var handleMapboxBasemap = function (basemap) {
        //Only for Mapbox styles where the style.json is not in the style folder
        map.setStyle('mapbox://styles/mapbox/' + basemap.substring(1));
    };
    
    var handleMyMapbox = function(dataSource){
        map.setStyle(dataSource);
    };

    var updateMapOptions = function (mapOptions) {
        if (typeof mapOptions.lng !== 'undefined') {
            map.setCenter([mapOptions.lng, mapOptions.lat]);
            map.setZoom(mapOptions.zoom);
        }
        map.setPitch(mapOptions.pitch);
    };

    return {
        initializeMap: initializeMap,
        changeBasemap: changeBasemap
    };

};

module.exports = MapFunctions();