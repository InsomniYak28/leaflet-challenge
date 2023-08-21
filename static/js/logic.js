//api link
//All Magnitude 2.5+ Earthquakes within last 30 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

//use get request with "then", send data to a function
d3.json(url).then(function (data) {
    createFeatures(data.features);
});

//create function for marker layer
function createFeatures(circleMarker) {
    for (let i=0; i < features.length; i++) {
        let markerStyle = {
            radius: markerRadius,
            fillColor: markerColor,
            color: white,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
        }.bindPopup("<h1>Location: " +features.properties.place + "</h1> <hr> <h3>Magnitude: " + features.properties.mag + "</h3> <hr> <h3>Date: " + new Date(features.properties.time) + "</h3>");

        //conditionals for marker style
        //radius reflects depth of quake, color gradient reflects magnitude

        let magnitude = data.features.properties.mag;

        let markerColor = "";
        if (magnitude < 3){
            color = "skyblue";
        } else if (magnitude < 4) {
            color = "steelblue";
        } else if (magnitude >= 4) {
            color = "navy";
        }

        let depth = data.features.geometry.coordinates[2];

        let markerRadius = "";
        if (depth < 10) {
            radius = 5;
        } else if (depth < 30) {
            radius = 10;
        } else if (depth < 50) {
            radius = 15;
        } else if (depth < 70) {
            radius = 20;
        } else if (depth >= 100) {
            radius = 25;
        }
    }
    let earthquakes = L.geoJSON(circleMarker, {
        pointToLayer: function (features, latlng) {
            return L.circleMarker(latlng, markerStyle);
        }
    });
    createMap(earthquakes);
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
        Earthquakes: earthquakes
    };
    //establish Map
    let myMap = L.map("map", {
        center: [39,94],
        zoom: 1,
        layers: [baseStreet, earthquakes]
    });
    //layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

