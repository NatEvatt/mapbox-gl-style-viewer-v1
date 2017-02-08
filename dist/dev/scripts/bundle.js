(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var MapFunctions = require('./mapFunctions');

var Main = function () {

    return {
        MapFunctions:MapFunctions
    };

};

module.exports = Main();

},{"./mapFunctions":2}],2:[function(require,module,exports){
"use strict";

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0ZXZhdHQiLCJhIjoiR1hVR1ZIdyJ9.gFwSyghJZIERfjLkzgTx6A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'styles/klokantech_terrain.json',
    center: [-121.998869, 36.972969],
    pitch: 1,
    zoom: 11
});
map.addControl(new mapboxgl.NavigationControl());

function changeBasemap(selectedItem) {

    var selectedBasemap = $(selectedItem).text();
    var basemapId = $(selectedItem).attr('id');
    if (basemapId.charAt(0) == "_") {
        handleMapboxBasemap(basemapId);
    } else {
        map.setStyle("styles/" + basemapId + ".json");
    }
    var mapOptions = getLatLng(basemapId);
    $("#basemapSpan").text(selectedBasemap);
    updateMapOptions(mapOptions);
}

function updateMapOptions(mapOptions) {
    if (typeof mapOptions.lng !== 'undefined') {
        map.setCenter([mapOptions.lng, mapOptions.lat]);
        map.setZoom(mapOptions.zoom);
    }
    map.setPitch(mapOptions.pitch);
}

function getLatLng(basemapId) {
    var mapOptions = [];
    mapOptions.pitch = 0;
    switch (basemapId) {
    case "swiss_ski":
        mapOptions.lng = 7.965328;
        mapOptions.lat = 46.609505;
        mapOptions.zoom = 12;
        return mapOptions;
        break;
    case "vintage":
        mapOptions.lng = -98.610894;
        mapOptions.lat = 40.257438;
        mapOptions.zoom = 4;
        return mapOptions;
    case "toner":
        mapOptions.lng = -98.610894;
        mapOptions.lat = 40.257438;
        mapOptions.zoom = 4;
        return mapOptions;
        break;
    case "whaam":
        mapOptions.lng = -120.403320;
        mapOptions.lat = 36.306286;
        mapOptions.zoom = 7;
        return mapOptions;
        break;
    case "satellite":
        mapOptions.lng = -121.998869;
        mapOptions.lat = 36.972969;
        mapOptions.zoom = 13;
        return mapOptions;
        break;
    case "klokantech_3D":
        mapOptions.lng = -122.399674;
        mapOptions.lat = 37.791311;
        mapOptions.zoom = 16;
        mapOptions.pitch = 55;
        return mapOptions;
        break;
    default:
        mapOptions.pitch = 0;
        return mapOptions;
    }
}

function handleMapboxBasemap(basemap) {
    //Only for Mapbox styles where the style.json is not in the style folder
    map.setStyle('mapbox://styles/mapbox/' + basemap.substring(1));
}
},{}]},{},[1])