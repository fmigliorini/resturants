import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Button, CardBody, Card, Form } from "reactstrap";

import FilterInput from "./FilterInput";
import FilterCheckbox from "./FilterCheckbox";

import { calculateDistance } from "../../helper/calculateProximity";
import { arrayRemove } from "../../helper/generic";

const Filter = ({ list, setFilter, defaultList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [byPlace, setByPlace] = useState(false);
  const [byTip, setByTip] = useState(false);
  const [byLatitude, setbyLatitude] = useState(false);
  const [byLongitude, setByLongitude] = useState(false);
  const [byProximity, setByProximity] = useState(false);

  const [position, setPosition] = useState({});
  const [errorPosition, setErrorPosition] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError = error => {
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
    let filterList = defaultList;

    let keySearchs = [];

    if (byPlace) {
      filterList = filterList.filter((item, key) => {
        if (item.Place.search(byPlace) !== -1) {
          if (keySearchs.indexOf(key) === -1) keySearchs.push(key);
          return true;
        }
        keySearchs = arrayRemove(keySearchs, key);
        return false;
      });
    }

    if (byTip) {
      filterList = filterList.filter((item, key) => {
        if (item.Tips.search(byTip) !== -1) {
          if (!keySearchs.indexOf(key) === -1) keySearchs.push(key);
          return true;
        }
        keySearchs = arrayRemove(keySearchs, key);
        return false;
      });
    }

    if (byLatitude) {
      filterList = filterList.filter((item, key) => {
        if (item.Latitude.toString().search(byLatitude) !== -1) {
          if (!keySearchs.indexOf(key) === -1) keySearchs.push(key);
          return true;
        }
        keySearchs = arrayRemove(keySearchs, key);
        return false;
      });
    }

    if (byLongitude) {
      filterList = filterList.filter((item, key) => {
        if (item.Latitude.toString().search(byLongitude) !== -1) {
          if (!keySearchs.indexOf(key) === -1) keySearchs.push(key);
          return true;
        }
        keySearchs = arrayRemove(keySearchs, key);
        return false;
      });
    }

    if (position && byProximity) {
      filterList = filterList.filter((key, item) => {
        if (
          calculateDistance(
            item.Latitude,
            item.Longitude,
            position.latitude,
            position.longitude,
            "K"
          ) <= 1
        ) {
          if (!keySearchs.indexOf(key) === -1) keySearchs.push(key);
          return true;
        }
        keySearchs = arrayRemove(keySearchs, key);
        return false;
      });
    }

    keySearchs.forEach(key => {
      if (defaultList[key]) {
        if (defaultList[key].ranking) {
          defaultList[key].ranking++;
        } else {
          defaultList[key].ranking = 1;
        }
      }
    });

    setFilter(filterList);
  };

  const resetFilters = () => {
    setFilter(defaultList);
  };

  const buttonText = isOpen ? "Hide" : "Show";
  return (
    <div className="filter-container">
      <Row>
        <Col>
          <h3>
            Filters{" "}
            <Button onClick={toggle} size="sm">
              {" "}
              {buttonText}{" "}
            </Button>
          </h3>
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
                  {!errorPosition && (
                    <FilterCheckbox
                      label="Proximity"
                      name="proximity"
                      set={setByProximity}
                    />
                  )}
                  <Row form>
                    <Button
                      color="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        applyFilters();
                      }}
                    >
                      Apply Filters
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => {
                        resetFilters();
                      }}
                    >
                      Reset list
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
};

export default Filter;
