// var pointsArray = document.getElementsByClassName('point');
//
// var revealPoint = function(point){
//                //for(var i=0; i<points.length; i++) {
//              point.style.opacity = 1;
//              point.style.transform = "scaleX(1) translateY(0)";
//              point.style.msTransform = "scaleX(1) translateY(0)";
//             point.style.WebkitTransform = "scaleX(1) translateY(0)";
//       //  }
//   };
// var animatePoints = function(points) {
//     forEach(points, revealPoint);
//
//    };

 var animatePoints = function() {
     var revealPoint = function() {
       $(this).css({
          opacity: 1,
          transform: 'scaleX(1) translateY(0)'
      });
    };
    $.each($('.point'), revealPoint);
};

        $(window).load(function(){

          if ($(window).height > 950) {
              animatePoints();
            }
          // var sellingPoints = document.getElementsByClassName('selling-points')[0];
          // var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
            var scrollDistance = $(sellingPoints).offset().top - $(window).height() + 200;

          $(window).scroll(function(event) {
          //  console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
          if ($(window).scrollTop() >= scrollDistance) {
              animatePoints();
         }
        });
    });
