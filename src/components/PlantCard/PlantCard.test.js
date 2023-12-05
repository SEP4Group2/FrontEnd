import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlantCard } from './PlantCard';

// Mock the CardComponent module
jest.mock('../ViewPlantCard/CardComponent.js', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-card-component">Mocked CardComponent</div>,
}));

describe('PlantCard', () => {
  const mockPlant = {
    name: 'Test Plant',
    deviceId: '123456',
    statusValue: 50,
  };

  const mockPlantsData = [];
  const mockIndex = 0;

  test('renders PlantCard component', () => {
    render(
      <PlantCard index={mockIndex} plantsData={mockPlantsData} plant={mockPlant} />
    );

    // Check if the component renders correctly
    expect(screen.getByText('Test Plant')).toBeInTheDocument();
    expect(screen.getByText('Device ID: 123456')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('opens and closes ViewCard component on button click', () => {
    render(
      <PlantCard index={mockIndex} plantsData={mockPlantsData} plant={mockPlant} />
    );

    // Click the 'View' button
    fireEvent.click(screen.getByText('View'));

    // Check if the ViewCard is displayed
    // In this case, you would expect the mock CardComponent content
    expect(screen.getByTestId('mock-card-component')).toBeInTheDocument();
  });
});
