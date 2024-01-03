// //create map object
// let myMap = L.map("map", {
//     center: [34.0549, -118.2426],
//     zoom: 10
// }); 


// //Adding the title layer
// var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);


// //base url for dataset
// let baseurl = "https://data.lacity.org/resource/2nrs-mtv8.json?"

// //set limitNumber for how many results you want to return up to 800,000 
// let limitNumber = 500
// let limit = "$limit=" + limitNumber

// let url = baseurl + limit

// d3.json(url).then(function(response){
//     console.log(response)
//     var crime = L.layerGroup();
//     for (let  i= 0; i < response.length; i++) {
//         let location = response[i];
//         if (location) {
//             crime.addLayer(L.marker([location.lat, location.lon])
//             .bindPopup("Area:"  + response[i].area_name + "<br/>" + "Crime Committed: " + response[i].crm_cd_desc + 
//             "<br/>" + "Victim Age: " + response[i].vict_age + " // Victim Sex: " + response[i].vict_sex));
//         }
//     }
// myMap.addLayer(crime);
// })

// var baseMaps = {
//     "OpenStreetMap" : osm
// };

// var overlayMaps = {
//     "All Crime": crime
// }

// // d3.json(url).then(function(response){
// //     console.log(response)
// //     for (let  i= 0; i < response.length; i++) (
// //         response[i].crm_cd_desc.forEach( ele => {
// //             if (counter[ele]) {
// //                 counter [ele] += 1;
// //             } else {
// //                 counter[ele] = 1;
// //             }
// //             console.log(counter)
// //         })
// // )});

//base url for dataset
let baseurl = "https://data.lacity.org/resource/2nrs-mtv8.geojson?"

//set limitNumber for how many results you want to return up to 800,000 
let limitNumber = 500
let limit = "$limit=" + limitNumber

let url = baseurl + limit

d3.json(url).then(function(data){
    //log data.features to get info for create features function
    console.log(data);
    //pass features to a create features funciton
    createFeatures(data.features);
});

function createFeatures(crimeData) {
    //save crime data in a variable and bind a pop up to it
    function onEachFeature(featurecollection, layer) {
        layer.bindPopup(`<h3> ${featurecollection.features.properties.area_name}</h3>`);
    }

    //create geoJSON layer
    var crime = L.geoJSON(crimeData, {
        onEachFeature: onEachFeature,

        pointToLayer: function(feature, latlng) {
            var markers = {
                radius: 4,
                fillColor: "red",
                fillOpacity:.75,
                color: "black",
                stroke: true
            }
        return L.circle(latlng,markers);
        }
    });
    createMap(crime);
}

//use createmap to incorporate the earthquake data into the visualizaion
function createMap(crime) {
    //create street layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    //create basemap layer
    let baseMaps = {
        "Street Map": street
    }

    //create earthquake layer
    let overlayMaps = {
        "Crime": crime
    }
    // make the map with our variables
    let myMap = L.map("map", {
        center: [34.0549, -118.2426],
        zoom: 10,
        layers: [street, crime]
    });

    //add layer control
    L.control.layers(baseMaps, overlayMaps,{
        collapsed:false
    }).addTo(myMap);
};