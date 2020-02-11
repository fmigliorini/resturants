import React, {useState, useEffect} from 'react';
import {Row, Col, Collapse, Button, CardBody, Card, Form} from 'reactstrap';

import FilterInput from './FilterInput';
import FilterCheckbox from './FilterCheckbox';

import { calculateDistance } from '../../helper/calculateProximity';

const Filter = ({list, setFilter}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [byPlace, setByPlace] = useState(false);
    const [byTip, setByTip] = useState(false);
    const [byLatitude, setbyLatitude] = useState(false);
    const [byLongitude, setByLongitude] = useState(false);
    const [byProximity, setByProximity] = useState(false);
    
    console.log(byProximity);
    const [position, setPosition] = useState({});
    const [errorPosition, setErrorPosition] = useState(null);

    const onChange = ({coords}) => {
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    const onError = (error) => {
      setErrorPosition(true);
    };

    useEffect(() => {
      const geo = navigator.geolocation;
      if (!geo) {
        setErrorPosition(true);
        return;
      }
      const watcher = geo.watchPosition(onChange, onError);
      setErrorPosition(false);
      return () => geo.clearWatch(watcher);
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    const applyFilters = () => {
      let filterList = list;
      console.log(list);
      console.log(filterList);
      if (byPlace) {
        filterList = filterList.filter(item => item.Place.search(byPlace) !== -1);
      }

      if (byTip) {
        filterList= filterList.filter(item => item.Tips.search(byTip) !== -1);
      }

      if (byLatitude) {
        filterList = filterList.filter(item => item.Latitude.toString().search(byLatitude) !== -1);
      }

      if (byLongitude) {
        filterList = filterList.filter(item => item.Longitude.toString().search(byLongitude) !== -1);
      }

      if( position && byProximity ) {
        filterList = filterList.filter(item => (
          calculateDistance(item.Latitude, item.Longitude, position.latitude, position.longitude, "K") <= 1
        ))
      }
      
      setFilter(filterList);
    }

    const resetFilters = () => {
      console.log(list);
      setFilter(list);
      setByPlace(false);
      setbyLatitude(false);
      setByLongitude(false);
    }
    
    const buttonText = (isOpen ? "Hide" : "Show");
    return (
      <div class="filter-container">
        <Row>
          <Col>
            <h3>Filters <Button onClick={toggle} size="sm"> {buttonText} </Button></h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <Form>
                    <Row form>
                      <FilterInput
                        label="Place"
                        name="place"
                        type="text"
                        set={setByPlace}
                      />
                      <FilterInput
                        label="Tip"
                        name="tip"
                        type="text"
                        set={setByTip}
                      />
                    </Row>
                    <Row form>
                      <FilterInput
                        label="Latitude"
                        name="latitude"
                        type="number"
                        set={setbyLatitude}
                      />
                      <FilterInput
                        label="Longitude"
                        name="longitude"
                        type="number"
                        set={setByLongitude}
                      />
                    </Row>
                    {!errorPosition && 
                      <FilterCheckbox
                        label="Proximity"
                        name="proximity"
                        set={setByProximity}
                      />
                    }
                    <Row form>
                      <Button
                        color="primary"
                        style={{marginRight:'10px'}}
                        onClick={() => {applyFilters()}}
                      >
                          Apply Filters
                      </Button>
                      <Button 
                        color="danger"
                        onClick={() => {resetFilters()}}
                      >
                        Reset Filters
                      </Button>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
}

export default Filter;
