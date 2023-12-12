/* eslint-disable testing-library/no-unnecessary-act */
// src/components/Profile.test.js
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import MyProfile from '../components/MyProfile/MyProfile.js';

describe('MyProfile Component', () => {
  const mockUser = {
    userId: 1,
    username: 'testuser',
    password: 'testpassword',
  };

  test('renders profile with user data', () => {
    render(
      <MemoryRouter>
        <MyProfile user={mockUser} setUser={() => { }} setToken={() => { }} />
      </MemoryRouter>);

    expect(screen.getByLabelText(/Username/)).toHaveValue(mockUser.username);
    expect(screen.getByLabelText(/Password/)).toHaveValue(mockUser.password);

    expect(screen.getByText(/Edit/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  test('allows editing when Edit button is clicked', async () => {
    render(
      <MemoryRouter>
        <MyProfile user={mockUser} setUser={() => { }} setToken={() => { }} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Username/)).toBeDisabled();
    expect(screen.getByLabelText(/Password/)).toBeDisabled();

    fireEvent.click(screen.getByText(/Edit/));

    expect(screen.getByLabelText(/Username/)).toBeEnabled();
    expect(screen.getByLabelText(/Password/)).toBeEnabled();

    expect(screen.getByText(/Save/)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
  });

  test('calls fetch when Save button is clicked', async () => {
    render(
      <MemoryRouter>
        <MyProfile user={mockUser} setUser={() => { }} setToken={() => { }} />
      </MemoryRouter>
    );

    // Mock the window.confirm method
    global.confirm = jest.fn(() => true);

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Click the Edit button
    fireEvent.click(screen.getByText(/Edit/));

    // Change the username and password inside act
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'newusername' } });
      fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'newpassword' } });
    });

    // Click the Save button inside act
    await act(async () => {
      fireEvent.click(screen.getByText(/Save/));
    });

    // Wait for any asynchronous tasks to complete (e.g., the fetch)
    await Promise.resolve();

    // Verify that fetch was called with the expected parameters
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1/5000/User',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: mockUser.userId,
          username: 'newusername',
          password: 'newpassword',
        }),
      })
    );
  });

  test('calls handleDelete and logs "Profile deleted" when Delete button is clicked', () => {
    render(
      <MemoryRouter>
        <MyProfile user={mockUser} setUser={() => { }} setToken={() => { }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Delete/));
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete your profile?');
  });

  test('calls handleCancel and resets state when Cancel button is clicked', async () => {
    render(
      <MemoryRouter>
        <MyProfile user={mockUser} setUser={() => { }} setToken={() => { }} />
      </MemoryRouter>
      );

    fireEvent.click(screen.getByText(/Edit/));

    // Change the username and password
    fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'newusername' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'newpassword' } });

    // Click the Cancel button
    fireEvent.click(screen.getByText(/Cancel/));

    // Verify that state is reset
    expect(screen.getByLabelText(/Username/)).toHaveValue(mockUser.username);
    expect(screen.getByLabelText(/Password/)).toHaveValue(mockUser.password);
    expect(screen.getByText(/Edit/)).toBeInTheDocument(); // Edit button is present again
  });

});
