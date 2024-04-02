import React from 'react';
import style from '../ForgotPassword/ForgotPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [errMsg,setErr]=useState(null);
    const [isLoading,setLoading]=useState(false);

    let navigate=useNavigate();

    async function forgotPass(values){
        setLoading(true);
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    //   setErr(data.message)
      setLoading(false)
        if(data.statusMsg=="success"){
            setLoading(false);
            document.querySelector('.forgotPassword').classList.add('d-none');
            document.querySelector('.verfiyCode').classList.remove('d-none');
        }
    }
    let validationSchema= Yup.object({
        email:Yup.string().required('email is required').email('enter valid email'),
      })
    let formik = useFormik({
        initialValues:{
            email:' '
        },
        validationSchema:validationSchema,
        onSubmit:forgotPass
    })

    async function sendCode(values){
        setLoading(true);
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    //   setErr(data.message)
    console.log(data);
      setLoading(false);
        if(data.status=="Success"){
            console.log('data');
            setLoading(false);
            navigate('/resetpassword')
        }
      
    }
    let validationSchema2= Yup.object({
        resetCode:Yup.string().required('resetCode is required'),
      })
    let formikCode = useFormik({
        initialValues:{
            resetCode:' '
        },
        validationSchema:validationSchema2,
        onSubmit:sendCode
    })



  return (
    <div className={`${style.imgCover}`}>
   <div className={`forgotPassword pt-5`}>
    <form onSubmit={formik.handleSubmit}>
     <div className="container">
     <div class="row pt-5">
        <div className="col-md-6">
        <h1 className='mt-4 text-center text-light'>Forgot Password</h1>
          <div className="row gy-3 ">
        <div className="col-md-12">
          <label htmlFor="userEmail" className='text-dark mb-1 fw-bold'>Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='userEmail'name='email' className='form-control bg-transparent border-3' />
          {formik.errors.email && formik.touched.email ?
          <p className='text-danger'>{formik.errors.email}</p> : ''
          }
        </div>
        
        {errMsg !== null?
         <p className='text-danger text-center'>{errMsg}</p>
         :
         ""
        }
        <div className="col-md-12 text-center my-4">
          <button disabled={!(formik.dirty&&formik.isValid)} className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Send Code
          {isLoading ? 
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          :''
          }
          </button>
        </div>
          </div>
        </div>
        
        
      </div>
     </div>
    </form>
    </div>

    <div className={`verfiyCode pt-5 d-none `}>
    <form onSubmit={formikCode.handleSubmit}>
     <div className="container">
     <div class="row pt-5">
        <div className="col-md-6">
        <h1 className='mt-4 text-center text-light'>Verfiy Code</h1>
          <div className="row gy-3 ">
        <div className="col-md-12">
          <label htmlFor="userCode" className='text-dark mb-1 fw-bold'>Reset Code</label>
          <input onChange={formikCode.handleChange} onBlur={formikCode.handleBlur} value={formikCode.values.resetCode} type="text" id='userCode'name='resetCode' className='form-control bg-transparent border-3' />
          {formikCode.errors.resetCode && formikCode.touched.resetCode ?
          <p className='text-danger'>{formikCode.errors.resetCode}</p> : ''
          }
        </div>
        
        {errMsg !== null?
         <p className='text-danger text-center'>{errMsg}</p>
         :
         ""
        }
        <div className="col-md-12 text-center my-4">
          <button disabled={!(formikCode.dirty&&formik.isValid)} className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Verfiy
          {isLoading ? 
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          :''
          }
          </button>
        </div>
          </div>
        </div>
      </div>
     </div>
    </form>
    </div>
    </div>
    
  )
}
