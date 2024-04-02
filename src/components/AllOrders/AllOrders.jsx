import axios from 'axios'
import React, { useEffect ,useState ,useContext} from 'react'
import { cartContext } from '../../context/cartContext';

export default function AllOrders() {
    let{getCart}= useContext(cartContext);
    // const [userId,setUserId] = useState('');

    // useEffect(()=>{
    //     (async()=>{
    //     let {data}= await getCart();
    //     console.log(data);
    //     setUserId(data.data.cartOwner)
    //     })()
    //   },[])



    // async function getAllOrders(userId){
    //     let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    //     console.log(data);
    // }

    // useEffect(()=>{
    //     getAllOrders();
    // })
  return (
    <div>AllOrders</div>
  )
}
