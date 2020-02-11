import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Restaurants = ({resturants}) => (
    <ListGroup>
      {resturants.map(restaurant => (
        <ListGroupItem 
          className="justify-content-between"
          key={restaurant.Place}
        > 
          {restaurant.Place}
        </ListGroupItem>
      ))}
    </ListGroup>


);

export default Restaurants;