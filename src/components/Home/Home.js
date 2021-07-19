import React from 'react';
import { Link } from 'react-router-dom';
import Bike from '../../images/bike.png';
import Bus from '../../images/bus.png';
import Car from '../../images/car.png';
import Metro from '../../images/metro.png';
import './Home.css';

const Home = () => {
    const vehicles = [
        {
            photo: Bike,
            name: "Bike"
        },
        {
            photo: Car,
            name: "Car"
        },
        {
            photo: Bus,
            name: "Bus"
        },
        {
            photo: Metro,
            name: "Metro"
        }
    ];

    return (
        <div className="home-container">
            {
                vehicles.map(vehicle => {
                    return(
                    <div className="imgDivStyle">
                        <img src={vehicle.photo} alt="vehicle" />
                        <Link to="/destination">
                            <h3 className="vehicle-name">{vehicle.name}</h3>
                        </Link>
                    </div>
                )})
            }
        </div>
    );
};

export default Home;