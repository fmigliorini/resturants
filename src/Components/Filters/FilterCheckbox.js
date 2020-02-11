import React from 'react';
import {Col, FormGroup, Label, Input} from 'reactstrap';

const FilterCheckbox = ({label, name, set}) => (
  <Col md={6}>
    <FormGroup>
      <Label for="Logitude">
        <Input
          type="checkbox"
          name={name}
          onChange={event => { set(event.target.checked) }}
        />
        {label}
      </Label>
    </FormGroup>
  </Col>
);

export default FilterCheckbox;
