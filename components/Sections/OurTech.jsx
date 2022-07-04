import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoodsFilterModal } from '../Modals/GoodsFilterModal';

export const OurTech = ({ techBlock, techTitle, techItems, techPlus }) => {
  const [isModalShow, setModalShowStatus] = useState(false);

  const clickHandler = () => {
    setModalShowStatus(true);
  };

  return (
    <section id="our-tech" className="our-tech" ref={techBlock}>
      <div className="container">
        <div className="our-tech__wrapper">
          <div className="our-tech__content">
            <h2 className="title" ref={techTitle}>
              Наша техника
            </h2>
            <div className="our-tech__slider-btns">
              <div className="our-tech__prev">
                <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31 11.5H1M1 11.5L13.1875 22M1 11.5L13.1875 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="our-tech__next">
                <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11.5H31M31 11.5L18.8125 1M31 11.5L18.8125 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <Swiper
            className="our-tech__slider"
            modules={[Navigation]}
            slidesPerView={3}
            slidesPerGroup={3}
            navigation={{
              nextEl: '.our-tech__next',
              prevEl: '.our-tech__prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              480: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              993: {
                slidesPerView: 3,
                slidesPerGroup: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}>
            <SwiperSlide className="our-tech__slider-item">
              <div ref={(e) => (techItems.current[0] = e)}>
                <img className="our-tech-slide1" src="/1.webp" alt="" />
                <button data-filter className="our-tech__btn1" ref={(e) => (techPlus.current[0] = e)}>
                  <Image onClick={clickHandler} objectFit="cover" width="55px" height="55px" src="/our-tech-btn.svg" alt="btn" />
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className="our-tech__slider-item">
              <div ref={(e) => (techItems.current[1] = e)}>
                <img className="our-tech-slide3" src="/3.webp" alt="" />
                <button data-filter className="our-tech__btn3" ref={(e) => (techPlus.current[1] = e)}>
                  <Image onClick={clickHandler} objectFit="cover" width="55px" height="55px" src="/our-tech-btn.svg" alt="btn" />
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className="our-tech__slider-item">
              <div ref={(e) => (techItems.current[2] = e)}>
                <img className="our-tech-slide2" src="/2.webp" alt="" />
                <button data-filter className="our-tech__btn2" ref={(e) => (techPlus.current[2] = e)}>
                  <Image onClick={clickHandler} objectFit="cover" width="55px" height="55px" src="/our-tech-btn.svg" alt="btn" />
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <GoodsFilterModal isOpen={isModalShow} closeModal={() => setModalShowStatus(false)} />
    </section>
  );
};
