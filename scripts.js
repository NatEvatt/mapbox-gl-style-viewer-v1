mapboxgl.accessToken = 'pk.eyJ1IjoibmF0ZXZhdHQiLCJhIjoiR1hVR1ZIdyJ9.gFwSyghJZIERfjLkzgTx6A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'styles/klokantech_terrain.json',
    center: [-121.998869, 36.972969],
    pitch: 1,
    //            center: [-121.998869, 36.972969],
    zoom: 11
});

function changeBasemap(selectedItem) {
    var selectedBasemap = $(selectedItem).text();
    var basemapId = $(selectedItem).attr('id');
    var mapOptions = getLatLng(basemapId);
    console.log('something was selected ' + selectedBasemap);
    $("#basemapSpan").text(selectedBasemap);
    map.setStyle("styles/" + basemapId + ".json");
    map.setCenter([mapOptions.lng, mapOptions.lat]);
    map.setZoom(mapOptions.zoom);
}

function getLatLng(basemapId){
    var mapOptions = [];
    switch(basemapId){
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
        default:
            mapOptions.lng = -121.998869;
            mapOptions.lat = 36.972969;
            mapOptions.zoom = 11;
        return mapOptions;
    }
}