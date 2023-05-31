import React, { useEffect,useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
// import { use } from '../../backend/Routes/OrderData'


export default function MyOrder() {
    const [orderData, setOrderData] = useState("")
    const fetchMyOrder=async()=>{
        console.log(localStorage.getItem("UserEmail"))
        // await fetch("http://localhost:5000/myOrderData",{
        await fetch("https://foodexp.onrender.com/myOrderData",{

            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("UserEmail")
               
            })   
        }).then(async(res)=>{
            let response=await res.json()
            await setOrderData(response)
        })
    
    }
    useEffect(() => { fetchMyOrder() }, []);

    return (
        <div>
            <NavBar></NavBar>
            <div className='container'>
                <div className='row'>
                    {orderData !== {} ? Array(orderData).map(data => {
                        return (data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map(item => {
                                return (item.map(ArrayData => {
                                    return (
                                        <div >
                                            {ArrayData.OrderDate ? <div className='mt-5 fs-4'>
                                                {data = ArrayData.OrderDate}
                                                <hr />
                                            </div> :
                                                <div className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    
                                                        <div className='card-body'>
                                                        {/* <img src={ArrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                            <h5 className='card-title'>{ArrayData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "4.8rem"}}>
                                                                <span className='m-1' >{ArrayData.Quantity}</span>
                                                                <span className='m-1'>{ArrayData.Size}</span>
                                                                <br/>
                                                                <span className='m-1'>{data}</span>
                                                                <br/>
                                                                <div className=' d-inline ms-2 h-100 w-20 fs-5'>₹{ArrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                }))
                            }):""
            
                         )
                    }): ""}

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
