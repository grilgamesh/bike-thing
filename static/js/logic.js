const url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

d3.json(url).then(x => console.log(x));
// Create the createMap function.

function createMap(bikeStations) {
    var newYorkCoords = [40.73, -74.0059];
    var mapZoomLevel = 12;

    var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the lightmap layer.
    var baseMaps = { "street Map": streetMap };

    // Create an overlayMaps object to hold the bikeStations layer.
    var overlayMaps = { "Bike Statios": bikeStations };

    // Create the map object with options.
    var map = L.map("map-id", {
        center: newYorkCoords,
        zoom: mapZoomLevel
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}
// Create the createMarkers function.

function createMarkers(response) {

    // Pull the "stations" property from response.data.
    var stations = response.data.stations
        // Initialize an array to hold the bike markers.

    var bikeMarkers = [];
    // Loop through the stations array.
    for (i = 0; i < stations.length; i++) {
        var station = stations[i]
            // For each station, create a marker, and bind a popup with the station's name.

        var biekMarker = L.marker([station.lat, station.lon])
            .bindPopup("<h3>" + station.name + "< /h3><h3>Capacity: " + station.capacity + "< /h3 > ")

        // Add the marker to the bikeMarkers array.
        bikeMarkers.push(biekMarker)
    }

    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarkers))
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.

d3.json(url).then(x => createMarkers(x));