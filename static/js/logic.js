//api link
//All Magnitude 2.5+ Earthquakes within last 30 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

//establish base layers
let baseStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let baseTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
//establish baseMaps for user to choose from
let baseMaps = {
    "Street Map": baseStreet,
    "Topographical Map": baseTopo
};

let earthquakes = new L.LayerGroup();

//establish overlay
let overlayMaps = {
    Earthquakes: earthquakes

};
//establish Map
let myMap = L.map("map", {
    center: [39, 28],
    zoom: 1.5,
    layers: [baseStreet]
});
//layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

function markerColor(mag) {
    if (mag < 3) return "aliceblue";
    else if (mag <= 4) return "aquamarine";
    else if (mag >= 4.1) return "cadetblue";
    else if (mag >= 5.1) return "cornflowerblue";
}
function markerRadius(coordinates) {
    if (coordinates < 10) return 4;
    else if (coordinates < 30) return 6;
    else if (coordinates < 50) return 8;
    else if (coordinates < 70) return 10;
    else if (coordinates >= 100) return 12;
}


//use get request with "then", send data to a function
//
d3.json(url).then(function (data) {

    L.geoJson(data, {
        pointToLayer: function(feature, location) {
            return L.circleMarker(location);
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Location: " + feature.properties.place + "<br>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2])
        },
        style: function (feature) {
            return {
                radius: markerRadius(feature.geometry.coordinates[2]),
                color: "white",
                fillColor: markerColor(feature.properties.mag),
                fillOpacity: 0.75,
                weight: 1
            };

        }
    }).addTo(earthquakes);
    earthquakes.addTo(myMap);
})
