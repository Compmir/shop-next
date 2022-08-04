// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default async function handler(req, res) {
	const stavki = await prisma.stavki.findMany({
		
		where: {
			game_type: "esport"
		},
		orderBy: {
			id: "desc"
		},
		take: 25
	})
	const name_home=req.query.name_home
	const name_away=req.query.name_away
	const game_type=req.query.game_type
	const odd_name=req.query.odd_name
    const odd_value=req.query.odd_value
    const pinnacle_odd1=req.query.pinnacle_odd1
    const pinnacle_odd2=req.query.pinnacle_odd2
    const betonline_odd1=req.query.betonline_odd1
    const betonline_odd2=req.query.betonline_odd2
	console.log(req.query)
	/*   */
    if (typeof name_home !== 'undefined' && typeof game_type !== 'undefined' && typeof name_away !== 'undefined' && typeof odd_name !== 'undefined' && typeof odd_value !== 'undefined' && typeof pinnacle_odd1 !== 'undefined' && typeof pinnacle_odd2 !== 'undefined' && typeof betonline_odd1 !== 'undefined' && typeof betonline_odd2 !== 'undefined' ) {
		const stavka=await prisma.stavki.create({
			data: {
				 name_home: name_home,
				 name_away: name_away,
				 game_type: game_type,
				 odd_name: odd_name,
				 odd_value: odd_value,
				 pinnacle_odd1: pinnacle_odd1,
				 pinnacle_odd2: pinnacle_odd2,
				 pinnacle_name_home: req.query.pinnacle_name_home,
				 pinnacle_name_away: req.query.pinnacle_name_away,
				 betonline_name_home: req.query.betonline_name_home,
				 betonline_name_away: req.query.betonline_name_away,
				 betonline_odd1: betonline_odd1,
				 betonline_odd2: betonline_odd2,
			}
		})
	}

  
  
	
    res.status(200).json(stavki)
}
