import React, { createContext, useContext, useReducer, useState } from 'react'

const CardStateContext = createContext();
const CardDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, Quantity: action.Quantity, Size: action.Size, price: action.price, img: action.img }];
        case "REMOVE":
            let newArr=[...state]
            newArr.splice(action.index,1)
            return newArr;

        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    console.log(food.Quantity,parseInt(action.Quantity),action.price+food.price);
                    arr[index]={...food, Quantity:parseInt(action.Quantity)+food.Quantity,price:action.price+food.price}
                    console.log(food.Quantity);
                    
                }
                return arr
            })
            return arr
            case "DROP":
                let empArr=[]
                return empArr
        default: 
            console.log("error from swtich statment ");
    }

}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <div>
            <CardDispatchContext.Provider value={dispatch}>
                <CardStateContext.Provider value={state}>
                    {children}
                </CardStateContext.Provider>
            </CardDispatchContext.Provider>
        </div>)
}
export const useCart = () =>{
    return  useContext(CardStateContext)
}

export const useDispatchCart = () => {
    return useContext(CardDispatchContext)
}