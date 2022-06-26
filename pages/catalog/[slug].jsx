//import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { OrderCallModal } from '../../components/Modals/OrderCallModal';
import { SearchVehicleForm } from '../../components/Forms/SearchVehicleForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client'

export default function Product({goods}) {
    const [showMore, setShowMore] = useState(false)
    const [isModalShow, setModalShowStatus] = useState(false)
    const [activeImage, setActiveImage] = useState(goods.images[0])

    const router = useRouter()
    
    const orderProductClickHandler = () => {
        setModalShowStatus(true)
    }
    
	if (goods.images && goods.images.length) {
		//setActiveImage(goods.images[0])
		console.log('ai', activeImage)
		
	
	}
		
    const isFile = value => {
        const arr = value?.split("/") ? value.split("/") : []
        return arr[arr.length - 1]?.includes(".pdf")
    }
     
	const changeActivePhoto = image => setActiveImage(image)

    if (goods) { // если товар существует - отрисовать его
        const item = goods // получаем товар
        return (
            <div>
            <Head>
                <title>{item["name"]}</title>
                <meta name="description" content={item["description"]}/>
            </Head>
            <div className="product-card">
                    <div className="container">
                        <div className="breadcrumbs">
                            <div className="breadcrumbs__block-white">
                                <Link href="/"><a  className="breadcrumbs__item breadcrumbs__item-white">Главная</a></Link>
                            </div>
                            <div className="breadcrumbs__block-white">
                                <a style={{cursor: 'pointer'}} onClick={router.back} className="breadcrumbs__item breadcrumbs__item-white">Назад</a>
                            </div>
                            <div className="breadcrumbs__block">
                                <span className="breadcrumbs__item">{item.article}</span>
                            </div>
                        </div>
                        <div className="product-card__wrapper">
                            <div className="product-card__img-box">
                                {
                                    activeImage ?
                                        <div className="product-card__slider">
                                            <div className="product-card__slider-item">
                                                <Image width="400px" height="355px"
                                                       src={activeImage.image}
                                                       alt={item.name}/>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
								<div>
                                {
                                    item.images && item.images.length ? item.images.map(image => {
										/*  className={image.id === activeImage.id ? "product-cards__additional-active" : "product-cards__additional"} */
                                            return (
                                                <div 
                                                    
                                                    key={image.id} onClick={() => changeActivePhoto(image)}>
                                                    <div style={{float: 'left'}}  className="product-cards__additional_photo">
                                                        <Image
                                                            src={image.image}
                                                            alt={item.name} width="100px" height="100px" />                                                   
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <></>
                                }
								
								
                                </div>
                              
								<br />
								<br />
								{/* <p className="product-card__price-old">1 234 567 ₽</p> */}
								
								
                                <p className="product-card__price-new">{item.price}</p>
                                <a href="#" className="product-card__link">Нашли дешевле? Снизим цену!</a>
                            </div>
                            <div className="product-card__content">
                                <p className="product-card__title">{item.name}</p>
                                <p className="product-card__articul">Код товара: {item.id}</p>
                                <div className="product-card__btns">
                                    <a href="#" className="product-card__favorite">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="gray"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                                    </a>
                                </div>
                                <div className="product-card__tabs">
                                    <div className="tabs">
                                        <ul>
                                            <li className="product-card__tabs-item is-active">Характеристики</li>
                                            <li className="product-card__tabs-item">Дополнительная информация</li>
                                        </ul>
                                    </div>
                                    <div className="product-card__tabs-catalog characteristic">
                                        <div className="characteristic-wrapper">
                                            {
                                                item.properties.map((element, index) => {
                                                    const property = element.name
                                                    const value = element.value
													console.log(index,element)

                                                    return (
                                                    <div key={index} className="product-card__tabs-catalog-item bottom-line">
                                                        <div className="product-card__tabs-catalog-item-left">
                                                            {property + ":"}
                                                        </div>
                                                        <div className="product-card__tabs-catalog-item-right">
                                                            {
                                                              isFile(value) 
                                                              ? 
                                                                <a 
                                                                    rel="noreferrer" 
                                                                    target={"_blank"} 
                                                                    href={"http://trade-group.su" + value} 
                                                                    className="characteristic-show-more"
                                                                >
                                                                    Скачать
                                                                </a>
                                                              : value
                                                            }
                                                        </div>
                                                    </div>
                                                    )
                                                }).slice(0, showMore ? item.properties.length : 5)
                                            }
                                        </div>
                                        <a onClick={() => setShowMore((status) => !status)} className="characteristic-show-more">{ showMore ? "Спрятать" : "Показать еще"}</a>
                                    </div>
                                    <div className="product-card__tabs-catalog addinfo hide">
                                        <div className="product-card__tabs-catalog-item">
                                            <div className="product-card__tabs-catalog-item-addinfo">
                                                <span>Lorem ipsum dolor sit amet consectetur</span> adipisicing elit. Quasi quos id tempora quibusdam voluptatibus veritatis alias possimus expedita quia repudiandae voluptate dolorem tempore, atque sequi ducimus sint exercitationem ullam assumenda! Nisi eius aliquam, possimus at vel debitis quidem molestiae beatae mollitia. Aliquid molestiae sequi reprehenderit blanditiis provident earum, accusantium reiciendis!
                                                <br/>
                                                <br/>
                                                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit</span>. Alias dolorem rem repudiandae unde eum obcaecati vitae assumenda quos necessitatibus dolorum perspiciatis aperiam architecto dignissimos soluta tenetur, harum, non voluptatibus nostrum.
                                                <br/>
                                                <br/>
                                                <span>Lorem ipsum dolor</span>, sit amet consectetur adipisicing elit. Modi et cumque nulla! Ipsa sunt accusamus natus tempore ea illo ad ipsam facilis sint, quae eos reiciendis, voluptatem eius nihil exercitationem voluptates ratione aspernatur officiis ab non. Ullam, odit, modi commodi eum quisquam architecto tempore debitis recusandae maxime neque fuga impedit?
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={orderProductClickHandler} className="product-card__pay-btn">Купить</button>
                                <OrderCallModal isOpen={isModalShow} productName={item.name} closeModal={() => setModalShowStatus(false)}/>
                            </div>
                        </div>
                    </div>
                </div>
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
            
        )
    }

    return (
        <div>Товар не найден</div>
    )

}


export async function getServerSideProps(context) {
    const {params} = context
    const link=`https://trade-group.su/apicatalog?slug=${params.slug}`
	console.log(link)
    
    //
    
   // const  url= process.env.fetchHttp+"/api/catalog?slug="+params.slug
  /*   const  url= process.env.fetchHttp+"/hello?slug="+params.slug
	console.log(url) 
    const res = await fetch(url)
    const data = await res.json()
    console.lo		
g(data)
         */
		 
	const prisma = new PrismaClient()	 
    let data = await prisma.shop_product.findFirst({
			where: {
			  slug: params.slug 
			},
			include: {
				shop_product_images: {
							orderBy: {
								order: 'asc'
							}
						}, 
				shop_product_properties: {include: {
						property: true,
					},
				}
			}
	})
	//console.log('data' , data.shop_product_properties)
	data.src=data.shop_product_images[0].image
	data.images=data.shop_product_images
	if (data.price==0) data.price='На заказ'
	
	let props=[]
    for (var key in data.shop_product_properties) {
		let property=data.shop_product_properties[key].property	
			 props.push({name:property.name, value: data.shop_product_properties[key].value})
    }
	data.properties=props
    

    try {
      
	/* 	
        if(data===null)
			data = await prisma.shop_product.findFirst({
			where: {
			  id: Number(id)
			},
			include: {
				images: true, 
				properties: {include: {
					property: true,
				},
				}
			}
			}) */
	//	let response=data	  
      // const response = (await axios.get(link)).data
	 //  console.log('old ',response)

        return {
            props: {
                goods: data,
            }
        }
    } catch(e) {
        return {
            props: {
                goods: null
            }
        }
    }
}