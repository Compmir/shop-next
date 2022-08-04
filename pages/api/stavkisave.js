// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function handler(req, res) {
	const stavki = await prisma.stavkisave.findMany({
		
		orderBy: {
			id: "desc"
		},
		take: 5
	})
	const name_home=req.query.name_home
	const name_away=req.query.name_away

    const pinnacle_odd1=req.query.pinnacle_odd1
    const pinnacle_odd2=req.query.pinnacle_odd2
    const betonline_odd1=req.query.betonline_odd1
    const betonline_odd2=req.query.betonline_odd2
	//console.log(req.query)
	/*   */
    if (typeof name_home !== 'undefined'  && typeof name_away !== 'undefined' &&  typeof pinnacle_odd1 !== 'undefined' && typeof pinnacle_odd2 !== 'undefined' && typeof betonline_odd1 !== 'undefined' && typeof betonline_odd2 !== 'undefined' ) {
		const stavka=await prisma.stavkisave.create({
			data: {
				 name_home: name_home,
				 name_away: name_away,
				 pinnacle_odd1: pinnacle_odd1,
				 pinnacle_odd2: pinnacle_odd2,
				 betonline_odd1: betonline_odd1,
				 betonline_odd2: betonline_odd2,
				 f1: req.query.f1,
				 f2: req.query.f2,
			}
		})
	}

  
  
	
    res.status(200).json(stavki)
}
