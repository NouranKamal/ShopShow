import axios from 'axios';
import React, { useEffect, useState , useContext} from 'react'
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import {toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import style from '../Details/Details.module.css';


export default function Details() {
  const[productDetails,setDetails]=useState(null)

  let{addToCart , setCartNumber} = useContext(cartContext);

  let params= useParams();
  let productId=params.id;

  async function getDetails(){
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  setDetails(data.data);
  }

  useEffect(()=>{
    getDetails()
  },[])

  async function addToMyCart(id){
    let {data}= await addToCart(id);
    if(data.status == "success"){
     toast.dark(data.message);
     setCartNumber(data.numOfCartItems);
    }
   }

  return (
    <div className='container me-5 pt-5 '>
     {productDetails !== null ?
      <div className="row gx-4">
      <div className="col-md-4 mt-5 ">
        <img src={productDetails?.imageCover}  className='w-100 rounded-3 shadow' alt="" />
      </div>
      <div className="col-md-6 vh-100 d-flex flex-column justify-content-center">
        <div>
          <h2 className={`${style.cH}`}>{productDetails?.title}</h2>
          <p>{productDetails?.description}</p>
        </div>
        <div>
          <p>{productDetails?.category.name}</p>
          <p> <span className='fw-bold'>price: </span>{productDetails?.price} EGP</p>
          <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn btn-dark w-100'>Add To Cart</button>
        </div>
      </div>
    </div>
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
  )
}
