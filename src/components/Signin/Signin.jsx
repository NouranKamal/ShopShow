import React, { useContext, useState } from 'react';
import { useNavigate ,Link } from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './Signin.module.css'; 
import { userContext } from '../../context/TokenContext';
 
export default function Signin() {
  const [errMsg,setErr]=useState(null);
  const [isLoading,setLoading]=useState(false);

  let navigate = useNavigate();
  let {setToken}=useContext(userContext);

  async function signIn(values){
    setLoading(true);
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
    setErr(err.response.data.message)
    setLoading(false)
    })
    if(data.message== 'success'){
      setLoading(false);
      navigate('/home');
      localStorage.setItem('userToken',data.token);
      setToken(data.token);
    }
   console.log(data)
  }

  let validationSchema= Yup.object({
    email:Yup.string().required('email is required').email('enter valid email'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter avalid password'),
  })

  let formik =useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:signIn,
    validationSchema:validationSchema,
  })

  return (
    
    <div className={`${style.imgCover}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className={`contents ${style.content}  py-5 mt-5`}>
    <h1 className='mt-5 text-center text-light '>Login Form</h1>
    <form onSubmit={formik.handleSubmit}>
      <div class="row">
        <div className="col-md-12">
          <div className="row gy-4 p-3">
        <div className="col-md-12">
          <label htmlFor="userEmail" className='text-dark mb-1 fw-bold'>Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='userEmail'name='email' className='form-control bg-transparent border-3' />
          {formik.errors.email && formik.touched.email ?
          <p className='text-danger '>{formik.errors.email}</p> : ''
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="userPass" className='text-dark mb-1 fw-bold'>Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='userPass'name='password' className='form-control bg-transparent border-3' />
          {formik.errors.password && formik.touched.password ?
          <p className='text-danger '>{formik.errors.password}</p> : ''
          }
        </div>
        {errMsg !== null?
         <p className='text-danger text-center'>{errMsg}</p>
         :
         ""
        }
        <div className="col-md-12  mt-4 d-flex justify-content-between">
          <Link to="/forgotpassword" className={`${style.color1}`}><h6>ForgotPassword..?</h6></Link>

          <button disabled={!(formik.dirty&&formik.isValid)} className='rounded-2 text-light btn btn-dark py-1 px-5' type='submit'>Login
          {isLoading ? 
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          :''
          }
          </button>

        </div>
        <Link to="/signup" className={`text-dark`}><h6>Register..?</h6></Link>
          </div>
        </div>
      </div>
    </form>
    </div>
          </div>
          
        </div>
      </div>
      
   
    </div>
  
  )
}
