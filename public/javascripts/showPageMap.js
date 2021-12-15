mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Add a marker on the map
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    // Add a popup when the marker is clicked
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3 style="color: black">${campground.title}</h3><p style="color: black">${campground.location}</p>`
            )
    )
    .addTo(map)
