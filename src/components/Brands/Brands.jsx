import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style  from '../Brands/Brand.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function Category() {
  const[brandList,setBrand]=useState([]);

  async function gatBrands(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrand(data.data);
    console.log(data.data);
  }
  
  useEffect(()=>{
    gatBrands();
  },[])

 

  return (
   <div className='container pt-5 my-3'>
    <div className="row gy-5">
      {brandList.length>0?
     <>
       <h1 className={`text-center ${style.cH}`}>All Brands</h1>
      {
        brandList.map((brand)=>{
          return <div className="col-xl-3 col-lg-4 col-md-6 ">
          <div className={`${style.content} `}>
          <img src={brand.image} className='w-100 p-5' height={300}/>
          <h4 className={`text-center pt-2 ${style.cName}`}>{brand.name}</h4>
          </div>
          </div>
        })
      }
     </>
      :
      <>
      <div className='vh-100 d-flex justify-content-center align-items-center'>
          <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#952446"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
        </div>
      </>}

    </div>
   </div>

);
  
}