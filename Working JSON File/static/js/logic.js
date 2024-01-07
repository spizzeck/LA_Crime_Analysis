// //create map object
let myMap = L.map("map", {
    center: [34.0549, -118.2426],
    zoom: 10
}); 


// //Adding the title layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// //base url for dataset
let baseurl = "https://data.lacity.org/resource/2nrs-mtv8.json?"

//set limitNumber for how many results you want to return up to 800,000 
let limitNumber = 2000
let limit = "$limit=" + limitNumber

let url = baseurl + limit

// Create a layer group for crime markers
var crime = L.layerGroup();

var male = L.layerGroup();

var female = L.layerGroup();

var undef = L.layerGroup();

d3.json(url).then(function(response){
    console.log(response)

    for (let  i = 0; i < response.length; i++) {
        let location = response[i];
        if (location) {
            var marker = L.marker([location.lat, location.lon])
                .bindPopup("Area:" + response[i].area_name + "<br/>" + "Crime Committed: " + response[i].crm_cd_desc + 
               "<br/>" + "Victim Age: " + response[i].vict_age + " // Victim Sex: " + response[i].vict_sex);
            
            if (response[i].vict_sex === 'M') {
               male.addLayer(marker); // Add to male layer
            } else if (response[i].vict_sex === 'F') {
               female.addLayer(marker); // Add to female layer
            } else undef.addLayer(marker); // Add to Undefined Layer
            
           // Always add to the "All Crime" layer
            crime.addLayer(marker);
        }
    }
    myMap.addLayer(crime);
    myMap.addLayer(male);
    myMap.addLayer(female);
    myMap.addLayer(undef);
});

var baseMaps = {
    "OpenStreetMap" : osm
};

var overlayMaps = {
"Males": male,
"Females": female,
"Undefined Sex": undef
};

myMap.addLayer(osm); // Default base layer

// Add layer control if needed
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false 
}).addTo(myMap);