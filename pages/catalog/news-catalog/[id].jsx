//import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

export default function NewsCatalogItem({ newsItem }) {
  if (newsItem) {
    console.log(newsItem.image);
    return (
      <div className="product-card">
        <div className="container">
          <div className="breadcrumbs">
            <div className="breadcrumbs__block-white">
              <Link href="/">
                <a className="breadcrumbs__item breadcrumbs__item-white">Главная</a>
              </Link>
            </div>
            <div className="breadcrumbs__block-white">
              <Link href="/news-catalog">
                <a style={{ cursor: 'pointer' }} className="breadcrumbs__item breadcrumbs__item-white">
                  Новости
                </a>
              </Link>
            </div>
            <div className="breadcrumbs__block">
              <span className="breadcrumbs__item">{newsItem.title}</span>
            </div>
          </div>
          <div className="product-card__wrapper">
            <div className="product-card__img-box">
              <div className="product-card__slider">
                <div className="product-card__slider-item swiper-slide">
                  <img width="400px" height="355px" src={newsItem.image} alt="" />
                </div>
              </div>
            </div>
            <div className="product-card__content">
              <p className="product-card__title">{newsItem.title}</p>
              <div className="product-card__tabs">
                <div className="product-card__tabs-catalog characteristic">
                  <div dangerouslySetInnerHTML={{ __html: newsItem.text }} className="characteristic-wrapper" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Новость не найдена</h1>;
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  // const newsItemRequest = (await axios.get(`https://trade-group.su/apinews?id=${params.id}`)).data
  const prisma = new PrismaClient();
  let newsItemRequest = await prisma.news.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  newsItemRequest = JSON.parse(JSON.stringify(newsItemRequest)); // <== here is a solution

  return {
    props: {
      newsItem: newsItemRequest ? newsItemRequest : '',
    },
  };
};
