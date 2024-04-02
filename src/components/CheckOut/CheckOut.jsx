import React, { useContext, useState } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from '../CheckOut/CheckOut.module.css'
import { cartContext } from '../../context/cartContext';
import { useEffect } from 'react';

export default function CheckOut() {
 let{checkOutPayment, getCart}= useContext(cartContext);
const [cartId,setCartId] = useState('');

    useEffect(()=>{
        (async()=>{
        let {data}= await getCart();
        console.log(data);
        setCartId(data.data._id)
        })()
      },[])

    async function checkOut(values){
        let {data}= await checkOutPayment(cartId,values);
        console.log(data);
        if(data.status=='success'){
            window.location=data.session.url;
            console.log('hi',data.session.url);
        }
      }
    
      let formik =useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
       
        },
        onSubmit:checkOut,    
      })
    
      return (
        <div className={`pt-5 ${style.imgCover}`}>
        
        <form onSubmit={formik.handleSubmit}>
         <div className="container">
         <div class="row pt-5">
            <div className="col-md-6">
            <h1 className='mt-4 text-center text-light'>Payment Form</h1>
              <div className="row gy-3 ">
              <div className="col-md-12">
              <label htmlFor="details" className='text-dark mb-1 fw-bold'>Details</label>
              <input onChange={formik.handleChange}  value={formik.values.details} type="text" id='details'name='details' className='form-control bg-transparent border-3' />
            </div>
            <div className="col-md-12">
              <label htmlFor="phone" className='text-dark mb-1 fw-bold'>phone</label>
              <input onChange={formik.handleChange}  value={formik.values.phone} type="tel" id='phone'name='phone' className='form-control bg-transparent border-3' />
            </div>
            <div className="col-md-12">
              <label htmlFor="city" className='text-dark mb-1 fw-bold'>City</label>
              <input onChange={formik.handleChange}  value={formik.values.city} type="text" id='city'name='city' className='form-control bg-transparent border-3' />
             
            </div>

            
            <div className="col-md-12 text-center my-4">
              <button disabled={!(formik.dirty&&formik.isValid)} className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Pay Now
           
              </button>
            </div>
              </div>
            </div>
          </div>
         </div>
        </form>
        </div>
      )
}
