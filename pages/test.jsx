import dynamic from 'next/dynamic'
import React, { useState } from "react";
//import parse from 'html-react-parser';
import axios from 'axios';

    function  onSubmit () {
   // console.log("val",value)
     // let data={content : value}
      let url='https://tg-forklift.ru:49222/admin/index.php?r=api/apicatalog&categories=4'
       url='https://befaart.com/'
       url="/api/hello"
        axios.get(url)
        .then((response) => {
          console.log("res ",response.data)
        })
        .catch((e) => { console.log("error ",e)}
    )}//submit 


   



    
    export default function Test() {
     
    
      return (
        <div >
        <button onClick={onSubmit} > Send post</button>
        </div>
      )}
      
      
export async function getServerSideProps(context) {
  const  url="/api/hello"
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)

  /* axios.get(url)
  .then((response) => {
    console.log("res ",response.data)
  })
  .catch((e) => { console.log("error ",e)}) */

  return {
    props: { data    }
  }

}