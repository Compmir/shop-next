import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CatalogFilters } from "../../../components/CatalogFilter/CatalogFilters";
import { CatalogPaginate } from "../../../components/CatalogPaginate";
import { OrderCallModal } from "../../../components/Modals/OrderCallModal";
import { PrismaClient } from '@prisma/client'

export default function Search({
    goods, 
    
}) {
    const router = useRouter()
    const [selectedProduct, setSelectedProduct] = useState()
    const [isModalShow, setModalShowStatus] = useState(false)

    const orderProductClickHandler = (product) => {
        setSelectedProduct(product)
        setModalShowStatus(true)
    }

    const linkClickHandler = (quickLink) => {
        router.query["quickLink"] = quickLink
        router.push({href: router.path, query: {...router.query}})
    }

    function onScrollList(event) {
        alert("scroll"+event)

        const scrollBottom = event.target.scrollTop + 
              event.target.offsetHeight == event.target.scrollHeight;
      
          if (scrollBottom) {
              alert("scroll")
            //loadContent(); //API method
          }
    }
    // links=[] 
	//console.log(links)

    return (
      <div>
        <div className="requests">
      <div className="container">
          <div className="breadcrumbs">
              <div className="breadcrumbs__block-white">
              <Link href="/" ><a className="breadcrumbs__item-white">Главная</a></Link>
              </div>
              <div className="breadcrumbs__block-white">
              <Link href="/catalog/categories/0"><a className="breadcrumbs__item-white">Категории</a></Link>
              </div>
			  
			   <div className="breadcrumbs__block-white">   
                   <a style={{cursor: 'pointer'}} onClick={router.back} className="breadcrumbs__item breadcrumbs__item-white">Назад</a>
                </div>
							
							
          </div>
		
      </div>
  </div>

  <div className="cat-filter">
      <div className="container">
          <div className="cat-filter__content">
		    filters
          </div>
      </div>
  </div>

  <div className="catalog" onScroll={event => onScrollList(event)}>
      <div className="container">
          <div className="catalog__wrapper">
              {
                  goods.map((element, index) => {
					 // console.log(element)
                      return (
                        <div key={index} className="catalog__item">
                        <div className="catalog__item-img">
						<Image width="384px" height="256px" src={element.shop_product_images[0].image} alt="" /> 
                        </div>
                        <div style={{visibility: "hidden"}} className="catalog__item-favorite-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="gray"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </div>
                        <div className="catalog__item-title">{element.name} арт. {element.article}</div>
                        <div className="catalog__item-info">
                        {
                            element.shop_product_properties.map((element, index) => {
                                return (
                                    <div key={element.value} className="catalog__item-info-block">
                                        <div className="catalog__item-info-right">{element.property.name}</div>
                                        <div className="catalog__item-info-left">{element.value}</div>
                                    </div>
                                )
                            }).slice(0,4) // обрезаем оставшеися свойства
                        }

                        </div>
                        <div className="catalog__item-btns">
                            <a onClick={() => router.push(`/catalog/${element.slug}`)} className="catalog__item-more-btn">Подробнее</a>
                            <button onClick={() => orderProductClickHandler(element)} className="catalog__item-btn" data-modal>Оставить заявку</button>
                        </div>
                    </div>
                      )
                  })
                  
              }
            {
                !goods.length && <p style={{textAlign: "center", color:"#fff", fontSize: "24px"}}>Товары не найдены!</p>

            }
          </div>

          {   /* <CatalogPaginate pagesCount={pageCount}/> */
		  
		  }
                
            
            <OrderCallModal closeModal={() => setModalShowStatus(false)} isOpen={isModalShow} productName={selectedProduct?.name}/>
      </div>
  </div>

   <div ></div>
      </div>

     
    )
}

export async function getServerSideProps(context) {
	const {query} = context
    const string = query.string

	const prisma = new PrismaClient()	 
		const links2 = []

		
		let products = await prisma.shop_product.findMany({
				where:{ OR: [
					{article: {
					  contains: string
					}},
					{name: {
					  contains: string
					}},
					{description: {
					  contains: string
					}},
			      ]
				  
				},
				include: {
						shop_product_images: {
							orderBy: {
								order: 'asc'
							}
						}, 
						shop_product_properties: {				
							include: {
								property: 	true,
								
							},
						}
				} 
					
			
		})
		
		let filteredProducts=[]        
		let filtersList=[]
		let allProps=[]
	   
		

		for (var k in products){
			var newProps=[]
			var props=products[k].shop_product_properties
			var add=true
			for (var j in props){
				var pid=props[j].property_id
				if (props[j].property.is_filtered==1) {
					//-all props
					newProps.push(props[j])

				}//if is filtered
			}//for props
			
			if(add){
				filteredProducts[k]=products[k]//.shop_product_properties=newProps//.log(props) if(allProps[pid].indexOf(props[j].value)==-1) 
				filteredProducts[k].shop_product_properties=newProps//.log(props)
			}

		}//for products
		filteredProducts=filteredProducts.filter(n => n)

		products=JSON.parse(JSON.stringify(filteredProducts)) // <== here is a solution
		console.log(products)// products = productsResponse["products"]
	
		
        return {
            props: {
                goods: !products ? [] : products,
  
            }
        }
   /*  } catch (error) {
        return {
            props: {
                goods: [],
				links: [],
                pageCount: 0,
                error: error + ""
            }
        }
    } */
}