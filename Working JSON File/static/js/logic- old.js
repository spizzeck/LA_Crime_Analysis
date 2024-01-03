//create map object
let myMap = L.map("map", {
    center: [34.0549, -118.2426],
    zoom: 11
}); 


//Adding the title layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://data.lacity.org/resource/2nrs-mtv8.json?$query=SELECT%20dr_no%2C%20date_rptd%2C%20date_occ%2C%20time_occ%2C%20area%2C%20area_name%2C%20rpt_dist_no%2C%20part_1_2%2C%20crm_cd%2C%20crm_cd_desc%2C%20mocodes%2C%20vict_age%2C%20vict_sex%2C%20vict_descent%2C%20premis_cd%2C%20premis_desc%2C%20weapon_used_cd%2C%20weapon_desc%2C%20status%2C%20status_desc%2C%20crm_cd_1%2C%20crm_cd_2%2C%20crm_cd_3%2C%20crm_cd_4%2C%20location%2C%20cross_street%2C%20lat%2C%20lon%20ORDER%20BY%20%3Aid%20ASC";

d3.json(url).then(function(response){
    console.log(response)
    let markers = L.markerClusterGroup();
    for (let  i= 0; i < response.length; i++) {
        let location = response[i];
        if (location) {
            markers.addLayer(L.marker([location.lat, location.lon])
            .bindPopup("Area:"  + response[i].area_name + "<br/>" + "Crime Committed: " + response[i].crm_cd_desc + 
            "<br/>" + "Victim Age: " + response[i].vict_age));
        }
    }
myMap.addLayer(markers);
})

