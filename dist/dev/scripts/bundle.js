(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$MyLib = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//"use strict";

var AppConfig = function () {

    return {
        "mapboxApiKey": "pk.eyJ1IjoibmF0ZXZhdHQiLCJhIjoiR1hVR1ZIdyJ9.gFwSyghJZIERfjLkzgTx6A",
        "openMapTilesApiKey": "iCDpHi9gsjf1TnT0iI1T"
    };
};

module.exports = AppConfig();
},{}],2:[function(require,module,exports){
"use strict";

var MapFunctions = require('./mapFunctions');

var Main = function () {

    return {
        MapFunctions:MapFunctions
    };

};

module.exports = Main();

},{"./mapFunctions":4}],3:[function(require,module,exports){
"user strict";

var MapConfig = function () {

    var getMapDetails = function (basemapId) {
        var mapOptions = [];
        mapOptions.pitch = 0;
        switch (basemapId) {
        case "swiss_ski":
            mapOptions.lng = 7.965328;
            mapOptions.lat = 46.609505;
            mapOptions.zoom = 12;
            return mapOptions;
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
        case "whaam":
            mapOptions.lng = -120.403320;
            mapOptions.lat = 36.306286;
            mapOptions.zoom = 7;
            return mapOptions;
        case "satellite":
            mapOptions.lng = -121.998869;
            mapOptions.lat = 36.972969;
            mapOptions.zoom = 13;
            return mapOptions;
        case "klokantech_3D":
            mapOptions.lng = -122.399674;
            mapOptions.lat = 37.791311;
            mapOptions.zoom = 16;
            mapOptions.pitch = 55;
            return mapOptions;
        default:
            mapOptions.pitch = 0;
            return mapOptions;
        }
    };
    
    return {
         getMapDetails: getMapDetails 
    };
};

module.exports = MapConfig();
},{}],4:[function(require,module,exports){
"use strict";

var MapConfig = require("./mapConfig");
var AppConfig = require("../../appConfig");

var MapFunctions = function () {
    
    var map;

    var initializeMap = function () {
        mapboxgl.accessToken = "pk.eyJ1IjoibmF0ZXZhdHQiLCJhIjoiR1hVR1ZIdyJ9.gFwSyghJZIERfjLkzgTx6A";
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
},{"../../appConfig":1,"./mapConfig":3}]},{},[2])(2)
});