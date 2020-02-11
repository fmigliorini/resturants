import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Restaurants = ({resturants}) => (
  <div className="restaurant-list">
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
  </div>
);

export default Restaurants;