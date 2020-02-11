import React from 'react';
import {Col, FormGroup, Label, Input} from 'reactstrap';

const FilterInput = ({label, type, name, set}) => (
  <Col md={6}>
    <FormGroup>
      <Label for="Logitude">{label}</Label>
      <Input
        type={type}
        name={name}
        onChange={event => { set(event.target.value) }}
      />
    </FormGroup>
  </Col>
);

const defaultProps = {
  type: 'text',
};

FilterInput.defaultProps = defaultProps;
export default FilterInput;
