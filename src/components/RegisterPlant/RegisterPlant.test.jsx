import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import NewPlant from "./RegisterPlant";

describe("NewPlant", () => {
    it('should render preset component when "Other" is chosen', async () => {
        render(<NewPlant onCancel={() => { }} />);

        // Get the select element
        const typeSelect = screen.getByLabelText(/Type:/i);

        // Select the "Other" option
        fireEvent.change(typeSelect, { target: { value: 'Other' } });

        // Assert that the Popup component is rendered
        expect(screen.getByTestId("popup")).toBeInTheDocument();
    });

    it('should render NewPlant component with initial state and select element', async () => {
        render(<NewPlant onCancel={() => { }} />);

        // Check if the component renders without crashing
        expect(screen.getByText('Register a New Plant')).toBeInTheDocument();

        // Check if the initial state is set correctly
        expect(screen.getByLabelText(/Name:/i).value).toBe('');
        expect(screen.getByLabelText(/Location:/i).value).toBe('');
        expect(screen.getByLabelText(/Type:/i).value).toBe('');
        // Add more assertions for other fields as needed

        // Verify that the select element is present and contains the "Other" option
        const typeSelect = screen.getByLabelText(/Type:/i);
        expect(typeSelect).toBeInTheDocument();
        expect(screen.getByText(/Select Type/i)).toBeInTheDocument();
    });

    it('should update state when input fields are changed', () => {
        render(<NewPlant onCancel={() => { }} />);

        // Simulate user input for Name and Location fields
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Plant' } });
        fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Living Room' } });

        // Assert that state is updated accordingly
        expect(screen.getByLabelText(/Name:/i).value).toBe('Test Plant');
        expect(screen.getByLabelText(/Location:/i).value).toBe('Living Room');
    });
});
