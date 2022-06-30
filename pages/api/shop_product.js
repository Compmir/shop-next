import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	let data=JSON.parse(req.body.data)
	let dataId=Number(data.data.id)
	delete data.data.id
	
	if (req.headers.token=="f7059062-47ca-4e8f-b0d5-34fdd605eddd")  {
	if(data.action=="upsert"){
		// console.log(data.data)
		let pr=await prisma.shop_product.upsert({
			where: {
				id: dataId
			},
			update: data.data,
			create: data.data
		})
	    console.log("upsert product",pr)
			 pr=await prisma.shop_product_categories.deleteMany({
				where: {
					product_id: dataId
				},
			})
		    console.log("delete categories",pr)
			pr=await prisma.shop_product_categories.createMany({
				data: data.shop_product_categories
				
			})
			    console.log("create categories   ",pr) 
				
			pr=await prisma.shop_product_properties.deleteMany({
				where: {
					product_id: dataId
				},
			})
		    console.log("delete shop_product_properties",pr)
			pr=await prisma.shop_product_properties.createMany({
				data: data.shop_product_properties
				
			})
			    console.log("create shop_product_properties   ",
				
			pr) pr=await prisma.shop_product_images.deleteMany({
				where: {
					product_id: dataId
				},
			})
		    console.log("delete shop_product_images",pr)
			pr=await prisma.shop_product_images.createMany({
				data: data.shop_product_images
				
			})
			    console.log("create shop_product_images    ",pr)
	
		
		
		

	}
	if(data.action=="delete"){
		console.log(data.data)
		let pr=await prisma.shop_product_categories.deleteMany({
			where: {
				product_id: dataId
			}
		})
		 pr=await prisma.shop_product_properties.deleteMany({
			where: {
				product_id: dataId
			}
		})	
		pr=await prisma.shop_product_images.deleteMany({
			where: {
				product_id: dataId
			}
		})		
		pr=await prisma.collection_product_ref.deleteMany({
			where: {
				product_id: dataId
			}
		})	
		pr=await prisma.shop_product.delete({
			where: {
				id: dataId
			}
		})
	    console.log(pr)

	}
	}
	
  res.status(200).json({ data: data.data})
}
