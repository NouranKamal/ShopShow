import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './Navebar.module.css';
import { userContext } from '../../context/TokenContext';
import { cartContext } from '../../context/cartContext';


export default function Navbar() {

  let {userToken,setToken}= useContext(userContext);
  let navigate = useNavigate();

  let{cartNumber , getCart , setCartNumber} = useContext(cartContext);

  function logOut(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/signin')
  }

  useEffect(()=>{
    (async()=>{
    let {data}= await getCart();
    setCartNumber(data.numOfCartItems);
    })()
  },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg  shadow position-fixed z-3 w-100 bg-dark text-light">
  <div className="container">
    <a className={`navbar-brand`} href="#">
      <span className={`fw-bold ${style.logoColor}`}>
        <i class={`fa-brands fa-shopify  ${style.sIcon}`}></i>
        hopSh
        <i className={`fa-solid fa-eye ${style.showIcon}`} ></i>
        w
        </span>
        </a>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars-staggered text-white fs-1"></i>
          </button>


    <div className="collapse navbar-collapse  " id="navbarSupportedContent" >
      {userToken !== null ?
      <ul className={`navbar-nav ms-auto mb-2 mb-lg-0    ${style.navv1} `}>
      <li className={`nav-item  ${style.linkSize}       ${style.navv2}`}>
        <Link className={`nav-link text-light   ${style.navv3}`} to="home">Home</Link>
      </li>
      
      <li className={`nav-item ${style.linkSize}      ${style.navv2}`}>
        <Link className={`nav-link text-light ${style.navv3}`} to="product">Products</Link>
      </li>

      <li className={`nav-item ${style.linkSize}    ${style.navv2}`}>
        <Link className={`nav-link text-light ${style.navv3}`} to="category">Categories</Link>
      </li>

      <li className={`nav-item ${style.linkSize}     ${style.navv2}`}>
        <Link className={`nav-link text-light ${style.navv3}`} to="brands">Brands</Link>
      </li>
      
      <li className={`nav-item ${style.linkSize}     ${style.navv2}`}>
        <Link className={`nav-link text-light ${style.navv3}`} to="wishlist">WishList</Link>
      </li>
      
      
    </ul>
      :''}
    
    {userToken !== null ?
     <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${style.navv1}`}>
     <li className={`nav-item d-flex align-items-center ${style.linkSize} ${style.navv2}`}>
     <i class="fa-brands fa-facebook mx-2 mainColor2 fs-5"></i>
     <i class="fa-brands fa-twitter mx-2 mainColor2 fs-5"></i>
     <i class="fa-brands fa-instagram mx-2 mainColor2 fs-5"></i>
     <i class="fa-brands fa-linkedin mx-2 mainColor2 fs-5"></i>
       </li>
       <li className={`nav-item ${style.linkSize}`}>
        <Link className={`nav-link ${style.navv3}`} to="cart"> 
        <i className={`fa-solid fa-cart-shopping fs-3 ${style.cartColor}`}></i>
        <span className='badge bg-light text-dark'>{cartNumber}</span>
         </Link>
      </li>
       <li onClick={()=>{logOut()}} className={`nav-item ${style.linkSize} ${style.navv2}`}>
         <Link className={`nav-link text-light ${style.navv3}`}>Logout</Link>
       </li>
     </ul>
    :
    ''}
    {userToken == null ?
    <ul ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${style.navv1} `}>
    <li className={`nav-item ${style.linkSize} ${style.navv2}`}>
         <Link className={`nav-link text-light ${style.navv3}`} to="signup">Register</Link>
       </li>
       <li className={`nav-item ${style.linkSize} ${style.navv2}`}>
         <Link className="nav-link text-light" to="signin">Login</Link>
       </li>
    </ul>
    :
    ''
    }
     
    </div>
  </div>
</nav>
    </>
  )
}
