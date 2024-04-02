import React from 'react'
import Product from '../Product/Product';
import style from '../Home/Home.module.css';
import img from '../../assets/img/macadamia-body-lotion-skin-cream.jpg';


export default function Home() {


  return (
    <div className='container'>
      <div className='position-relative'>
      <img src={img} alt=""  className='w-100 pt-5' height={350}/>
      <h1 className={`${style.text} text-light`}>Tick T<i className={`fa-regular fa-clock fs-1 fa-spin ${style.cH}`}></i>ck </h1>
      
      <p className={`${style.text2} ${style.cH}`}>Time To <i class="fa-solid fa-s fa-bounce"></i>hop</p>
      </div>

      <h1 className={`text-center pt-5 ${style.cH}`}>All Products</h1>
    <Product/>
    </div>
    
  )
}
