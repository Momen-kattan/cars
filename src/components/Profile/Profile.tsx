import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import the CSS file
import NavBar from "../NavBar";
import axiosInstance from "../../services/APIClient";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: string;
  color: string;
  type: string;
  manufacturing_year: string;
  clean_title: string;
  engine_type: string;
  gear_type: string;
  cylinders: string;
  notes: string;
  price: string;
  location: string;
}

interface ProfileProps {
  name: string;
  email: string;
  age: number;
  gender: string;
  address: string;
}

const Profile = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // Fetch the user's cars from the backend using Axios
    axiosInstance
      .get("/car/")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">welcome to your Profile Page</h1>
      <div className="profile-info">
        <img
          className="profile-avatar"
          src="https://via.placeholder.com/150"
          alt="Profile Avatar"
        />
        <div className="profile-details">
          <p>Name: momen</p>
          <p>Email: admin</p>
          <p>Age: 25</p>
          <p>Gender: male</p>
          <p>Address: AL shhbndar street</p>
        </div>
      </div>

      <div className="profile-cars">
        <h3>Your Cars Added:</h3>
        {cars.length > 0 ? (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                <p>Color: {car.color}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Type: {car.type}</p>
                <p>Manufacturing Year: {car.manufacturing_year}</p>
                <p>Clean Title: {car.clean_title}</p>
                <p>Engine Type: {car.engine_type}</p>
                <p>Gear Type: {car.gear_type}</p>
                <p>Cylinders: {car.cylinders}</p>
                <p>Notes: {car.notes}</p>
                <p>Price: {car.price}</p>
                <p>Location: {car.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't added any cars yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
