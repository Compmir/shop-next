import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient()

import { Lizing } from '../components/Sections/Lizing';
import { News } from '../components/Sections/News';
import { OurTech } from '../components/Sections/OurTech';
import { SearchVehicleForm } from '../components/Forms/SearchVehicleForm';
import { OrderCallModal } from '../components/Modals/OrderCallModal';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap/dist/gsap';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function Home({news}) {
	
  const [isModalShow, setModalShowStatus] = useState(false);
  const introTitle = useRef();
  const mapImg = useRef();
  const carImg = useRef();
  const questionBtn = useRef();
  const ageCount = useRef();
  const productCount = useRef();
  const hoursCount = useRef();
  const dayCount = useRef();
  const whyBlock = useRef();
  const whyTitle = useRef();
  const whyItems = useRef([]);
  const techBlock = useRef();
  const techTitle = useRef();
  const techItems = useRef([]);
  const techPlus = useRef([]);
  const deliveryBlock = useRef();
  const deliveryTitle = useRef();
  const deliveryDots = useRef([]);
  const deliveryText = useRef([]);
  const deliveryFeedback = useRef();
  const deliveryFeedbackItems = useRef([]);
  const deliveryFeedbackTitle = useRef();
  const saleBlock = useRef();
  const saleTitleRed = useRef();
  const saleTitleWhite = useRef();
  const saleBtn = useRef();
  const lizingBlock = useRef();
  const lizingImg = useRef();
  const lizingTitle = useRef();
  const lizingItems = useRef([]);
  const lizingText = useRef();
  const lizingBtn = useRef();
  const lizingDots = useRef([]);
  const lizingBrands = useRef([]);
  const newsBlock = useRef();
  const newsTitle = useRef();
  const newsLeftArr = useRef();
  const newsRightArr = useRef();
  const newsItems = useRef([]);
  const newsBtn = useRef();
  useEffect(() => {
    const duration = 0.3;
    const percent = 15;
    gsap.registerPlugin(ScrollTrigger);
    startCount();
    gsap.set(introTitle.current, { xPercent: -15, opacity: 0, visibility: 'visible' });
    gsap.set(carImg.current, { xPercent: 15, opacity: 0 });
    gsap.set(mapImg.current, { opacity: 0 });
    gsap.set(questionBtn.current, { xPercent: -15, opacity: 0, visibility: 'visible' });
    gsap.set(whyTitle.current, { xPercent: -15, opacity: 0 });
    gsap.set(techTitle.current, { xPercent: -15, opacity: 0 });
    gsap.set(techItems.current, { xPercent: -15, opacity: 0 });
    gsap.set(techPlus.current, { scale: 0 });
    gsap.set(deliveryTitle.current, { opacity: 0 });
    gsap.set(deliveryDots.current, { scale: 0 });
    gsap.set(deliveryText.current, { opacity: 0 });
    gsap.set(deliveryFeedback.current, { opacity: 0 });
    gsap.set(deliveryFeedbackItems.current, { opacity: 0 });
    gsap.set(deliveryFeedbackTitle.current, { opacity: 0, xPercent: -15 });
    gsap.set(saleTitleRed.current, { opacity: 0, xPercent: 20 });
    gsap.set(saleTitleWhite.current, { opacity: 0, xPercent: -20 });
    gsap.set(saleBtn.current, { opacity: 0 });
    gsap.set(lizingImg.current, { opacity: 0 });
    gsap.set(lizingTitle.current, { opacity: 0, xPercent: 20 });
    gsap.set(lizingDots.current, { scale: 0 });
    gsap.set(lizingItems.current, { opacity: 0 });
    gsap.set(lizingText.current, { opacity: 0, xPercent: 30 });
    gsap.set(lizingBtn.current, { opacity: 0, xPercent: 30 });
    gsap.set(lizingBrands.current, { opacity: 0, xPercent: -15 });
    gsap.set(newsTitle.current, { opacity: 0, xPercent: -10 });
    gsap.set(newsLeftArr.current, { scale: 0 });
    gsap.set(newsRightArr.current, { scale: 0 });
    gsap.set(newsItems.current, { xPercent: -5, opacity: 0 });
    gsap.set(newsBtn.current, { opacity: 0 });
    //   GSAP ACTION
    gsap.to(questionBtn.current, { opacity: 1, duration, xPercent: 0, delay: 1.2 });
    gsap.timeline({ delay: 0.7 }).to(introTitle.current, { opacity: 1, duration, xPercent: 0 }).to(mapImg.current, { opacity: 1, duration: 1 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: whyBlock.current,
          start: 'top 70%',
        },
      })
      .to(whyTitle.current, {
        xPercent: 0,
        opacity: 1,
        delay: 0.3,
        duration,
      })
      .fromTo(
        whyItems.current,
        { xPercent: -15, opacity: 0 },
        {
          xPercent: 0,
          stagger: 0.2,
          opacity: 1,
          duration,
          //   delay: 0.3,
        },
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: techBlock.current,
          start: 'top 70%',
        },
      })
      .to(techTitle.current, { xPercent: 0, opacity: 1 })
      .to(techItems.current, { xPercent: 0, stagger: 0.2, opacity: 1 })
      .to(techPlus.current, { scale: 1, duration: 0.4 });
    gsap
      .timeline({
        scrollTrigger: {
          delay: 0.2,
          trigger: deliveryBlock.current,
          start: 'top 70%',
        },
      })
      .to(deliveryTitle.current, { opacity: 1, duration: 0.3, ease: 'expo.in' })
      .to(deliveryDots.current, { scale: 1, delay: 0.2, duration: 0.5, ease: 'expo.out' })
      .to(deliveryText.current, { opacity: 1, delay: 0.2, duration: 0.4 })
      .to(deliveryFeedback.current, { opacity: 1, duration: 0.6 })
      .to(deliveryFeedbackTitle.current, { opacity: 1, duration: 0.3, xPercent: 0 })
      .to(deliveryFeedbackItems.current, { opacity: 1, duration: 0.5, delay: 0.2 });

    gsap
      .timeline({
        scrollTrigger: {
          delay: 0.2,
          trigger: saleBlock.current,
          start: 'top 70%',
        },
      })
      .to([saleTitleRed.current, saleTitleWhite.current], { xPercent: 0, opacity: 1 })
      .to(saleBtn.current, { opacity: 1, delay: 0.2 });

    gsap
      .timeline({
        scrollTrigger: {
          delay: 0.2,
          trigger: lizingBlock.current,
          start: 'top 70%',
        },
      })
      .to(lizingImg.current, { opacity: 1, duration: 0.2, delay: 0.1 })
      .to(lizingTitle.current, { opacity: 1, xPercent: 0, delay: 0.1 })
      .to(lizingDots.current, { scale: 1, stagger: 0.1, duration: 0.2, ease: 'back.out(1.7)' })
      .to(lizingItems.current, { opacity: 1, duration: 0.2 })
      .to(lizingText.current, { opacity: 1, xPercent: 0, duration: 0.2 })
      .to(lizingBtn.current, { opacity: 1, xPercent: 0, duration: 0.2 })
      .to(lizingBrands.current, { opacity: 1, xPercent: 0, duration: 0.2, stagger: 0.1 });
    gsap
      .timeline({
        scrollTrigger: {
          delay: 0.2,
          trigger: newsBlock.current,
          start: 'top 70%',
        },
      })
      .to(newsTitle.current, { opacity: 1, xPercent: 0, duration: 0.5 })
      .to([newsLeftArr.current, newsRightArr.current], { scale: 1, duration: 0.5, ease: 'expo.out' })
      .to(newsItems.current, { stagger: 0.2, xPercent: 0, opacity: 1 })
      .to(newsBtn.current, { opacity: 1, duration: 0.5, ease: 'expo.out' });
  }, []);
  const startAgeCount = async () => {
    for (let index = 0; index <= 12; index++) {
      await sleep(50);
      ageCount.current.innerHTML = index;
    }
  };
  const startHoursCount = async () => {
    for (let index = 0; index <= 24; index++) {
      await sleep(50);
      hoursCount.current.innerHTML = index;
    }
  };
  const startDayCount = async () => {
    for (let index = 0; index <= 7; index++) {
      await sleep(50);
      dayCount.current.innerHTML = index;
    }
  };
  const startProductCount = async () => {
    for (let index = 0; index <= 2500; index += 20) {
      await sleep(5);
      productCount.current.innerHTML = index + '+';
    }
  };

  const startCount = () => {
    startAgeCount();
    startProductCount();
    startHoursCount();
    startDayCount();
  };
  return (
    <div className="wrapper" id="up">
      <section className="intro">
        <div className="container">
          <div className="intro__wrapper">
            <div className="intro__left">
              <h1 ref={introTitle}>
                Вилочные погрузчики и техника <span>для склада с доставкой по России</span>
              </h1>
              <div className="intro__btns">
                <button className="intro__btn intro__btn-white-hover" onClick={() => setModalShowStatus(true)} ref={questionBtn}>
                  Задать вопрос менеджеру
                </button>
                <OrderCallModal isOpen={isModalShow} closeModal={() => setModalShowStatus(false)} /> {/*не влияет на вёрстку, это модальное окно которое будет отбражатся при клике на .header__btn */}
              </div>
              <div className="intro__statistic">
                <div className="intro__statistic-item">
                  <p className="intro__statistic-num" ref={ageCount}></p>
                  <p className="intro__statistic-text">лет поставляем технику нашим клиентам</p>
                </div>
                <div className="intro__statistic-item">
                  <p className="intro__statistic-num" ref={productCount}></p>
                  <p className="intro__statistic-text">более 2500 единиц техники было поставлено</p>
                </div>
                <div className="intro__statistic-item">
                  <div className="intro__statistic-num">
                    <p ref={hoursCount}></p> <span>/</span> <p ref={dayCount}></p>
                  </div>
                  <p className="intro__statistic-text">техническое сервисное обслуживание вашей техники</p>
                </div>
              </div>
            </div>
            <div className="intro__right" ref={mapImg}>
              <div className="intro__bg-elem">
                <Image className="intro__right-img" width="903px" height="674px" src="/s1-elem.webp" alt="" />
              </div>
              <div className="intro__bg-elem2">
                <Image width="1001px" height="975px" objectFit="contain" src="/s1-elem2.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="why" ref={whyBlock}>
        <div className="container">
          <h2 className="title" ref={whyTitle}>
            ПОЧЕМУ НАМ ДОВЕРЯЮТ
          </h2>
          <div className="why__wrapper">
            <div className="why__item" ref={(e) => (whyItems.current[0] = e)}>
              <div className="why__item-num">01</div>
              <div className="why__item-content">
                <div className="why__item-title">Прямые поставки от производителей</div>
                <div className="why__item-text">Мы занимаемся поставкой складской техники, вилочных погрузчиков и явлемся официальным дилером ведущих производителей техники для склада и вилочных погрузчиков EP Equipment и Liugong.</div>
              </div>
            </div>
            <div className="why__item" ref={(e) => (whyItems.current[1] = e)}>
              <div className="why__item-num">02</div>
              <div className="why__item-content">
                <div className="why__item-title">Персональный подбор техники</div>
                <div className="why__item-text">Мы всегда готовы оказать профессиональную помощь на всех этапах сотрудничества, проконсультировать по техническим вопросам, или помочь приобрести технику на удобных для вас условиях.</div>
              </div>
            </div>
            <div className="why__item" ref={(e) => (whyItems.current[2] = e)}>
              <div className="why__item-num">03</div>
              <div className="why__item-content">
                <div className="why__item-title">Гибкая ценовая политика</div>
                <div className="why__item-text">Наши клиенты это в основном представители крупного, среднего и малого бизнеса, а так жегосударственные компании и частные предприниматели.</div>
              </div>
            </div>
            <div className="why__item" ref={(e) => (whyItems.current[3] = e)}>
              <div className="why__item-num">04</div>
              <div className="why__item-content">
                <div className="why__item-title">Сервисная сеть по всей России</div>
                <div className="why__item-text">Для нас не принцпиально из какого региона России вы к нам обращаетесь, мы доставим технику в любую точку страны точно и в срок.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurTech techBlock={techBlock} techTitle={techTitle} techItems={techItems} techPlus={techPlus} />

      <section id="delivery" className="delivery" ref={deliveryBlock}>
        <div className="container">
          <div className="delivery__wrapper">
            <div className="delivery__content">
              <h2 className="title delivery__title" ref={deliveryTitle}>
                ДОСТАВКА
              </h2>
              <div className="delivery__content-bg">
                <Image width="29" height="29" src="/vector-map.webp" alt="" />
              </div>
              <div className="delivery__content-block">
                <div className="delivery__item">
                  <div style={{ width: '29px', height: '29px' }} ref={(e) => (deliveryDots.current[0] = e)}>
                    <Image width="29" height="29" src="/dot-elem.svg" alt="icon" />
                  </div>

                  <p className="delivery__text" ref={(e) => (deliveryText.current[0] = e)}>
                    Доставка осуществляется в любой регион России
                  </p>
                </div>
                <div className="delivery__item">
                  <div style={{ width: '29px', height: '29px' }} ref={(e) => (deliveryDots.current[1] = e)}>
                    {' '}
                    <Image width="29" height="29" src="/dot-elem.svg" alt="icon" />
                  </div>
                  <p className="delivery__text" ref={(e) => (deliveryText.current[1] = e)}>
                    До грузового терминала транспортной компании продукция доставляется бесплатно
                  </p>
                </div>
                <div className="delivery__item">
                  <div style={{ width: '29px', height: '29px' }} ref={(e) => (deliveryDots.current[2] = e)}>
                    <Image width="29" height="29" src="/dot-elem.svg" alt="icon" />
                  </div>
                  <p className="delivery__text" ref={(e) => (deliveryText.current[2] = e)}>
                    В дальнейшем клиент оплачивает услуги транспортной компании по действующим тарифам
                  </p>
                </div>
              </div>
            </div>
            <div className="delivery__form" ref={deliveryFeedback}>
              <p className="delivery__form-title" ref={deliveryFeedbackTitle}>
                Подберем технику за 15 минут
              </p>
              <p ref={(e) => (deliveryFeedbackItems.current[0] = e)} className="delivery__form-subtitle">
                Оставьте свой номер, и мы перезвоним вам
              </p>
              <SearchVehicleForm delivery deliveryFeedbackItems={deliveryFeedbackItems} />
            </div>
          </div>
        </div>
      </section>

      <div className="sale" ref={saleBlock}>
        <div className="container">
          <div className="sale__wrapper">
            <div>
              <div className="sale__title">
                <div ref={saleTitleRed}>распродажа техники</div> <p ref={saleTitleWhite}>с максимальной скидкой</p>
              </div>
              <div className="sale__link intro__btn-red-hover" ref={saleBtn}>
                <Link href="/catalog/categories/0">
                  <a className="sale__link-text "> Перейти в каталог </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lizing lizingBlock={lizingBlock} lizingImg={lizingImg} lizingTitle={lizingTitle} lizingItems={lizingItems} lizingText={lizingText} lizingBtn={lizingBtn} lizingDots={lizingDots} />

      <div className="partners">
        <div className="partners__slider">
          <div className="partners__wrapper">
            <div className="partners__item" ref={(e) => (lizingBrands.current[0] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/sber-lizing.webp" alt="Сбер лизинг" />
            </div>
            <div className="partners__item" ref={(e) => (lizingBrands.current[1] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/alfa-lizing.webp" alt="" />
            </div>
            <div className="partners__item " ref={(e) => (lizingBrands.current[2] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/balt-lizing.webp" alt="" />
            </div>
            <div className="partners__item" ref={(e) => (lizingBrands.current[3] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/europlan.webp" alt="" />
            </div>
            <div className="partners__item " ref={(e) => (lizingBrands.current[4] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/peco.webp" alt="" />
            </div>
            <div className="partners__item " ref={(e) => (lizingBrands.current[5] = e)}>
              <Image objectFit="contain" width="180" height="40" src="/partners/sovkombank.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
	  {
/*       // <News newsBlock={newsBlock} newsLeftArr={newsLeftArr} newsRightArr={newsRightArr} newsItems={newsItems} newsBtn={newsBtn} newsTitle={newsTitle} />
 */
 
	  }
	  
      <div className="map">
        <div className="container">
          <div className="map__wrapper">
            <div className="map__form map__form">
              <p className="map__form-title">Подберем технику за 15 минут</p>
              <p className="map__form-subtitle">Оставьте свой номер, и мы перезвоним вам</p>
              <SearchVehicleForm />
            </div>
            <a href="https://yandex.uz/maps/213/moscow/house/likhoborskaya_naberezhnaya_3s9/Z04YcwVhQUICQFtvfXR0dXxrZg==/?ll=37.520370%2C55.853907&z=17.54" id="map-block" className="map__block"></a>
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps() {
  const posts = await prisma.news.findMany({
      orderBy: {
            id: 'desc',
          },
		  take: 4
  })
	const data=JSON.parse(JSON.stringify(posts)) // <== here is a solution

   console.log(posts)
  return {
    props : { data }
  }
}