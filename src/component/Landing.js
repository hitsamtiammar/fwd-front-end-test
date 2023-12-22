import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Landing({ onToGame }) {
  const [size, setSize] = useState('3');
  function onSubmit() {
    onToGame(Number(size));
  }

  return (
    <div
      className="d-flex align-items-center flex-column w-50 py-5"
      id="landing"
    >
      <h2 className="fw-bold">Select Size</h2>
      <Form.Select
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className="my-3"
      >
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </Form.Select>
      <Button onClick={onSubmit}>Go To Game</Button>
    </div>
  );
}

Landing.propTypes = {
  onToGame: PropTypes.func.isRequired,
};
