import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import style from '../ResetPassword/ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
 
    let navigate = useNavigate();
    async function resetPass(values){
       let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values);
       console.log(data);
       if(data.token){
        navigate('/signin')
       }

    }
    let validationSchema= Yup.object({
        email:Yup.string().required('email is required').email('enter valid email'),
        newPassword:Yup.string().required('password is required'),
      })
    
      let formik =useFormik({
        initialValues:{
          email:'',
          newPassword:'',
        },
        onSubmit:resetPass,
        validationSchema:validationSchema,
      })
  return (
    <div className={`pt-5 ${style.imgCover}`}>
    <form onSubmit={formik.handleSubmit}>
     <div className="container">
     <div class="row pt-5">
        <div className="col-md-6">
        <h1 className='mt-4 text-center text-light'>Reset Password</h1>
          <div className="row gy-3 ">
        <div className="col-md-12">
          <label htmlFor="userEmail" className='text-dark mb-1 fw-bold'>Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='userEmail'name='email' className='form-control bg-transparent border-3' />
          
        </div>
        <div className="col-md-12">
          <label htmlFor="newPassword" className='text-dark mb-1 fw-bold'>New Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='newPassword'name='newPassword' className='form-control bg-transparent border-3' />
        </div>
        {/* {errMsg !== null?
         <p className='text-danger text-center'>{errMsg}</p>
         :
         ""
        } */}
        <div className="col-md-12 text-center my-4">
          <button  className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Reset Password
          {/* {isLoading ? 
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          :''
          } */}
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
