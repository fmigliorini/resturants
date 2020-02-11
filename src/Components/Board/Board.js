import React, {useState} from 'react';
import { Container } from 'reactstrap';

import data from '../../data/restaurants';
import Resturants from '../Restaurants';
import PaginationFooter from '../PaginationFooter';
import Filters from '../Filters';

const Board = () => {
  const [resturants, setRestaurants] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(10);
  
  const indexOfLastResturant = currentPage * restaurantPerPage;
  const indexOfFirstResturant = indexOfLastResturant - restaurantPerPage;
  const currentResturants = resturants.slice(indexOfFirstResturant, indexOfLastResturant);

  const setRestaurantList = list => {
    setCurrentPage(1);
    setRestaurants(list);
  }

  return (
    <Container>
      <Filters list={data} setFilter={setRestaurantList}/>
      <Resturants resturants={currentResturants} />
      <PaginationFooter 
        totalPerPage={restaurantPerPage}
        total={resturants.length}
        paginate={setCurrentPage}
      />
    </Container>
  )
};

export default Board;