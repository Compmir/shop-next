import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	let data=JSON.parse(req.body.data)
	let dataId=Number(data.data.id)
	delete data.data.id
	
	if (req.headers.token=="f7059062-47ca-4e8f-b0d5-34fdd605eddd")  {


	if(data.action=="upsert"){
		console.log("data: ",data)
		let pr=await prisma.collection.upsert({
			where: {
				id: Number(dataId)
			},
			create: data.data,
			update: data.data,
		})
	    console.log("create",pr)
		pr=await prisma.collection_category_ref.deleteMany({
			where: {
				collection_id: pr.id
			}
		})	
			    console.log("delete collection_category_ref ",pr)
			    console.log(" collection_category_ref ",data.collection_category_ref)

		pr=await prisma.collection_category_ref.createMany({
				data: data.collection_category_ref,
												skipDuplicates: true, // Skip 'Bobo'

		})
			    console.log("create category ref   ",pr)

		pr=await prisma.collection_product_ref.deleteMany({
			where: {
				collection_id: dataId
			}
		})	
			    console.log("delete collection_product_ref",pr)
			    console.log(" collection_product_ref",data.collection_product_ref)

		pr=await prisma.collection_product_ref.createMany({
				data: data.collection_product_ref,
												skipDuplicates: true, // Skip 'Bobo'

				
		})
			    console.log("create collection_product_ref",pr)

		

	}
	
	if(data.action=="delete"){
		console.log(data.data)
		let pr=await prisma.collection.delete({
			where: {
				id: dataId
			}
		})
	    console.log(pr)
		pr=await prisma.collection_category_ref.deleteMany({
			where: {
				collection_id: dataId
			}
		})	
	    console.log(pr)
		pr=await prisma.collection_product_ref.deleteMany({
			where: {
				collection_id: dataId
			}
		})	
		    console.log(pr)
	

	}
	
	
	}
  res.status(200).json({ data: data})
}
