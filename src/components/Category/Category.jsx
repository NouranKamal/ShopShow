import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style  from '../Category/Category.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function Category() {
  const[categoryList,setCategory]=useState([]);

  async function gatCategory(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategory(data.data);
  }
  
  useEffect(()=>{
    gatCategory();
  },[])

 

  return (
   <div className='container pt-5 my-3'>
    <div className="row gy-5">
      {categoryList.length>0?
     <>
      {
        categoryList.map((category)=>{
          return <div className=" col-xl-3 col-lg-4 col-md-6 ">
          <div className={`${style.content}`}>
          <img src={category.image} className='w-100  ' height={300}/>
          <h4 className={`text-center pt-2 ${style.cName}`}>{category.name}</h4>
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

