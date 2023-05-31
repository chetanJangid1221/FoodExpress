import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import Modal from '../Modal';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let data = useCart();
    let optionObject = props.foodOptions;
    let Options = Object.keys(optionObject);
    const [Quantity, setQuantity] = useState(1);
    const [Size, setSize] = useState("");
    const priceRef = useRef();
   
   
    const addToCart = async () => {
    let food=[]
    for(const item of data){
        if(item.id===props.foodItem._id){
            food=item;
            break;
        }
    }
    if(food!==[]){
        if(food.Size===Size){
            await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,Quantity:Quantity})
            return 
        }
        else if(food.Size!==Size){
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, Quantity: Quantity, Size: Size })
          return   
        }
        return 
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, Quantity: Quantity, Size: Size })
         // await console.log(data);
    }
    let finalPrice = Quantity * parseInt(optionObject[Size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        // <div>
            <div className="card mt-3 h-100"
                // style={{ "width": "auto" ,height:"100%"}}
            >
                <img src={props.foodItem.img} className="card-img-top cardImg" alt="..." style={{ height: "10rem", objectFit: "fill" }} />
                <div className="card-body" style={{height:'18rem'}}>
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description} </p>
                    
                    <div className='container w-100 mb-4    position-absolute bottom-0 start-0' 
                    // style={{position:'absolute',
                    //         bottom:'1rem'
                    
                    // }}
                    >
                        <select className='m-2 h-100 bg-success rounded text-white' onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(6), (a, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {Options.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                                ₹ {finalPrice} /-
                        </div>
                        <hr></hr>
                        <div className='d-grid'>
                            <button className='btn btn-success text-white' onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}
