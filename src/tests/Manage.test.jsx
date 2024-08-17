import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Manage from '../components/Manage'; // Adjust path as needed
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('Manage Component', () => {
  beforeEach(() => {
    // Clear any previous mock data
    axios.post.mockClear();
    axios.get.mockClear();
  });

  test('should add a new password when Add Password button is clicked', async () => {
    // Mock data
    const newPassword = {
      name: 'Test Site',
      website: 'http://testsite.com',
      username: 'testuser',
      password: 'testpass'
    };

    // Mock API response
    axios.post.mockResolvedValueOnce({ data: newPassword });
    axios.get.mockResolvedValueOnce({ data: [] }); // Initial empty state

    // render(<Manage />);

    // Input values
    fireEvent.change(screen.getByPlaceholderText('Enter website URL'), { target: { value: newPassword.website } });
    fireEvent.change(screen.getByPlaceholderText('Enter website Name'), { target: { value: newPassword.name } });
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: newPassword.username } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: newPassword.password } });

    // Click the Add Password button
    fireEvent.click(screen.getByText('Add Password'));

    // Assert that the API was called with correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/passwords', newPassword);
    });

    // Assert that the new password is added to the UI
    expect(screen.getByText(newPassword.name)).toBeInTheDocument();
    expect(screen.getByText(newPassword.website)).toBeInTheDocument();
    expect(screen.getByText(newPassword.username)).toBeInTheDocument();
  });
});

