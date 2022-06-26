import { PrismaClient } from '@prisma/client'
//такой файл нужно создать пока что только для категорий чтобы их выгрузить и подготовить картинки которые соответствуют категориям
export default async (req, res) => {
	const prisma = new PrismaClient()
	
	//образец создания или изменения категорий : сначала удаляем измененные в 1с элементы по slug (должен быть уникальным для всех товаров и категорий)
    const deleteManyCategories  = await prisma.shop_category.deleteMany({
	   where: 
          { slug: { in: [
		   'palletnye-stellazi', 
		   'benzinovye-pogruzchiki',	   
		   ] }
		  }
	})
	//а потом создаем заново категории
	const createManyCategories  = await prisma.shop_category.createMany({
	   data: [
          { parent_id: 0, image: '/upload/images/category/palletnye-stellazi.jpg', order: 77, name: 'Паллетные стеллажи', slug: 'palletnye-stellazi',},
          { parent_id: 0, image: '/upload/images/category/benzinovye-pogruzchiki.jpg', order: 77, name: 'Бензиновые погрузчики1', slug: 'benzinovye-pogruzchiki',},
		  
		]
	})
	
	//образец создания или изменения товаров : сначала удаляем измененные в 1с элементы по slug или id (должен быть уникальным для всех товаров и категорий)
    const deleteManyProducts	= await prisma.shop_product.deleteMany({
	   where: 
          { slug: { in: [
		   'ep-cpcd-2025-t3', 
		   'ep-CPCD15T8',	   
		   ] }
		  }
	})
	//а потом создаем заново 
	const createManyCategories  = await prisma.shop_product.createMany({
	   data: [
          { brand_id: 4,  arlicle: 'EP CPCD25T3', name: 'EP CPCD25T3', slug: 'ep-cpcd-2025-t3',description: '<p>Новый дизельный погрузчик EP Equipment&nbsp;грузоподъемностью 2.5 тонны - это маневренные, превосходящие по скоростным и габаритным характеристикам аналогичные модели погрузчиков, укомплектованы современными дизельными и бензиновыми двигателями японского производства.</p>', order: 6, is_stock: 1},
          // также все поля дальше других товаров для создания{}
		  
		]
	})


	  
	res.status(200).json({ data: "ok" })
	 
  
  
  };