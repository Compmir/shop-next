import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { OrderCallModal } from '../../../components/Modals/OrderCallModal';
import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient();

export default function Collection({ goods, title }) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isModalShow, setModalShowStatus] = useState(false);

  const orderProductClickHandler = (product) => {
    setSelectedProduct(product);
    setModalShowStatus(true);
  };

  return (
    <div>
      <div className="requests">
        <div className="container">
          <div className="breadcrumbs">
            <div className="breadcrumbs__block-white">
              <Link href="/">
                <a className="breadcrumbs__item-white">Главная</a>
              </Link>
            </div>
            <div className="breadcrumbs__block-white">
              <a style={{ cursor: 'pointer' }} onClick={router.back} className="breadcrumbs__item breadcrumbs__item-white">
                Назад
              </a>
            </div>
            <div className="breadcrumbs__block">
              <span className="breadcrumbs__item">{title}</span>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="catalog" onScroll={event => onScrollList(event)}>*/}
      <div className="catalog">
        <div className="container">
          <div className="catalog__wrapper">
            {goods.map((element, index) => {
              return (
                <div key={index} className="catalog__item">
                  <div className="catalog__item-img">
                    <Image width="384px" height="256px" src={element?.image ? 'https://trade-group.su/' + element?.image : '/no-image.png'} alt="" />
                  </div>
                  <div style={{ visibility: 'hidden' }} className="catalog__item-favorite-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="gray">
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  </div>
                  <div className="catalog__item-title">{element.name}</div>
                  <div className="catalog__item-info">
                    {
                      element.properties
                        .map((element, index) => {
                          const property = element.name;
                          const value = element.value;

                          return (
                            <div key={index} className="catalog__item-info-block">
                              <div className="catalog__item-info-right">{property}</div>
                              <div className="catalog__item-info-left">{value}</div>
                            </div>
                          );
                        })
                        .slice(0, 4) // обрезаем оставшеися свойства
                    }
                  </div>
                  <div className="catalog__item-btns">
                    <a onClick={() => router.push(`/catalog/${element.slug}`)} className="catalog__item-more-btn">
                      Подробнее
                    </a>
                    <button onClick={() => orderProductClickHandler(element)} className="catalog__item-btn" data-modal>
                      Оставить заявку
                    </button>
                  </div>
                </div>
              );
            })}

            {!goods.length && <p style={{ textAlign: 'center', color: '#fff', fontSize: '24px' }}>Товары не найдены!</p>}
          </div>

          {/*<CatalogPaginate pagesCount={pageCount}/>*/}

          <OrderCallModal closeModal={() => setModalShowStatus(false)} isOpen={isModalShow} productName={selectedProduct?.name} />
        </div>
      </div>

      <div />
    </div>
  );
}

export async function getServerSideProps(context) {
	  const { params, query } = context;
	  console.log(params)
	  
  const data = await prisma.collection_product_ref.findMany({
    where: {
      collection_id: Number(params.id),
    },
    include: {
      collection: true, //!= null ? emailInput : undefined,
    },
  });
  let goods = [];
  let title = '';
  
  for (var el in data) {
    title = data[el].collection.title;
    let product = await prisma.shop_product.findFirst({
      where: {
        id: Number(data[el].product_id),
      },
      orderBy: [
	      { is_stock: 'desc'},
		  {  order: 'asc'},
	  ],
      include: {
        shop_product_images: {
          orderBy: {
            order: 'asc',
          },
        },
        shop_product_properties: {
          include: {
            property: true,
          },
        },
      },
    });
    if (product) {
      let props = [];
      for (var key in product.shop_product_properties) {
        let property = product.shop_product_properties[key].property;
        // console.log(property.is_filtered);

        if (property.is_filtered == true) props.push({ name: property.name, value: product.shop_product_properties[key].value });
      }
      //console.log('pid',props)
	  let img='/no-image.png'
      if (product.shop_product_images[0])  img=product.shop_product_images[0].image
      
	  goods.push({
        name: product.name,
        id: product.id,
        slug: product.slug,
        image: img,
        properties: props,
      });
    }
    /* else await prisma.collection_product_ref.delete({
			where: {
			  id: Number(data[el].id)		  
			},
		}) */
    //console.log('product',product.name)
  }

  //console.log(data)

  return {
    props: {
      goods: goods,
      title: title,
    }, // will be passed to the page component as props 10001000 cU_G468fU
  };
}
