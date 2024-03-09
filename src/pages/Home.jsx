import React, { useEffect, useState } from "react";
import pin from "../assests/images/pin.svg";
import { Button,Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import setCoords from "../utilities/store/actions";
import { FaArrowRight } from "react-icons/fa";
import { handleLocation } from "../utilities/functions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [position, setPosition] = useState({ latitude: null, longitude: null,place:"" });
  const handleGetCurrentLocation = () =>{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async(position)=> {
        let currentLocation = await handleLocation({latitude:position.coords.latitude,longitude:position.coords.longitude})
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            place:currentLocation ||"New York,USA"
          });
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
  }

useEffect(()=>{
    dispatch(setCoords(position))
},[position])
  return (
    <div className="home-screen">
      <div className="bg-home">
      <Badge color="danger" className="position-absolute  tag tag-top">
       Live
          </Badge>
        <div className="position-absolute">
      
          <div
            className="d-flex flex-column align-items-center justify-content-evenly"
            style={{ height: "100vh", width: "100vw" }} >
            <Button className="d-flex btn-location" onClick={handleGetCurrentLocation}>
              <img src={pin} height={20} width={20} />
              <p className="text-capitalize text-white fs-md mb-0 ms-3">
                Current location
              </p>
            </Button>
            {!position?.place && <p className="text-white">Please select your current location</p>}
            <h1 className="text-white text-location ">{position?.place}</h1>
            <Button className="btn-location" disabled={position?.place ? false:true} style={{minWidth:"100px"}} onClick={()=> navigate("/weather")}>
            <FaArrowRight color="#fff" size={20}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
