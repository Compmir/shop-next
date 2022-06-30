import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
			console.log(req.body.action)

	if(req.body.action=="upsert"){
		console.log(req.body.data)
		const model=req.body.model
		const data=JSON.stringify(req.body.data)
		const pr=await prisma.news.create({
			data: data
		})
				console.log(pr)

	}
	
  res.status(200).json({ data: req.body, action: req.body.action, model: req.body.model })
}
