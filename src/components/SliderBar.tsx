import { useId } from "react";

import Slider from "react-slick";
import { dataDigitalBestSeller } from "./Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SliderBar = () => {
  const id = useId();
  return (
    <Slider {...settings}>
      {dataDigitalBestSeller.map((item) => (
        <div className="card" key={id}>
          <div className="card-top">
            <img src={item.image} alt={item.title} />
            <h1>{item.title}</h1>
          </div>
          <div className="card-bottom">
            <h3>{item.price}</h3>
            <h2>{item.start_production}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderBar;
