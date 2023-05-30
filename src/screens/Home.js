import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
export default function Home() {

    const [foodItem, setfoodItem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);
    const [search, setsearch] = useState([]);


    // const loadData = async () => {
    //     const response = await fetch('https://foodexp.onrender.com/foodData', {
    //         //         const response = await fetch('http://localhost:5000/foodData', {

    //         method: "POST",
    //         mode: "no-cors",
    //         headers: {
    //             "Content-Type": 'application/json',
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Credentials": true
    //         }
    //     });
    //     try {
    //             console.log(response.text())
    //            const data = await response.json();
    //             console.log("type of data is  " + typeof(data))

    //             setfoodItem(data[0]);
    //             setfoodCat(data[1]);
          
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }


    // }

    //use AXIOS to fetch data
    const loadData = async () => {
        try {
          const response = await axios.post('https://foodexp.onrender.com/foodData', {
            mode: "no-cors",
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            }
          });
      
          const { data } = response;
          const [foodItemData, foodCatData] = data;
          console.log(response);
          setfoodItem(foodItemData);
          setfoodCat(foodCatData);
      
          console.log('type of data is' + typeof data);
          // console.log(data[0], data[1]);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };

    useEffect(() => { loadData() }, []);


    return (
        <div>
            <div><NavBar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel'>
                        <div class="carousel-caption d-none d-md-block" style={{ zIndex: 3 }}>
                            <div class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                {/* <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?fruit" className="d-block w-100" id='carousalImg' alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?dish" className="d-block w-100" id='carousalImg' alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?juice" className="d-block w-10  0" id='carousalImg' alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container ' >
                {
                    foodCat !== []
                        ? foodCat.map((value) => {
                            return (
                                <div className='row mb-3 '>
                                    <div className='fs-3 m-3' key={value._id}>
                                        {value.CategoryName}
                                    </div>
                                    <hr />

                                    {
                                        foodItem !== [] ?
                                            foodItem.filter((item) => (item.CategoryName === value.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleString())))
                                                .map(filterItems => {
                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-3 mb-3" key={filterItems._id}>
                                                            <Card
                                                                //this code is use for prop 
                                                                // foodImage={filterItems.img}
                                                                // foodName={filterItems.name}
                                                                // foodOptions={filterItems.options[0]}
                                                                // foodDescription={filterItems.description}
                                                                // ------below is update code using context---------
                                                                foodItem={filterItems}
                                                                foodOptions={filterItems.options[0]}

                                                            >

                                                            </Card>

                                                        </div>
                                                    )
                                                })
                                            : <div>No Such Data Found</div>}
                                </div>
                            )

                        })
                        : ""
                }


            </div>
            <Footer />
        </div>
    )
}
