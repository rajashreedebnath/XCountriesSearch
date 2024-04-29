import React, {useEffect, useState} from "react";
import './App.css';



export default function Country() {

  const [countries, setCountries] = useState([]);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);



  useEffect(() => {

    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      setCountries(data);
      setFilteredCountries(data);
    })
    .catch((error) => {
      setError(error)
      console.error("Error fetching countries:", error)
    });

  }, []);




  useEffect(() => {

    if(!searchTerm) {

      setFilteredCountries(countries);
      return;
    }
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);











  return (
    <div className="page">

      <div className="search_container">
        <input 
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input"
        />
      </div>



      {error && <div className="error">Error: {error.message}</div>}



      <div className="countries_container">

        {filteredCountries.map((country) => (

          <div key={country.name.common} className={`countryCard${country.name.common.toLowerCase() === searchTerm.toLowerCase() ? ' centered' : ''}`}>

            <img
              src={country.flags.png}
              alt={country.name.common}
              className="image"
            />

            <h2>{country.name.common}</h2>

          </div>
        ))}

      </div>

    </div>
    
  );
}


