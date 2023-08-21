//api link
//All Magnitude 2.5+ Earthquakes within last 30 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

//use get request with "then", send data to a function
d3.json(url).then(function (data) {
    createFeatures(data.features);
});

//conditionals for marker style
//radius reflects depth of quake, color gradient reflects magnitude
// let Magnitude = data.feature.properties.mag;
// let Depth = data.feature.geometry[2];

for (let i=0; i < feature.length; i++) {
    let markerColor = "";
    if (properties.mag < 3){
        color = "lightblue";
    } else if (properties.mag < 4) {
        color = "blue";
    } else if (properties.mag >= 4) {
        color = "darkblue";
    }
}
for (let i=0; i < feature.length; i++) {
    let markerRadius = "";
    if (geometry[2] < 10) {
        radius = 5;
    } else if (geometry[2] < 30) {
        radius = 10;
    } else if (geometry[2] < 50) {
        radius = 15;
    } else if (geometry[2] < 70) {
        radius = 20;
    } else if (geometry[2] >= 100) {
        radius = 25;
    }
}

//define function, add Popups to display features
function createFeatures(quakeData) {

    //create feature function to call
    function onEachFeature (feature, layer) {
        let markerStyle = L.circleMarker([lat,lon], {
            radius: markerRadius,
            color: markerColor,
            opacity: 0.5
        });
        markerStyle.bindPopup("<h1>Location: " +feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3> <hr> <h3>Date: " + new Date(feature.properties.time) + "</h3>");
    }
    //create features array
    let quakes = L.geoJSON(quakeData, {
        style: markerStyle,
        onEachFeature: onEachFeature
    });
    //apply "quakes" layer to createMap
    createMap(quakes);
}

//create map and layers
function createMap(quakes) {
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
    //establish overlay
    let overlayMaps = {
        Earthquakes: quakes
    };
    //establish Map
    let myMap = L.map("map", {
        center: [98.5795,39.8283],
        zoom: 5,
        layers: [baseStreet, quakes]
    });
    //layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

