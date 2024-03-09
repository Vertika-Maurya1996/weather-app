import React, { useEffect, useState } from "react";
import { Badge, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import BGImage from "../assests/images/background.png";
import api from "../utilities/api";
import { useSelector } from "react-redux";
import { BsClouds } from "react-icons/bs";
import TemperatureGraph from "../components/TemperatureGraph";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const { longitude, latitude, place } = useSelector(
    (store) => store.coordinates
  );
  const [currenttemp, setCurrentTemp] = useState({
    place: "",
    temp: "",
    unit: "",
  });
  const [minTemp, setTempMin] = useState([]);
  const [maxTemp, setTempMax] = useState([]);
  const [tempDate, setTempDate] = useState([]);
  const [pRecord, setPRecord] = useState([]);
  const [windData, setWindData] = useState([]);
  const [weatherCode, setWeatherCode] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleCurrentWeatherData = async () => {
    try {
      setLoading(true);
      let { data } = await api.get(
        `v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      );
      setCurrentTemp({
        place: place || "New York,USA",
        temp: data?.current?.temperature_2m,
        unit: data?.current_units?.temperature_2m,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleHourlyWeatherData = async () => {
    try {
      let { data } = await api.get(
        `v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,precipitation_probability_max,precipitation_probability_mean,wind_speed_10m_max&precipitation_unit`
      );
      let dailyData = data?.daily;
      setTempMax(dailyData?.temperature_2m_max);
      setTempMin(dailyData?.temperature_2m_min);
      setWeatherCode(dailyData?.weather_code);
      setTempDate(dailyData?.time);
      let avgPreci = (
        dailyData?.precipitation_probability_mean.reduce((a, c) => a + c, 0) /
        700
      ).toFixed(1);
      let wind_speed = (
        dailyData?.wind_speed_10m_max.reduce((a, c) => a + c, 0) / 7
      ).toFixed(1);
      setWindData(wind_speed);
      setPRecord(avgPreci);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(longitude == 0 && latitude ==0){
      navigate("/")
    }
    else{
      handleCurrentWeatherData();
      handleHourlyWeatherData();
    }
   
  }, []);

  useEffect(() => {
    let formattedDate = tempDate.map((item) => {
      let date = new Date(item).toDateString();
      return date;
    });
    setTempDate(formattedDate);
  }, []);
  const currentTime = new Date().toDateString();
const navigate = useNavigate()
  const temperatureData = [{ max: maxTemp, min: minTemp, tempDate: tempDate }];
  return (
    <div className="container py-5">
      {isLoading ?  <div className="d-flex justify-content-center h-100"><Spinner color="primary" style={{height: '3rem',width: '3rem'}}type="grow">
    Loading...
  </Spinner></div>:<Row>
        <Col md={12}>
          <span className="text-sub-heading" role="button" onClick={()=>{navigate("/")}}>
            <FaArrowLeft color="#023940" className="m-3" size={20} />
            Go Back
          </span>
        </Col>
        <Col md={12} className="location-details my-4">
          <Card className="rounded-box">
            <CardBody className="d-flex flex-row justify-content-between">
              <div className="location-container-right">
                <h1>{currenttemp.place}</h1>
                <br />
                <h2>
                  {" "}
                  {currenttemp.temp}
                  {currenttemp.unit}
                </h2>
                <h3>{currentTime}</h3>
              </div>
              <div className="location-container-left position-relative">
                <img
                  src={BGImage}
                  alt="bg"
                  width={300}
                  className="bg-image"
                />
                <Badge color="danger" className="position-absolute tag tag-bottom">
                  Live
                </Badge>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} className="my-4">
          <Card className="forecast-card rounded-box">
            <CardBody className="py-4">
              <div className="d-flex justify-content-evenly align-items-center text-white">
                {maxTemp.map((item) => {
                  return (
                    <p className="mx-2">
                      {item} {currenttemp.unit}
                    </p>
                  );
                })}
              </div>
              <div className="d-flex justify-content-evenly align-items-center text-white">
                {weatherCode.map((item) => {
                  return (
                    <BsClouds color="#fff" className="mb-3 mx-2" size={30} />
                  );
                })}
              </div>
              <div className="d-flex justify-content-evenly align-items-center text-white">
                {minTemp.map((item) => {
                  return (
                    <p className="mx-2 mb-0">
                      {item} {currenttemp.unit}
                    </p>
                  );
                })}
              </div>
              {/* <div className="d-flex justify-content-evenly text-white">{tempDate.map((item)=>{ return <p className="mx-2">{item.slice(-1,4)}</p>})}</div> */}
            </CardBody>
          </Card>
        </Col>
        <Col md={12}>
          <div className="seperator mx-2 my-4"></div>
        </Col>
        <Col md={12} className="my-4">
          <h3>Additional Info</h3>
          <div className="row my-4">
            <div className="col-4">
              <p className="text-secondary">Precipitation</p>
              <h5>{pRecord}%</h5>
            </div>
            <div className="col-4">
              <p className="text-secondary">Humidity</p>
              <h5>74%</h5>
            </div>
            <div className="col-4">
              <p className="text-secondary">Windy</p>
              <h5>{windData}km/h</h5>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className="seperator mx-2 my-4"></div>
        </Col>
        <Col md={12} className="my-4">
          <h3>Temperature</h3>
          <div className="row my-4">
            <TemperatureGraph data={temperatureData} />
          </div>
        </Col>
      </Row>}
    </div>
  );
};

export default Weather;
