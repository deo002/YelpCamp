mapboxgl.accessToken = mapToken;
const campParsed = JSON.parse(campground);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: campParsed.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campParsed.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campParsed.title}</h3><p>${campParsed.location}</p>`
            )
    )
    .addTo(map);


map.addControl(new mapboxgl.NavigationControl());