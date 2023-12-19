import React, { useState, useEffect } from "react";

export default function HotelDetails({ locationID }) {
  const [hotelDetails, setHotelDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const url = 'https://worldwide-restaurants.p.rapidapi.com/detail';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
        },
        body: new URLSearchParams({
          currency: 'USD',
          language: 'en_US',
          location_id: locationID || '1008614' // You may want to replace this with the actual location_id
        })
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setHotelDetails(result.results || {});
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [locationID]);

  if (loading) {
    <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">Hotel Preview</h1>
    return <div className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg">Loading...</div>;
  }

  if (error) {
    <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">Hotel Preview</h1>
    return <div className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg">Error: {error.message}</div>;
  }
  
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">Hotel Preview</h1>
      <div className="container py-5 mx-auto">
        <div className="w-full h-full mx-2 flex flex-wrap">
          <div className="w-1/2">
            <img
            alt="HotelImage"
            className="lg:w-full lg:h-2/3 w-full h-64 object-cover object-center rounded-lg"
            src={hotelDetails.photo.images.large.url}
          />
          <p className="leading-relaxed mt-5 text-center border border-purple-300">
            {hotelDetails.description.split(".",1)}
            </p>
          </div>
          <div className="lg:w-1/2 lg:h-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-blue-500 text-4xl title-font font-bold mb-3">
            {hotelDetails.name}
            </h1>
            <span className="text-white border border-yellow-500 px-2 bg-blue-300 rounded-lg py-1 font-semibold">{hotelDetails.ranking}</span>
            <h3 className="mt-3"><span className="text-purple-500 font-semibold text-lg">Location:</span><div>{hotelDetails.location_string}</div></h3>
            <h3 className="mt-3"><span className="text-purple-500 font-semibold text-lg">Address:</span><div>{hotelDetails.address}</div></h3>
            <div className="flex flex-col lg:flex-row justify-between my-3">
            <a
              href={hotelDetails.website}
                className=" text-blue-600 underline underline-offset-8"
              >
                Website
              </a>
              <a
              href={`https://www.google.com/maps/search/?api=1&query=${hotelDetails.latitude},${hotelDetails.longitude}`}
                className=" text-blue-600 underline underline-offset-8"
              >
                Location Map
              </a>
            </div>
            <p className="flex flex-col lg:flex-row justify-between mt-3">
              <a
                href={hotelDetails.menu_web_url}
                className=" text-blue-600 underline underline-offset-8"
              >
                Menu Card of Hotel
              </a>
              <a
                href={hotelDetails.write_review}
                className=" text-yellow-600 underline underline-offset-8"
              >
                Write Reviews
              </a>
            </p>
            <div><span className="text-purple-500 font-semibold text-lg">Ratings: </span><div>{hotelDetails.rating}Stars</div></div>
            <div className="mt-3">
              <div><span className="text-purple-500 font-semibold text-lg">Contact Number: </span><div>{hotelDetails.phone}</div></div>
              <div><span className="text-purple-500 font-semibold text-lg">Email : </span><div>{hotelDetails.email}</div></div>
            </div>
            <div className="text-purple-500 font-semibold text-lg ">
            cuisine : 
            <div className="text-purple-500">
                {hotelDetails.dishes.map((dish)=>(
                  <div className=" mr-3 border border-purple-500 p-1 bg-gray-100 w-1/2 text-base my-1 rounded-md">{dish.name}</div>
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
