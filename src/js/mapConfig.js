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