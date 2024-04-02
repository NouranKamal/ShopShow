import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import style from '../Product/Product.module.css';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import {toast } from 'react-toastify';
export default function Product() {

  let{addToCart , setCartNumber} = useContext(cartContext);

  const[productList,setProduct]=useState([]);

  async function getAllProducts(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    setProduct(data.data);
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  async function addToMyCart(id){
   let {data}= await addToCart(id);
   if(data.status == "success"){
    toast.dark(data.message);
    setCartNumber(data.numOfCartItems)
   }
  }

  return (
    <div className='container  pt-5 my-4'>
      <div className="row gy-5">
        {productList.length>0?
        <>
        {
          productList.map((product)=>{

            let text = product.title;
            let result = text.slice(0,18);
            return <div className={`col-xl-2 col-lg-4 col-md-12`}  key={product._id}>
             <div className={`${style.col}`}>
             <Link to={`/details/${product._id}`} className={`text-decoration-none ${style.link}`}>
              <div className={`p-3 h-100 ${style.content} rounded-4`}>
                <img src={product.imageCover} className='w-100 rounded-4' alt="" />
                <p className={`text-center  ${style.mainC2}`}> {product.category.name}</p>
                <h6 className={`text-center text-muted`}>{result}...</h6>
                <div className='text-center'>
                  <p className={`${style.mainC1} fw-bold`}>{product.price} EGP</p>
                </div>
                <div className='pb-4 d-flex justify-content-between align-items-center  '>
                <p className={` text-dark`}>{product.ratingsAverage} <i className={`${style.starColor} fa-solid fa-star p-0 m-0`}></i></p>
                <button className={`border-0 bg-transparent p-1 text-dark`}><i class="fa-regular fa-heart fs-5"></i></button>
                </div>
                
                </div>

              </Link>
              <div className={` w-100 mt-3 d-flex justify-content-center align-items-center`}>
                <button onClick={()=>{addToMyCart(product._id)}} className={`ms-5 rounded-2 py-2 text-light fw-bold ${style.backBtn}`}>Add To Cart</button>
                </div>
             </div>
              </div>
            
          })
        }
        </>
        :
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
        }
        
      </div>

    </div>
  )
}
