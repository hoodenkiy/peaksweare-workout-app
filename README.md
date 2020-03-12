
# Peaksware Javascript Code Test

Please build a single page application to visualize the workout data provided in `workout-data.json`, including a map, a graph, and an algorithm to analyze average power output.

## Algorithm
- Write the most efficient method that finds the "best" 20 minute power effort.
- "Best" is defined as highest continuous average for the given time period.

## User Interface
- Display the gps path on a Map
- Display the power output over time on a graph, using time as the X axis
- When user selects a range of time on the graph, highlight the corresponding range on the map
- Display the 1, 5, 10, 15, and 20 minute "best" efforts

## Hints
The purpose of this test is to demonstrate your understanding of JavaScript web application patterns and best practices, efficient algorithms, and general clean coding habits. We realize this interview question can be a substantial task. To save time, do not focus too much on CSS styling, layouts, boundary use cases, etc. You are free to use whatever frameworks and libraries you like.

## Submission
Please submit your test as an emailed zip file (please do not include the node_modules folder) or link to a private repo or private file sharing system. You can also provide a hosted link or it can run locally.



function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: 'terrain'
  });

  var flightPlanCoordinates = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}