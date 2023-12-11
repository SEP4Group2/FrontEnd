import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import RegisterPlant from "../components/RegisterPlant/RegisterPlant";

describe("Rendering", () => {
    it('should render RegisterPlant component with initial state and select element', async () => {
        render(<RegisterPlant onCancel={() => { }} userId="1" />);

        expect(screen.getByLabelText(/Device ID:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Humidity Level:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Moisture Level:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Light Level:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Temperature Level:/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Main Plant Icon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Type:/i)).toBeInTheDocument();
        expect(screen.getByText(/Select Type/i)).toBeInTheDocument();
    });
});
describe("Update State", () => {
    it('should update state when input fields are changed', () => {
        render(<RegisterPlant onCancel={() => { }} userId="1" />);

        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Plant' } });
        fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Living Room' } });

        expect(screen.getByLabelText(/Name:/i).value).toBe('Test Plant');
        expect(screen.getByLabelText(/Location:/i).value).toBe('Living Room');
    });
});
describe("Generate Component", () => {
    it('should render Popup component when "Other" is chosen', async () => {
        render(<RegisterPlant onCancel={() => { }} userId="1" />);

        fireEvent.change(screen.getByLabelText(/Type:/i), { target: { value: 'Other' } });

        expect(screen.getByTestId("popup")).toBeInTheDocument();
    });
    it('should display warning alert when there are empty fields', () => {
        render(<RegisterPlant onCancel={() => { }} userId="1" />);

        fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByText(/Fields should not be empty!/i)).toBeInTheDocument();
    });
});
