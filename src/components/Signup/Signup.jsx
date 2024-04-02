import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './Signup.module.css';

export default function Signup() {

const [errMsg,setErr]=useState(null);
const [isLoading,setLoading]=useState(false);

let navigate = useNavigate();

  async function signUp(values){
    setLoading(true);
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
    setErr(err.response.data.message)
    setLoading(false)
    })
    if(data.message== 'success'){
      setLoading(false);
      navigate('/signin');
    }
   console.log(data)
  }

  let validationSchema= Yup.object({
    name:Yup.string().min(3, "min lenght is 3").max(10,'max lenght is 10').required("this name is required"),
    email:Yup.string().required('email is required').email('enter valid email'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'enter avalid phone'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter avalid password'),
    rePassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'not matched')
  })

  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    onSubmit:signUp,
    validationSchema:validationSchema,

  })

  return (
    <div className={`${style.imgCover}`}>
    
    <form onSubmit={formik.handleSubmit}>
     <div className="container">
     <div class="row pt-5">
        <div className="col-md-6">
        <h1 className='mt-4 text-center text-light'>Register Form</h1>
          <div className="row gy-3 ">
          <div className="col-md-12">
          <label htmlFor="userName" className='text-dark mb-1 fw-bold'>Name</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id='userName'name='name' className='form-control bg-transparent border-3' />
          {formik.errors.name && formik.touched.name ?
          <p className='text-danger'>{formik.errors.name}</p> : ''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userEmail" className='text-dark mb-1 fw-bold'>Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='userEmail'name='email' className='form-control bg-transparent border-3' />
          {formik.errors.email && formik.touched.email ?
          <p className='text-danger'>{formik.errors.email}</p> : ''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userPhone" className='text-dark mb-1 fw-bold'>Phone</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='userPhone'name='phone' className='form-control bg-transparent border-3' />
          {formik.errors.phone && formik.touched.phone ?
          <p className='text-danger'>{formik.errors.phone}</p> : ''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userPass" className='text-dark mb-1 fw-bold'>Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='userPass'name='password' className='form-control bg-transparent border-3' />
          {formik.errors.password && formik.touched.password ?
          <p className='text-danger'>{formik.errors.password}</p> : ''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="repass" className='text-dark mb-1 fw-bold'>rePassword</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" id='repass'name='rePassword' className='form-control bg-transparent border-3' />
          {formik.errors.rePassword && formik.touched.rePassword ?
          <p className='text-danger'>{formik.errors.rePassword}</p> : ''
          }
        </div>
        {errMsg !== null?
         <p className='text-danger text-center'>{errMsg}</p>
         :
         ""
        }
        <div className="col-md-12 text-center my-4">
          <button disabled={!(formik.dirty&&formik.isValid)} className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Register
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
  )
}
