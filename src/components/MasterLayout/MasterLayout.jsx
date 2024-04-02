import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { useContext } from 'react';
import { userContext } from '../../context/TokenContext';
export default function MasterLayout() {

  let {setToken}=useContext(userContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      setToken(localStorage.getItem('userToken'))
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className="pt-5">
      <Outlet/>
      </div>
    </div>
  )
}
