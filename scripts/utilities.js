/*
var points = document.getElementsByClassName('point');

var forEach = function(pntInput){
    
    var nccCallback = function(index){
    console.log("Selling Point <div> index " + [index] + " is output number " + (index + 1));
    }
    
    for (var i = 0; i < points.length; i++){
        nccCallback(i);
    }
    
};



forEach(points);
*/

function forEach(array, callback){
    for (var i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}