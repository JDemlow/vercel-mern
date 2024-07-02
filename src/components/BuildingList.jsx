import React, { useState, useEffect } from "react";
import axios from "axios";

function BuildingsList() {
  const [buildings, setBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildingsPerPage] = useState(10); // Number of buildings per page

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/buildings/?page=${currentPage}&limit=${buildingsPerPage}`
        );
        setBuildings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBuildings();
  }, [currentPage, buildingsPerPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h2>Buildings List</h2>
      {Array.isArray(buildings) ? (
        <ul>
          {buildings.map((building) => (
            <li key={building._id}>
              {building.buildingId} - {building.streetAddress}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default BuildingsList;
