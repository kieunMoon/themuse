import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  banner_midnight from './img/배너_미드나잇.jpg'
import  banner_opera from './img/배너_오페라의 유령.jpg'
import  banner_cats from './img/배너_캣츠.jpg'
import  banner_angel from './img/배너_천사에 관하여.jpg'
import  banner_interview from './img/배너_인터뷰.jpg'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true
     
    };

    return (
      <>
       
        <Slider {...settings}>
          <div>
           
          <img className="mySlides" src={banner_midnight} alt='배너 이미지' />
          </div>
          <div>
            
            <img className="mySlides" src={banner_cats} alt='배너 이미지' />
          </div>
          <div>
            
            <img className="mySlides" src={banner_opera} alt='배너 이미지' />
          </div>
          <div>
           
            <img className="mySlides" src={banner_angel} alt='배너 이미지' />
          </div>
          <div>
            
            <img className="mySlides" src={banner_interview} alt='배너 이미지' />
          </div>
          
        </Slider>
      </>

    );
  }
}