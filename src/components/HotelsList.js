import React, { useState, useEffect } from "react";
export default function HotelsList({ onLocationClick }) {
  const [locationIds, setLocationIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationClick = (locationID) => {
    onLocationClick(locationID);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = "https://worldwide-restaurants.p.rapidapi.com/typeahead";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
        },
        body: new URLSearchParams({
          q: searchQuery,
          language: "en_US",
        }),
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const locationIdsFromResponse = result.results.data.map(
        (location) => location.result_object.location_id
      );

      setLocationIds(locationIdsFromResponse[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (locationIds.length > 0) {
      const fetchLocationId = async (LocationIds) => {
        const url = 'https://worldwide-restaurants.p.rapidapi.com/search';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
          },
          body: new URLSearchParams({
            language: 'en_US',
            location_id: LocationIds,
            currency: 'USD',
            offset: '0'
          })
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          if (result.results && result.results.data) {
            const restaurantDetails = result.results.data.map((restaurant) => ({
              name: restaurant.name,
              num_reviews: restaurant.num_reviews,
              address: restaurant.address,
              ranking: restaurant.ranking,
              smallPhoto: restaurant.photo.images.small.url,
              locationID: restaurant.location_id
            }));

            setRestaurants(restaurantDetails);
          } else {
            console.error('Unexpected API response format:', result);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchLocationId(locationIds);
    }
  }, [locationIds]);

  if (loading) {
    if(searchQuery === ''){
      return(
        <div>
        <div className=" w-3/4 ml-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg"
            />
            <button className=" bg-yellow-300 p-1 rounded-md" onClick={handleSearch}>Search</button>
          </div>
          <div className="text-center text-xl border border-black rounded-lg my-3 w-3/4 mx-auto">Type the City Name to Search top Restaurants in it</div>
          </div>
        )
    }
    else{
    return(
    <div>
    <div className="w-3/4 ml-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg"
        />
        <button className=" bg-yellow-300 p-1 rounded-md" onClick={handleSearch}>Search</button>
      </div>
      <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">
        Restaurants
      </h1>
      <div className="text-center text-xl border border-black rounded-lg my-3 w-3/4 mx-auto">Loading...</div>
      </div>
    )
    }
  }

  if (error) {
    return(
      <div>
      <div className="w-3/4 ml-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg"
          />
          <button className="bg-yellow-300 p-1 rounded-md" onClick={handleSearch}>Search</button>
        </div>
        <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">
          Restaurants
        </h1>
        <div className="text-center text-xl border border-black rounded-lg my-3 w-3/4 mx-auto">error...</div>
        </div>
      )
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="w-3/4 ml-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-500 text-lg mb-5 px-3 w-1/2 mr-5 rounded-lg"
        />
        <button className="bg-yellow-300 p-1 rounded-md" onClick={handleSearch}>Search</button>
      </div>
      <h1 className="text-center text-3xl w-1/2 mx-auto bg-gray-200 border rounded-xl border-blue-500">
        Restaurants
      </h1>
      <div className="container px-5 py-5 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="py-4 flex flex-wrap md:flex-nowrap" onClick={() => handleLocationClick(restaurant.locationID)}>
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <img className="w-5/6 h-full rounded-lg" src={restaurant.smallPhoto} alt="Hotel"/>
              </div>
              <div className="md:flex-grow w-3/4">
                <h2 className="text-2xl font-medium text-gray-900 title-font text-center mb-2">
                  {restaurant.name}
                </h2>
                <p className="leading-relaxed text-purple-500 mb-1">Ranking: <span className="text-yellow-500 ml-3">{restaurant.ranking}</span></p>
                <p className="leading-relaxed text-purple-500 text-lg border text-justify px-1 rounded-xl border-gray-300">Location: <br/> <span className="text-gray-500 text-base">{restaurant.address}</span></p>
                <p className="leading-relaxed text-purple-500 mt-3">Number of Reviews:  <span className="text-yellow-500 text-base">{restaurant.num_reviews}</span></p>
                <button className="text-white items-center mt-4 underline underline-offset-4 w-1/2 bg-blue-400 py-1 flex justify-center font-semibold border rounded-xl">
                  Preview Details
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
