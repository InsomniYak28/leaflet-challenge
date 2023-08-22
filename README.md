# leaflet-challenge

Files and Folders:
index.html (html file)
Static folder --> CSS folder --> style.css (map formatting)
Static folder --> js folder --> logic.js (map code, layering)

Objective and Overview:
The objective of the Leaflet project was to display recent earthquake data that will update as the api from earthquake.usgs.gob updates (link below). The data displayed shows all Magnitude 2.5+ earthquakes within the past 30 days. The radius of the marker reflects the depth of the quake, and the color reflects the magnitude. The location, magnitude, and depth of each quake is displayed on the popup.

Technologies and Techniques used:
geoJson was used to utilize coordinates in geoJson arrays, and d3 was used to select and pull in the data.
Leaflet provided the map tile layers, and functions such as pointToLayer, onEachFeature, LayerGroup, as well as the marker types.

Challenges:
Setting up the map and base layers was pretty straight forward thanks to Leaflet.js documentation. Adapting the markers to the circleMarker type and applying styling was more difficult. I utilized documentation as well as the help of a tutor to format that function.
One aspect of the challenge that I did NOT complete is the legend, showing the colors/gradient associated with the magnitude of the quake. The code for the color/magnitude is:
if (mag < 3) return "aliceblue";
    else if (mag <= 4) return "aquamarine";
    else if (mag >= 4.1) return "cadetblue";
    else if (mag >= 5.1) return "cornflowerblue";

Helpful links:
Data Source: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson
CSS color list: https://www.w3.org/wiki/CSS/Properties/color/keywords
Leaflet docs: https://leafletjs.com/reference.html

Finished project:
finished project link: https://github.com/InsomniYak28/leaflet-challenge
app link:
