import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CatalogFilters } from "../../components/CatalogFilter/CatalogFilters";
import { CatalogPaginate } from "../../components/CatalogPaginate";
import { OrderCallModal } from "../../components/Modals/OrderCallModal";
import { PrismaClient } from '@prisma/client'

export default function Catalog({
    goods, 
    pageCount,
    filtersList,
    links,
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
		  {console.log(links)}
          {links.length>0 && (  
               <div className="requests__wrapper">
              <div className="requests__title">Популярные запросы</div>
              <div className="requests__inner">
                  <ul>
                      {
                             links?.map(link => {
							
                           // const quickLink = link["url"]?.split("?")[1]
							  const ql="/catalog/collection/"+link.id  
							  console.log(ql,link.collection.title)
							  
                              return (
                                <li key={link.id}>
									<Link className="requests__link" href={ql}>
                                      <a  className="requests__link" >  {link.collection.title} </a>
                                    </Link>
                                   
                                </li>
                              )
                          }) 
                      }
                  </ul>
              </div>
               </div>
          )}


       
      </div>
  </div>

  <div className="cat-filter">
      <div className="container">
          <div className="cat-filter__content">
		  {  <CatalogFilters filtersList={filtersList}/>  }
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
						<Image width="384px" height="256px" src={element.product.shop_product_images[0].image} alt="" /> 
                        </div>
                        <div style={{visibility: "hidden"}} className="catalog__item-favorite-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="gray"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </div>
                        <div className="catalog__item-title">{element.product.name}</div>
                        <div className="catalog__item-info">
                        {
                            element.product.shop_product_properties.map((element, index) => {
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
                            <a onClick={() => router.push(`/catalog/${element.product.slug}`)} className="catalog__item-more-btn">Подробнее</a>
                            <button onClick={() => orderProductClickHandler(element.product)} className="catalog__item-btn" data-modal>Оставить заявку</button>
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
    const category = query["categories"]

	const prisma = new PrismaClient()	 
		const links2 = await prisma.collection_category_ref.findMany({
				where: {
				  category_id: Number(category)
				},
				include: {
					collection: true, 
					
				}
		})
		//console.log(links2)
		
		
    //try {

        if (!query["categories"]) {// если пользователь задал не категорию  
                                // переадресовать его на страницу с любой категорией, например 0
            return {              
                redirect: {
                    permanent: false,
                    destination: "/catalog?categories=0&page=0",
                }
            }
        }
        // Получаем все параметры с url
        const page = !+query["page"] ? 0 : query["page"] // если пользователь не задал страницу ставим page=1
        const filters = query["filters"] ? query["filters"] : ""

        const productsFilters = query["filters"] ? query["filters"].split(";").map((filter, index, arr) => {
            const filterParams = filter.split("-") // пример id-value

            if (filterParams.includes("interval")) {
                const intervalMaxValue = arr[index + 1].split('-')[3] // следуйщий элемент массива будет фильтр с таким же id только с макс значением
                arr.splice(index + 1, 1) // удаляем следуйщий фильтр который обозначает фильтр с этим же id только с макс значением, чтобы не повторять операцию

                const minValue = filterParams[3] ? filterParams[3] : 0
                const maxValue = intervalMaxValue ? intervalMaxValue : 0

                return `${filterParams[0]};between;${minValue};${maxValue}&`
            }

            if (filterParams[1].split(',').length >= 2) { // если в значении фильтра указано 2 или больше параметра, например "тип двигателя:Дизель,Электрический"

                return `${filterParams[0]};in;${filterParams[1]}&`
                //return `filters[]=${filterParams[0]};in;${filterParams[1]}&`
            }

            
            return `${filterParams[0]};=;${filterParams[1]}&`
        }).join('') : ""

        const quickLink = query["quickLink"] ? decodeURIComponent(query["quickLink"]) : false

        // получаем список товаров
        const productsURI = quickLink 
            ? 
            encodeURI(`https://trade-group.su/apicatalog?${quickLink}`) 
            :
            encodeURI(`https://trade-group.su/apicatalog?categories=${category}&${productsFilters}page=${page}`)
            
       // const productsResponse = (await axios.get(productsURI)).data
		var categoryArr=category.split(",")
		categoryArr = categoryArr.map(function (x) { 
			return parseInt(x, 10); 
		});
				console.log(categoryArr )

		let products = await prisma.shop_product_categories.findMany({
				where:{ category_id: {
					  in: categoryArr
					},			  
				},
				include: {
					product: {
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
					}
				} 
					
			
		})
		
		let filteredProducts=[]        
		let filtersList=[]
		let allProps=[]
	    let productsFiltersArr=productsFilters.split("&")
		console.log("pf",productsFiltersArr)
		

		for (var k in products){
			var newProps=[]
			var props=products[k].product.shop_product_properties
			var add=true
			for (var j in props){
				var pid=props[j].property_id
				if (!props[j].property) {
					await prisma.shop_product_properties.deleteMany({
						where:{ property_id: pid }
					  
					})		  
			
				}
				else {
				if (props[j].property.is_filtered==1) {
					//-all props
					newProps.push(props[j])
					if (typeof allProps[pid] === 'undefined') {
						allProps[pid]={}
						allProps[pid].values=[]
						allProps[pid].name=props[j].property.name
						allProps[pid].property_id=props[j].property.id
						allProps[pid].filter_type=props[j].property.filter_type
					
					}
					if (props[j].property.filter_type=="interval" && allProps[pid]["values"].indexOf(parseFloat(props[j].value))==-1) allProps[pid]["values"].push(parseFloat(props[j].value))
					if (props[j].property.filter_type!="interval" && allProps[pid]["values"].indexOf(props[j].value)==-1) allProps[pid]["values"].push(props[j].value)
						
					//-filters check
				    for (var l in productsFiltersArr){
						var farr=	productsFiltersArr[l].split(";")
						if(farr[0]==props[j].property_id){
							if (farr[1]=='between' && (parseFloat(props[j].value)<parseFloat(farr[2]) || parseFloat(props[j].value)>parseFloat(farr[3]))) add=false
							
							if (farr[1]=='in' || farr[1]=='=' ) {
								var inArr=farr[2].split(',')
								if (inArr.indexOf(props[j].value)==-1) add=false
							}
						}
					}//-filters
				}//if is filtered
			    }
			}//for props
			
			if(add){
				filteredProducts[k]=products[k]//.shop_product_properties=newProps//.log(props) if(allProps[pid].indexOf(props[j].value)==-1) 
				filteredProducts[k].product.shop_product_properties=newProps//.log(props)
			}

		}//for products
		filteredProducts=filteredProducts.filter(n => n)

		products=JSON.parse(JSON.stringify(filteredProducts)) // <== here is a solution
		filtersList=allProps.filter(n => n)
		console.log(products)// products = productsResponse["products"]
		//console.log("pr",productsResponse["allprops"])// products = productsResponse["products"]
	

        const pageCount=0
//		= productsResponse["pages"]
		// = productsResponse["allprops"]
       // let links = productsResponse["links"]
		let links=links2
		

       /*  if (pageCount <= page || page < 0) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/catalog?categories=${category}&filters=${filters}&quickLink=${query["quickLink"] ? query["quickLink"] : ""}&page=0`,
                }
            }
        }
 */
        return {
            props: {
                goods: !products ? [] : products,
                pageCount: pageCount ? pageCount : 0,
                filtersList: filtersList? filtersList: [],
                links: links? links: [],
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