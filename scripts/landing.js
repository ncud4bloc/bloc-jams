var animatePoints = function() {
 
    var points = document.getElementsByClassName('point');
    
/* Neil Cudden Stuff 
Added a 45 degree rotation 
Changed the transition behaviour in landing.css */
    
    var revealPoint = function(index){
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0) rotate(45deg)";
        points[index].style.msTransform = "scaleX(1) translateY(0) rotate(45deg)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0) rotate(45deg)";
        
    };

    for(var i=0;i<points.length;i++){
        revealPoint(i); 
    }
};