// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default async function handler(req, res) {
	const stavki = await prisma.stavki.findMany()
	const name_home=req.query.name_home
	const name_away=req.query.name_away
	const odd_name=req.query.odd_name
    const odd_value=req.query.odd_value
    const pinnacle_odd1=req.query.pinnacle_odd1
    const pinnacle_odd2=req.query.pinnacle_odd2
    const betonline_odd1=req.query.betonline_odd1
    const betonline_odd2=req.query.betonline_odd2
	console.log(req.query)
	/*   */
    if (typeof name_home !== 'undefined' && typeof name_away !== 'undefined' && typeof odd_name !== 'undefined' && typeof odd_value !== 'undefined' && typeof pinnacle_odd1 !== 'undefined' && typeof pinnacle_odd2 !== 'undefined' && typeof betonline_odd1 !== 'undefined' && typeof betonline_odd2 !== 'undefined' ) {
		const stavka=await prisma.stavki.create({
			data: {
				 name_home: name_home,
				 name_away: name_away,
				 odd_name: odd_name,
				 odd_value: odd_value,
				 pinnacle_odd1: pinnacle_odd1,
				 pinnacle_odd2: pinnacle_odd2,
				 betonline_odd1: betonline_odd1,
				 betonline_odd2: betonline_odd2,
			}
		})
	}

  
  
	
    res.status(200).json(stavki)
}
