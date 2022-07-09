import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
	let data=JSON.parse(req.body.data)
	let date=new Date(data.data.date)
	let dataId=Number(data.data.id)
	data.data.date=date
	delete data.data.id
	
	if (req.headers.token=="f7059062-47ca-4e8f-b0d5-34fdd605eddd")  {
	if(data.action=="upsert"){
		let pr=await prisma.news.upsert({
			where: {
				id: dataId
			},
			update: data.data,
			create: data.data
		})
	    console.log("upsert news",pr)

	}
	if(data.action=="delete"){
		let pr=await prisma.news.deleteMany({
			where: {
				id: dataId
			}
		})
			    console.log("delete news",pr)

	}
	
	}
	
  res.status(200).json({ data: data.data })
}
