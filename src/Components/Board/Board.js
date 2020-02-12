import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import axios from "axios";

import Resturants from "../Restaurants";
import PaginationFooter from "../PaginationFooter";
import Filters from "../Filters";
import Loading from "../../Shared/Loading";
import ErrorMessage from "../../Shared/ErrorMessage";

const Board = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resturants, setRestaurants] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(10);

  useEffect(() => {
    const url = "https://my-router-app.fmigliorini.workers.dev/restaurants";
    axios
      .get(url)
      .then(response => {
        setRestaurants(response.data);
        setDefaultList(response.data);
        setError("");
      })
      .catch(error => {
        setRestaurants([]);
        setError(
          "There is an error searching restaurants, please contact an administrator."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const indexOfLastResturant = currentPage * restaurantPerPage;
  const indexOfFirstResturant = indexOfLastResturant - restaurantPerPage;
  const currentResturants = resturants.slice(
    indexOfFirstResturant,
    indexOfLastResturant
  );

  const setRestaurantList = list => {
    setCurrentPage(1);
    setRestaurants(list);
  }

  return (
    <Container>
      <Filters list={resturants} setFilter={setRestaurants} defaultList={defaultList}/>
      <Resturants resturants={currentResturants} />
      <PaginationFooter
        totalPerPage={restaurantPerPage}
        total={resturants.length}
        paginate={setCurrentPage}
      />
    </Container>
  );
};

export default Board;
