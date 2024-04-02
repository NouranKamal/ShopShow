import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/cartContext';
import style from '../Cart/Cart.module.css';
import { Link } from 'react-router-dom';

export default function Cart() {
 let{getCart , cartNumber , setCartNumber , deleteCart , updateCart}= useContext(cartContext);

 const[cartList,setCartList]=useState([]);
 const[cartPrice, setCartPrice]=useState([])

useEffect(()=>{
  (async()=>{
      let {data}= await getCart();
      setCartList(data.data.products);
      setCartPrice(data.data.totalCartPrice);
      setCartNumber(data.numOfCartItems);
  })()
},[])

async function removeProduct(id){
  let{data}= await deleteCart(id);
  setCartList(data.data.products);
  setCartPrice(data.data.totalCartPrice);
  setCartNumber(data.numOfCartItems);
}

async function updateProduct(id,count){
  let{data}= await updateCart(id,count);
  if(count==0){
    removeProduct(id)
  }
  setCartList(data.data.products);
  setCartPrice(data.data.totalCartPrice);
  setCartNumber(data.numOfCartItems);
}

  return (
    <div className='container  w-75 m-auto pt-5'>
      <div className="row">
       {cartList.length>0?
      <>
        <div className="col-md-12">
        <h1 className={`pb-5 pt-2 text-center ${style.cH}`}>Shopping Cart</h1>
        <div className='d-flex justify-content-between'>
        <h4 className='text-muted'> <span>Total Price </span> {cartPrice} EGP </h4>
        <h4 className='text-muted'> <span>Total Number Of Item </span> {cartNumber} </h4>
        </div>
        {cartList.map((product)=>{
          return <div className="row border-bottom py-3" key={product._id}>
            <div className="col-md-2">
              <img src={product.product.imageCover} className='w-100 rounded-3' alt="" />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center">
              <div>
              <h5>{product.product.title}</h5>
              <p>{product.price} EGP</p>
              <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'> <i class="fa-solid fa-trash"></i> Remove</button>
              </div>
              <div className='d-flex align-items-center'>
                <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className='btn btn-dark text-light'>+</button>
                <h4 className='mx-2'>{product.count}</h4>
                <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className='btn btn-dark text-light'>-</button>
              </div>
            </div>
          </div>

        })}
        <Link to='/checkout'>
        <button className='btn btn-dark text-light w-100 my-5'>Check Out</button>
        </Link>
      </div>
      </>
       :
       <>
    
        <h1>cart is empty</h1>
       </>
      }
      </div>

    </div>
  )
}
