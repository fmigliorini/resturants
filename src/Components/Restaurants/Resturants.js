import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Restaurants = ({resturants}) => (
  <div className="restaurant-list">
    <ListGroup>
      {resturants.map(restaurant => (
        <ListGroupItem 
          className="justify-content-between"
          key={restaurant.Place}
        > 
          {restaurant.Place}
          {restaurant.ranking && (
            <Badge color="warning" pill>{restaurant.ranking}</Badge>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Restaurants;