import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	const data=JSON.parse(req.body.data)
	let dataId=Number(data.data.id)
	delete data.data.id
	
	
	if (req.headers.token=="f7059062-47ca-4e8f-b0d5-34fdd605eddd")  {
	if(data.action=="upsert"){
		console.log(data.data)
		let pr=await prisma.shop_category.upsert({
			where: {
				id: dataId
			},
			update: data.data,
			create: data.data
		})
	    console.log(pr)
	

	}
	
	if(data.action=="delete"){
		let pr=await prisma.shop_category.delete({
			where: {
				id: dataId
			}
		})
	    console.log(pr)
		pr=await prisma.collection_category_ref.delete({
			where: {
				category_id: dataId
			}
		})	
				console.log(pr)

		

	}
	
	
	}
  res.status(200).json({ data: req.body.data })
}
