import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	const data=JSON.parse(req.body.data)
	let dataId=Number(data.data.id)
	delete data.data.id
	
	if(data.action=="upsert"){
		console.log(data.data)
		let pr=await prisma.shop_property.upsert({
			where: {
				id: dataId
			},
			data: data.data
		})
	    console.log(pr)


	}
	
	if(data.action=="delete"){
		console.log(data.data)
		let pr=await prisma.shop_property.delete({
			where: {
				id: dataId
			}
		})
	    console.log(pr)
	
		

	}
	
  res.status(200).json({ data: req.body , pr: pr.id})
}
