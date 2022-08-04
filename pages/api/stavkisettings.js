// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default async function handler(req, res) {
	let dataId=1

	if (req.method === 'POST') {	
	    console.log('posting')
	        let stavka=await prisma.stavkisettings.findFirst({
		    where: {AND:
			 [
			 {login: req.query.login},
			 {password: req.query.password},		 
			 ]			
			}
			})
			if (stavka) dataId=stavka.id
			const data={
			  login:     req.query.login,
			  password:     req.query.password,
			  loginBo:     req.body.loginBo,
			  passwordBo     :     req.body.passwordBo,
			  loginPn    :     req.body.loginPn,
			  passwordPn     :     req.body.passwordPn,
			  login365   :     req.body.login365,
			  password365  :     req.body.password365,
			  search  :     req.body.search,
			  radio  :     req.body.radio,
			  checks  :     req.query.checks,
			  urlBo  :     req.body.urlBo,
			  urlPn  :     req.body.urlPn,
			  url365  :     req.body.url365,
			  course :     Number(req.body.course),
			  initStavka :     Number(req.body.initStavka),
			  beginPercentage :     Number(req.body.beginPercentage),
			  maxPercentage :    Number( req.body.maxPercentage),
			  pauseCheck :     Number(req.body.pauseCheck),
			  pauseStakeBo :     Number(req.body.pauseStakeBo),
			  waitBo :     Number(req.query.waitBo),
			  maxStakeBo :     parseFloat(req.body.maxStakeBo),
			}			
			stavka=await prisma.stavkisettings.upsert({
				where: 
				 {id: dataId},
				create: data,
				update: data
			})
			console.log(req.body)
			
			 const stavki = await prisma.stavkisettings.findFirst({
		    where: {AND:
			 [
			 {login: req.query.login},
			 {password: req.query.password},
			 
			 ]
			
			
			}
	       })
		       res.status(200).json(stavki)

	}
	else {
	
	
      
		
			// console.log(req.query)
		
  
     const stavki = await prisma.stavkisettings.findFirst({
		    where: {AND:
			 [
			 {login: req.query.login},
			 {password: req.query.password},
			 
			 ]
			
			
			}
	    })
		console.log(stavki)
		    res.status(200).json(stavki)

	}
	
}
