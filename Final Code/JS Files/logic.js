
//set center variable
var center = [34.0549, -118.2426];
//create openstreetmap tile layer
var osm = L.tileLayer(
    'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
    {attribution: '© OpenStreetMap contributors'}
);
//create empty layer groups for variables
var male = L.layerGroup()
var female = L.layerGroup()
var undef = L.layerGroup()
var vehicleStole = L.layerGroup()
var battery = L.layerGroup()
var burglary = L.layerGroup()
var idTheft = L.layerGroup()

// //base url for dataset
let baseurl = "https://data.lacity.org/resource/2nrs-mtv8.json?"

//set limitNumber for how many results you want to return up to 800,000 *note: will have issues if limit is above 2,000
let limitNumber = 3000
let limit = "$limit=" + limitNumber
let url = baseurl + limit

//use d3 to pull data from the API
d3.json(url).then(function(response){
    console.log(response)
    //for loop to iterate through the response
    for (let  i = 0; i < response.length; i++) {
        let location = response[i];
        //if statement to bind popups to lat/lon markers
        if (location) {
            var marker = L.marker([location.lat, location.lon])
                .bindPopup("Area: " + response[i].area_name + "<br/>" + "Crime Committed: " + response[i].crm_cd_desc + 
            "<br/>" + "Victim Age: " + response[i].vict_age + " // Victim Sex: " + response[i].vict_sex);
            //if...else statements to add specific variables to layers
            if (response[i].vict_sex === 'M') {
            male.addLayer(marker); // Add to male layer
            } else if (response[i].vict_sex === 'F') {
            female.addLayer(marker); // Add to female layer
            } else if (response[i].vict_sex === "X") {
            undef.addLayer(marker); // Add to Undefined Layer
            } else if (response[i].vict_sex === "undefined") {
            undef.addLayer(marker); // Add to Undefined Layer
            }
        }
    }
});
d3.json(url).then(function(response){
    console.log(response)
    //for loop to iterate through the response
    for (let  i = 0; i < response.length; i++) {
        let location = response[i];
        //if statement to bind popups to lat/lon markers
        if (location) {
            var marker = L.marker([location.lat, location.lon])
                .bindPopup("Area: " + response[i].area_name + "<br/>" + "Crime Committed: " + response[i].crm_cd_desc + 
            "<br/>" + "Victim Age: " + response[i].vict_age + " // Victim Sex: " + response[i].vict_sex);
            //if...else statements to add specific variables to layers
            if (response[i].crm_cd_desc === "VEHICLE - STOLEN") {
            vehicleStole.addLayer(marker); // Add to Stolen Vehicle Layer
            } else if (response[i].crm_cd_desc === "BATTERY - SIMPLE ASSAULT") {
            battery.addLayer(marker); // Add to Battery Layer
            } else if (response[i].crm_cd_desc === "BURGLARY FROM VEHICLE") {
            burglary.addLayer(marker); // Add to Burglary Layer
            } else if (response[i].crm_cd_desc === "BURGLARY") {
            burglary.addLayer(marker); // Add to Burglary Layer
            } else if (response[i].crm_cd_desc === "THEFT OF IDENTITY") {
            idTheft.addLayer(marker); // Add to ID Theft Layer
            }
        }
    }
});
// code beneath here is from https://github.com/jjimenezshaw/Leaflet.Control.Layers.Tree/tree/master
// edited to use our variables 
// allows for selection of multiple variables in a map visualization

// setup map and base tree
var map = L.map('map', {
    layers: [osm],
    center: center,
    zoom: 14
});
var baseTree = {
    label: 'BaseLayers',
    noShow: true,
    children: [
        {
            label: 'OpenStreeMap',
            layer: osm,
        }
    ]
};
//add layer control to base tree layer
var ctl = L.control.layers.tree(baseTree, null,
    {
        namedToggle: true,
        collapseAll: 'Collapse all',
        expandAll: 'Expand all',
        collapsed: false,
    });
ctl.addTo(map).collapseTree().expandSelected();
var hasAllUnSelected = function() {
    return function(ev, domNode, treeNode, map) {
        var anySelected = false;
        function iterate(node)
        {
            if (node.layer && !node.radioGroup) {
                anySelected = anySelected || map.hasLayer(node.layer);
            }
            if (node.children && !anySelected) {
                node.children.forEach(function(element) { iterate(element); });
            }
        }
        iterate(treeNode);
        return !anySelected;
    };
};
//create options variable to create section & subsection selectors 
var options = {
    label: '',
    selectAllCheckbox: false,
    children: [
        {label: 'Sex',
            selectAllCheckbox: true,
            children: [
                {label: 'Male', layer: male},
                {label: 'Female', layer: female},
                {label: 'Undefined', layer: undef}
            ]
        },
        {label: 'Crime Committed',
            selectAllCheckbox: true,
            children: [
                {label: 'Stolen Vehicle', layer: vehicleStole},
                {label: 'Burglary', layer: burglary},
                {label: 'Battery', layer: battery},
                {label: 'Identity Theft', layer: idTheft}
            ]
        }
    ]
};
var makePopups = function(node) {
    if (node.layer) {
        node.layer.bindPopup(node.label);
    }
    if (node.children) {
        node.children.forEach(function(element) { makePopups(element); });
    }
};
makePopups(options);

ctl.setOverlayTree(options).collapseTree(true).expandSelected(true);