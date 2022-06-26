import Image from "next/image"
import Link from "next/link"

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


export const News = () => {
    return (
        <section className="news">
        <div className="container">
            <div className="news__wrapper">
                <h2 className="title">НОВОСТИ КОМПАНИИ</h2>
                <div className="news__slider-btns">
                    <div className="news__slider-prev">
                        <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 11.5H1M1 11.5L13.1875 22M1 11.5L13.1875 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="news__slider-next">
                        <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11.5H31M31 11.5L18.8125 1M31 11.5L18.8125 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>                                            
                    </div>
                </div>
                <div className="news__inner">
                    <div className="news__slider">
                        <div className="swiper-wrapper">
                         <Swiper
                            modules={[Navigation]}      
                            slidesPerView={3}
                            spaceBetween={30}
                            navigation={{
                                nextEl: ".news__slider-next",
                                prevEl: ".news__slider-prev"
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                769: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                },
                                993: {
                                    spaceBetween: 30,
                                    slidesPerView: 2,
                                },
                                1200: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                1440: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                         >
                            <SwiperSlide>
                                <div className="news__item swiper-slide">
                                    <div className="news__item-img">
                                        <Image objectFit='cover' width="400px" height="226px" src="/news/img-2.webp" alt=""  />
                                    </div>
                                    <p className="news__item-date">17.02.2022</p>
                                    <p className="news__item-title">Новая техника на складе</p>
                                    <p className="news__item-text">
                                        На склад Warehouse automation поступила большая партия складской техники EP.
                                        Среди представленных к продаже моделей – новые погрузчики. На склад Warehouse automation поступила большая партия складской техники EP
                                    </p>
                                    <Link href="#/news/new-teknik"><a className="news__item-link">Читать полностью</a></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="news__item swiper-slide">
                                    <div className="news__item-img">
                                        <Image objectFit='cover' width="400px" height="226px" src="/news/img-2.webp" alt=""  />
                                    </div>
                                    <p className="news__item-date">17.02.2022</p>
                                    <p className="news__item-title">Новая техника на складе</p>
                                    <p className="news__item-text">
                                        На склад Warehouse automation поступила большая партия складской техники EP.
                                        Среди представленных к продаже моделей – новые погрузчики. На склад Warehouse automation поступила большая партия складской техники EP
                                    </p>
                                    <Link href="#/news/new-teknik"><a className="news__item-link">Читать полностью</a></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="news__item swiper-slide">
                                    <div className="news__item-img">
                                        <Image objectFit='cover' width="400px" height="226px" src="/news/img-2.webp" alt=""  />
                                    </div>
                                    <p className="news__item-date">17.02.2022</p>
                                    <p className="news__item-title">Новая техника на складе</p>
                                    <p className="news__item-text">
                                        На склад Warehouse automation поступила большая партия складской техники EP.
                                        Среди представленных к продаже моделей – новые погрузчики. На склад Warehouse automation поступила большая партия складской техники EP
                                    </p>
                                    <Link href="#/news/new-teknik"><a className="news__item-link">Читать полностью</a></Link>
                                </div>
                            </SwiperSlide>
                         </Swiper>
                        
                        </div>
                        <div className="swiper-scrollbar"></div>
                    </div>
                </div>
               <Link href="#/news"><a className="news__link">Читать все новости</a></Link>
            </div>
        </div>
    </section>
    )
}