import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
export default function Home() {

    const [foodItem, setfoodItem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);
    const [search, setsearch] = useState([]);


    const loadData = async () => {
         const response = await fetch('https://foodexp.onrender.com/foodData', {
//         const response = await fetch('http://localhost:5000/foodData', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        });
//         try{
//        const data = await response.json();
//         console.log("type of data is" + typeof(data))
//         console.log(data)
//         setfoodItem(data[0]);
//         setfoodCat(data[1]);
//         }
//         catch(err){
//         console.log(err);
//         }
    
               const responseBody = await response.json(); // Read the response body as text

            try {
              const jsonData = JSON.parse(responseBody); // Try parsing the response body as JSON
              const [foodItemData, foodCatData] = jsonData;

              if (foodItemData && foodCatData) {
                // Both objects exist and contain data
                console.log("Data is there in response");
                setfoodItem(foodItemData);
                setfoodCat(foodCatData);
              } else {
                // One or both objects are missing or empty
                console.log("No data is there in response");
              }
            } catch (error) {
              // Error occurred while parsing response as JSON or response is empty
              console.error("Error parsing response:", error);
            }
    }

    useEffect(() => { loadData() }, []);


    return (
        <div>
            <div><NavBar /></div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    <div class="carousel-caption d-none d-md-block" style={{ zIndex: 3 }}>
                        <div class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
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
                                            foodItem.filter((item) => (item.CategoryName === value.CategoryName) &&(item.name.toLowerCase().includes(search.toLocaleString()) ))
                                                .map(filterItems => {
                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-3 mb-3"  key={filterItems._id}>
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
