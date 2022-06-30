import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	const data=JSON.parse(req.body.data)

	if(data.action=="upsert"){
		console.log(data.data)
		let pr=await prisma.shop_category.upsert({
			where: {
				slug: data.data.slug
			}
			data: data.data
		})
	    console.log(pr)
	/* 	for (var f in data.collection){
			pr=await prisma.collection_category_ref.upsert({
				where: {
					collection_id: data.collection[f].id
				},
				data:{
					category_id: pr.id
				}
				
			})
				    console.log(pr)

		} */

	}
	
	if(data.action=="delete"){
		console.log(data.data)
		let pr=await prisma.shop_category.delete({
			where: {
				slug: data.data.slug
			}
		})
	    console.log(pr)
		pr=await prisma.collection_category_ref.delete({
			where: {
				category_id: pr.id
			}
		})	
		

	}
	
  res.status(200).json({ data: req.body , pr: pr.id})
}
