import React, {useState} from 'react';
import { Container } from 'reactstrap';

import data from '../../data/restaurants';
import Resturants from '../Restaurants';
import PaginationFooter from '../PaginationFooter';

const Board = () => {
  const [resturants] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage, setRestaurantsPerPage] = useState(10);

  const indexOfLastResturant = currentPage * restaurantPerPage;
  const indexOfFirstResturant = indexOfLastResturant - restaurantPerPage;
  const currentResturants = resturants.slice(indexOfFirstResturant, indexOfLastResturant);

  return (
    <Container>
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