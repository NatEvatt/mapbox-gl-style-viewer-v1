"use strict";

var MapConfig = require("./mapConfig");

var MapFunctions = function () {
    
    var map;

    var initializeMap = function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF0ZXZhdHQiLCJhIjoiR1hVR1ZIdyJ9.gFwSyghJZIERfjLkzgTx6A';
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
        if (basemapId.charAt(0) == "_") {
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