import React from "react";
import Slider from "react-slick";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="row">
        <div className="col-md-8">
        <Slider {...settings}>
      
      </Slider>
        </div>
        
        <div className="col-md-4">
            
        </div>
    </div>
    
  );
}