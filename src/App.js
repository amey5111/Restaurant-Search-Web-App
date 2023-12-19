import './App.css';
import React, { useState } from "react";
import Header from './components/Header';
import HotelsList from './components/HotelsList';
import HotelDetails from './components/HotelDetails';
function App() {
  const [selectedLocationID, setSelectedLocationID] = useState(null);

  const handleLocationClick = (locationID) => {
    setSelectedLocationID(locationID);
  };
  return (
    <>
    <Header/>
    <section className='w-full'>
      <div className=' float-right w-1/2'>
      <HotelsList onLocationClick={handleLocationClick}/>
      </div>
      <div className='w-1/2'>
        {(selectedLocationID && <HotelDetails locationID={selectedLocationID} />) || (<div className='text-center text-xl w-3/4 mx-auto bg-gray-50 border rounded-xl border-blue-500'>Please select Restaurant from list beside to see detailed info about it</div>)}
      </div>
    </section>
    </>
  );
}

export default App
