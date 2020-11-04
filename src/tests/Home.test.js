import '@testing-library/jest-dom' 
import { render, screen } from '@testing-library/react';
import Home from '../layouts/Home';

import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'




test('renders log in button', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Home />
      </Router>
    )
  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});
